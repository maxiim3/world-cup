import {TeamProps} from "../Types/Teams"

export class TeamModel {
	name: string
	flag: string
	group: string
	xp: number
	id: string
	score: number

	constructor(team: TeamProps, group: string) {
		this.name = team.name
		this.flag = team.flag
		this.xp = team.xp
		const flatName = this.name.split(" ").join("").split("-").join("").toLowerCase()
		this.id = flatName.split("").splice(0, 4).join("")
		this.group = group
		this.score = 0
	}
}
