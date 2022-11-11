import {TeamModel} from "./TeamModel"
import {Tools} from "../Utils/Tools"

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

	runEliminationMatch() {
		while (this.guest.score === this.host.score) {
			// Match a elimination direct, rejoue le match si égalité
			this.play()
		}

		this.initialHost.score = this.host.score
		this.initialGuest.score = this.guest.score

		const [winner, looser] = this.updateTeams()
		const [updatedWinner, updatedLooser] = this.refactorScore(winner, looser)

		updatedWinner.isQualified = true
		updatedLooser.isQualified = false
		return [updatedWinner, updatedLooser]
	}

	runGroupMatch() {
		this.play()

		// const [hostScore, guestScore] = this.refactorScore(this.host.score, this.guest.score)
		const winner = this.host.score > this.guest.score ? this.initialHost : this.initialGuest
		winner.score += 3

		return this.updateTeams()
	}

	private refactorScore(winner: TeamModel, looser: TeamModel) {
		let diff: number = winner.score - looser.score


		diff = diff > 2 ? Math.round(Math.log(diff)) : diff
		const goals = [0, 2, 1, 0, 2, 4, 0, 1, 0, 0, 2, 1, 3, 0, 1, 0, 0, 0, 2, 1, 0, 2, 0, 1, 1, 3, 0, 1, 0, 1, 0, 2, 0]
		const randomIndex = Tools.RandomNumber(goals.length - 1)
		looser.score = goals[randomIndex]
		winner.score = looser.score + diff
		return [winner, looser]
	}

	private play() {
		const getTries = ({attack, mood, stamina}: {attack: number; mood: number; stamina: number}) => {
			const logAndRound = (n: number) => Math.round(Math.log(n))
			const sqrtAndRound = (n: number) => Math.round(Math.sqrt(n))
			const logStamina = logAndRound(stamina)
			const logMood = logAndRound(mood)
			const sqrtAttack = sqrtAndRound(attack)
			const logAttack = logAndRound(attack)
			return logMood + logAttack + sqrtAttack + logStamina - 10
		}
		const hostTries = getTries(this.host.flySkills)
		const guestTries = getTries(this.guest.flySkills)

		const hostAttack = (attacker: TeamMatchModel, defender: TeamMatchModel) => {
			const attackerMultiple = (attacker.flySkills.stamina / 100 + attacker.flySkills.mood / 100) / 2
			const attackerPoints = attacker.flySkills.attack * attackerMultiple
			const defenderMultiple = (defender.flySkills.stamina / 100 + defender.flySkills.mood / 100) / 2
			const defenderPoints = defender.flySkills.defense * defenderMultiple

			const attackerScore = Tools.RandomNumber(100) + attackerPoints
			// reset mood
			const defenderScore = Tools.RandomNumber(100) + defenderPoints

			return attackerScore > defenderScore
		}

		const resetSkills = () => {
			this.host.flySkills = Object.assign({}, this.initialHost.skills)
			this.guest.flySkills = Object.assign({}, this.initialGuest.skills)
		}

		function handleTries(attacker: TeamMatchModel, defender: TeamMatchModel, tries: number) {
			resetSkills()
			for (let i = 0; i < tries; i++) {
				// console.log(i)
				// diminish defender stamina
				const hasScored = hostAttack(attacker, defender)
				attacker.flySkills.stamina -= 2
				defender.flySkills.stamina -= 1
				if (hasScored) {
					attacker.score++
					attacker.flySkills.mood += 2
					attacker.flySkills.attack += 1

					defender.flySkills.mood -= 2
					defender.flySkills.defense -= 1
				}
				else {
					attacker.flySkills.mood -= 2
					attacker.flySkills.attack -= 1

					defender.flySkills.mood += 2
					defender.flySkills.defense += 1
				}
			}
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
}
