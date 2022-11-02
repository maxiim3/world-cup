import {TeamModel} from "./TeamModel"
import {Tools} from "../Misc/Utils/Tools"

export type TeamFlyProps = {
	attack: number
	defense: number
	stamina: number
	mood: number
}

export type TeamMatchModel = {
	props: TeamModel
	flySkills: TeamFlyProps
	score: number
}

export class MatchModel {
	private readonly guest: TeamMatchModel
	private readonly host: TeamMatchModel
	private readonly initialHost: TeamModel
	private readonly initialGuest: TeamModel

	constructor(teams: TeamModel[]) {
		this.initialHost = teams[0]
		this.initialGuest = teams[1]
		this.host = {
			props: Object.assign({}, teams[0]),
			flySkills: Object.assign({}, teams[0].skills),
			score: 0,
		}
		this.guest = {
			props: Object.assign({}, teams[1]),
			flySkills: Object.assign({}, teams[1].skills),
			score: 0,
		}
	}

	private refactorScore(hostScore: number, guestScore: number) {
		const modulo = (n: number) => {
			return hostScore % n === 0 && guestScore % n === 0
		}

		if (modulo(5)) {
			if (modulo(10)) return [hostScore - 4, guestScore - 9]
			return [hostScore, guestScore - 5]
		} else if (modulo(2)) {
			if (modulo(4)) return [hostScore / 4, guestScore / 4]
			return [hostScore / 2, guestScore / 2]
		} else if (modulo(3)) {
			if (modulo(9)) return [hostScore / 9, guestScore / 9]
			else if (modulo(6)) return [hostScore / 6, guestScore / 6]
			return [hostScore / 3, guestScore / 3]
		}
		else if (Math.abs(hostScore - guestScore) > 6 || hostScore > 6 || guestScore > 6)
			return [Math.ceil(Math.round(hostScore / 2)), Math.ceil(Math.round(guestScore / 2))]
		else return [hostScore, guestScore]
	}

	private play() {
		const hostTries = Math.round((this.host.flySkills.attack * (this.host.flySkills.mood / 100)) / 10)
		const guestTries = Math.round((this.guest.flySkills.attack * (this.guest.flySkills.mood / 100)) / 10)

		function handleTries(attacker: TeamMatchModel, defender: TeamMatchModel, tries: number) {
			for (let i = 0; i < tries; i++) {
				// console.log(i)
				const hasScored = hostAttack(attacker, defender)
				attacker.flySkills.stamina -= 5
				if (hasScored) {
					attacker.score++
					attacker.flySkills.mood += 5
					attacker.flySkills.attack += 3

					defender.flySkills.mood -= 5
					defender.flySkills.defense -= 2
				} else {
					attacker.flySkills.mood -= 2
					attacker.flySkills.attack -= 1

					defender.flySkills.mood += 2
					defender.flySkills.defense += 1
				}
			}
		}

		function hostAttack(attacker: TeamMatchModel, defender: TeamMatchModel) {
			const attackerMultiple = (attacker.flySkills.stamina / 100 + attacker.flySkills.mood / 100) / 2
			const attackerPoints = attacker.flySkills.attack * attackerMultiple
			const defenderMultiple = (defender.flySkills.stamina / 100 + defender.flySkills.mood / 100) / 2
			const defenderPoints = defender.flySkills.defense * defenderMultiple

			const attackerScore = Tools.RandomNumber(100) + attackerPoints
			const defenderScore = Tools.RandomNumber(100) + defenderPoints

			return attackerScore > defenderScore
		}

		handleTries(this.host, this.guest, hostTries)
		handleTries(this.guest, this.host, guestTries)
	}

	private updateTeams() {
		if (this.host.score === this.guest.score) {
			this.initialHost.skills.mood -= 2
			this.initialHost.skills.stamina -= 3
			this.initialGuest.skills.mood -= 2
			this.initialGuest.skills.stamina -= 3
			return [this.initialHost, this.initialGuest]
		}
		const winner = this.host.score > this.guest.score ? this.initialHost : this.initialGuest
		const looser = this.host.score < this.guest.score ? this.initialHost : this.initialGuest
		winner.skills.mood += 5
		winner.skills.attack += Math.floor(winner.score / 3)
		winner.skills.defense -= Math.floor(looser.score / 3)
		winner.skills.stamina -= 3

		looser.skills.mood -= 5
		looser.skills.attack += Math.floor(looser.score / 3)
		looser.skills.defense -= Math.floor(winner.score / 3)
		looser.skills.stamina -= 3

		return [winner, looser]
	}

	runEliminationMatch() {
		while (this.guest.score === this.host.score) {
			// Match a elimination direct, rejoue le match si égalité
			this.play()
		}
		const [hostScore, guestScore] = this.refactorScore(this.host.score, this.guest.score)

		this.initialHost.score = hostScore
		this.initialGuest.score = guestScore

		const [winner, looser] = this.updateTeams()
		winner.isQualified = true
		looser.isQualified = false
		return [winner, looser]
	}

	runGroupMatch() {
		this.play()

		// const [hostScore, guestScore] = this.refactorScore(this.host.score, this.guest.score)
		const winner = this.host.score > this.guest.score ? this.initialHost : this.initialGuest
		winner.score += 3

		return this.updateTeams()
	}
}
