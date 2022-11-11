import {TeamModel} from "./TeamModel"
import {LocalStorageModel} from "./LocalStorageModel"
import {StageModel} from "../Interfaces/StageModel"
import {Tools} from "../Utils/Tools"

export class QuarterFinalModel implements StageModel {
	private teams: TeamModel[][]
	private readonly fetchedTeams: TeamModel[][]

	constructor() {
		this.teams = []
		const api = new LocalStorageModel("eighthFinal")
		this.fetchedTeams = api.fetchData()
	}

	init() {
		if (this.fetchedTeams.some(match => match.some(teams => teams.isQualified))) this.teams = this.mapTeams()
		this.pushToLocalStorage(this.teams)

		return this.teams
	}

	private resetTeam(team: TeamModel) {
		team.score = 0
		team.isQualified = false

		return team
	}

	private findTeams(firstGroup: number, secondGroup: number): TeamModel[] {
		const firstTeam = this.fetchedTeams[firstGroup].find(team => team.isQualified)
		const secondTeam = this.fetchedTeams[secondGroup].find(team => team.isQualified)

		return firstTeam && secondTeam
			   ? [this.resetTeam(firstTeam), this.resetTeam(secondTeam)]
			   : [Tools.generateFakeTeam(), Tools.generateFakeTeam()]
	}

	private mapTeams(): [TeamModel[], TeamModel[], TeamModel[], TeamModel[]] {
		const first = this.findTeams(0, 1)
		const second = this.findTeams(2, 3)
		const third = this.findTeams(4, 5)
		const fourth = this.findTeams(6, 7)

		return [first, second, third, fourth]
	}

	private pushToLocalStorage(teams: TeamModel[][]) {
		return (localStorage.quarterFinal = JSON.stringify(teams))
	}
}
