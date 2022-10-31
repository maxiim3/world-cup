import {TeamModel} from "./TeamModel"
import {Tools} from "../Misc/Utils/Tools"

export class MatchModel {
	private readonly guest: TeamModel
	private readonly host: TeamModel

	constructor(teams: TeamModel[]) {
		this.host = teams[0]
		this.guest = teams[1]
	}

	play() {
		const score = (team: TeamModel) => Math.round(Math.ceil(Tools.GenerateRandomGoals(team) / 2))

		let hostScore = score(this.host)
		let guestScore = score(this.guest)

		while (hostScore === guestScore) {
			hostScore = score(this.host)
			guestScore = score(this.guest)
		}

		this.host.score += hostScore
		this.guest.score += guestScore
		const winner = [this.host, this.guest].reduce((a, b) => (a.score > b.score ? a : b))
		const looser = [this.host, this.guest].reduce((a, b) => (a.score < b.score ? a : b))

		winner.xp += 3
		winner.isQualified = true

		looser.xp -= 2
		looser.isQualified = false

		return [winner, looser]
	}
}