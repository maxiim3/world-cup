type TeamProps = {
	name: string
	flag: string
	xp: number
	skills: SkillsProps
}

export type SkillsProps = {
	attack: number
	defense: number
	stamina: number
	mood: number
}

export class TeamModel {
	name: string
	flag: string
	group: string
	xp: number
	skills : SkillsProps
	id: string
	score: number
	isQualified: boolean

	constructor(team: TeamProps, group: string) {
		this.name = team.name
		this.flag = team.flag
		this.xp = team.xp
		const flatName = this.name.split(" ").join("").split("-").join("").toLowerCase()
		this.id = flatName.split("").splice(0, 4).join("")
		this.group = group
		this.score = 0
		this.isQualified = false
		this.skills = team.skills
	}
}
