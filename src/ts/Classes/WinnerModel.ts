import {TeamModel} from "./TeamModel"
import {LocalStorageModel} from "./LocalStorageModel"
import {StageModel} from "../Interfaces/StageModel"
import {Tools} from "../Utils/Tools"

export class WinnerModel implements StageModel {
	private winner: TeamModel
	private readonly fetchedTeams: TeamModel[][]

	constructor() {
		this.winner = Tools.generateFakeTeam()
		const api = new LocalStorageModel("final")
		this.fetchedTeams = api.fetchData()
	}

	init() {
		const winner = this.fetchedTeams.map(teams => teams.find(team => team.isQualified)) as TeamModel[]
		this.winner = this.resetTeam(winner[0]) || Tools.generateFakeTeam()
		this.pushToLocalStorage(this.winner)

		return this.winner
	}

	private resetTeam(team: TeamModel) {
		team.score = 0
		team.isQualified = false

		return team
	}

	private pushToLocalStorage(winner: TeamModel) {
		return (localStorage.winner = JSON.stringify(winner))
	}
}
