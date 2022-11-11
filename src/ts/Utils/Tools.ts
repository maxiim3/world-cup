import {TeamModel} from "../Classes/TeamModel"

export class Tools {
	static generateId(...keys: string[]) {
		const ids: string[] = []
		const ranNum = Math.floor(Math.random() * 1000 + 100)
		keys.forEach(key => {
			const word = key.toLowerCase().split("").splice(0, 3)
			ids.push(word.join(""))
			ids.push(ranNum.toString())
		})
		return ids.join("_")
	}

	static RandomNumber(max: number) {
		return Math.floor(Math.random() * max)
	}

	static Pause = async (ms: number) =>
		new Promise((resolve: Function) => {
			setTimeout(() => {
				resolve()
			}, ms)
		})

	/**
	 * Generate how many goals will be score. Depends on teams XP. More XP = More chance to score!
	 * @param {TeamModel} team
	 * @return {number}
	 * @constructor
	 */
	static GenerateRandomGoals(team: TeamModel) {
		if (team.xp) return Math.floor((Math.random() * (team.xp * 3)) / 30)
		return 0
	}

	static generateIds(teams: TeamModel[]) {
		return (
			Tools.generateId(`eighthFinal${Tools.RandomNumber(1_000_000)}_${Math.round(Math.random() * 100)}`) +
			Tools.generateId(teams[0].id) +
			Tools.generateId(teams[1].id)
		)
	}

	static generateFakeTeam(): TeamModel {
		return new TeamModel({name: "__", flag: "", xp: 0, skills: {attack: 0, stamina: 0, defense: 0, mood: 0}}, "")
	}
}
