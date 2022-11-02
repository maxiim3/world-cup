import {TeamModel} from "./TeamModel"
import {LocalStorageDataProps} from "../Misc/Types/LocalStorageDataProps"
import {GROUP_KEYS} from "../Misc/Constant/GROUP_KEYS"
import {LocalStorageModel} from "./LocalStorageModel"
import {Tools} from "../Misc/Utils/Tools"
import {StageModel} from "../Misc/Interfaces/StageModel"

export class EightFinalModel implements StageModel {
	private teams: TeamModel[][]
	private readonly fetchedTeams: LocalStorageDataProps[]

	constructor() {
		this.teams = []
		const api = new LocalStorageModel("groups")
		this.fetchedTeams = this.resetTeams(api.fetchData())
	}

	init() {
		this.teams = this.mapTeams()
		this.pushToLocalStorage(this.teams)

		return this.teams
	}

	private resetTeams(data: LocalStorageDataProps[]) {
		data.forEach((data: LocalStorageDataProps) => data?.teams?.forEach(team => (team.score = 0)))
		return data
	}

	private findTeams(firstGroup: number, secondGroup: number) {
		const group1: string = GROUP_KEYS[firstGroup]
		const group2: string = GROUP_KEYS[secondGroup]

		const firstTeam: TeamModel = this.fetchedTeams
			? this.fetchedTeams.filter(group => group.label === group1)[0].teams[0]
			: Tools.generateFakeTeam()
		const secondTeam: TeamModel = this.fetchedTeams
			? this.fetchedTeams.filter(group => group.label === group2)[0].teams[1]
			: Tools.generateFakeTeam()
		return [firstTeam, secondTeam]
	}

	private mapTeams(): TeamModel[][] {
		const first = this.findTeams(0, 1)
		const second = this.findTeams(2, 3)
		const third = this.findTeams(4, 5)
		const fourth = this.findTeams(6, 7)
		const fifth = this.findTeams(1, 0)
		const sixth = this.findTeams(3, 2)
		const seventh = this.findTeams(5, 4)
		const eighth = this.findTeams(7, 6)

		return [first, second, third, fourth, fifth, sixth, seventh, eighth]
	}

	private pushToLocalStorage(teams: TeamModel[][]) {
		localStorage.eighthFinal = JSON.stringify(teams)
	}
}
