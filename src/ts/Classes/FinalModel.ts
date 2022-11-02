import {TeamModel} from "./TeamModel"
import {LocalStorageModel} from "./LocalStorageModel"
import {StageModel} from "../Misc/Interfaces/StageModel"
import {Tools} from "../Misc/Utils/Tools"

export class FinalModel implements StageModel {
	private teams: TeamModel[][]
	private readonly fetchedTeams: TeamModel[][]

	constructor() {
		this.teams = []
		const api = new LocalStorageModel("semiFinal")
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

	private mapTeams(): TeamModel[][] {
		const final = this.findTeams(0, 1)
		return [final]
	}

	private pushToLocalStorage(teams: TeamModel[][]) {
		return (localStorage.final = JSON.stringify(teams))
	}
}
