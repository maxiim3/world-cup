import {TeamModel} from "./TeamModel"

export class Match {
	host: TeamModel
	hostGoals: number
	guest: TeamModel
	guestGoals: number

	constructor(host: TeamModel, guest: TeamModel) {
		this.host = host
		this.guest = guest
		this.hostGoals = 0
		this.guestGoals = 0
	}

	random(team: TeamModel) {
		function shots() {
			const scores = []
			for (let chance = 0; chance < team.xp * 1000; chance++) {
				scores.push(Math.random())
			}
			const sum = Math.round(scores.reduce((res, score) => res + score))
			return Math.round(sum / scores.length)
		}

		const collection = []
		for (let i = 0; i < team.xp; i++) {
			collection.push(shots())
		}
		return collection.reduce((res, score) => res + score)
	}

	 playMatch(): TeamModel | null {
		this.hostGoals = this.random(this.host)
		this.guestGoals = this.random(this.guest)
		let winner: TeamModel | null = null
		if (this.hostGoals !== this.guestGoals) {
			if (this.hostGoals < this.guestGoals) winner = this.guest
			else if (this.hostGoals > this.guestGoals) winner = this.host
		}
		return winner || null
	}
}
