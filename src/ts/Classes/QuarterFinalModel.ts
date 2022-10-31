import {TeamModel} from "./TeamModel"
import {LocalStorageDataProps} from "../Misc/Types/LocalStorageDataProps"
import {LocalStorageModel} from "./LocalStorageModel"
import {StageModel} from "../Misc/Interfaces/StageModel"
import {Tools} from "../Misc/Utils/Tools"

export class QuarterFinalModel implements StageModel {
	private teams: TeamModel[][]
	private readonly fetchedTeams: LocalStorageDataProps[]

	constructor() {
		this.teams = []
		const api = new LocalStorageModel("eighthFinal")
		this.fetchedTeams = api.fetchData()
	}

	init() {
		// this.teams = this.mapTeams()
		console.log(this.teams)
		this.pushToLocalStorage(this.teams)

		return this.teams
	}
	//
	// private findTeams(firstGroup: number, secondGroup: number) {
	//
	// 	this.fetchedTeams.forEach(teams => {
	// 		teams.
	// 	})
	// 	const firstTeam: TeamModel =
	// 		/*this.fetchedTeams[firstGroup] ? this.fetchedTeams[firstGroup].filter(teams => teans.isQualified)
	// 	 : */ Tools.generateFakeTeam()
	// 	const secondTeam: TeamModel =
	// 		/*this.fetchedTeams[firstGroup] ? this.fetchedTeams[secondGroup].filter(teams => teans.isQualified)
	// 	 :*/ Tools.generateFakeTeam()
	// 	return [firstTeam, secondTeam]
	// }
	//
	// private mapTeams(): TeamModel[][] {
	// 	const first = this.findTeams(1, 2)
	// 	const second = this.findTeams(3, 4)
	// 	const third = this.findTeams(5, 6)
	// 	const fourth = this.findTeams(7, 8)
	//
	// 	return [first, second, third, fourth]
	// }

	private pushToLocalStorage(teams: TeamModel[][]) {
		return (localStorage.eighthFinal = JSON.stringify(teams))
	}
}
