import React, {useEffect, useState} from "react"
import {ROUNDS} from "../Constant/ROUNDS"
import RoundSwitcher from "./RoundSwitcher"
import {Tools} from "../Utils/Tools"
import {fromLocalStorage} from "../Utils/FromLocalStorage"
import {TeamModel} from "../Models/TeamModel"
import {random} from "../Utils/Random"
import {fetchTeams} from "../Utils/FetchTeams"
import {RoundProps} from "../Types/StateProps"

function generateScore(teams: TeamModel[]) {
	return teams.map(t => {
		function reduceScore(): number {
			let score = 0

			let count = 3
			while (count > 0) {
				let randomize
				if (random(1000) % 5 === 0) randomize = 3
				else if (random(1000) % 3 === 0) randomize = 1
				else randomize = 0
				score += randomize
				count--
			}
			return score
		}

		t.score = reduceScore()
		return t
	})
}

function setRounds(rounds: RoundProps, teams: TeamModel[]) {
	switch (rounds) {
		case ROUNDS.group:
			return fromLocalStorage().groups.set(teams.sort((a, b) => b.xp - a.xp))
		case ROUNDS.huitieme:
			return
		case ROUNDS.quart:
			return
		case ROUNDS.demi:
			return
		case ROUNDS.finale:
			return
		default:
			return
	}
}

export function Rounds() {
	const [rounds, setRounds] = useState<RoundProps>(ROUNDS.group)
	useEffect(() => {
		localStorage.currentRound = JSON.stringify({
			label: rounds.label,
			index: rounds.index,
		})
	})
	const [teams, setTeams] = useState(fetchTeams())
	useEffect(() => {
		setRounds(rounds, teams)
	}, [fromLocalStorage, rounds])

	return (
		<section className={"app"}>
			<div className="app__phaseDeGroupe">
				<RoundSwitcher
					componentRound={ROUNDS.group}
					key={Tools.generateId("group")}
					onChangeRound={async () => {
						setTeams(generateScore(teams))
						setRounds(ROUNDS.huitieme)
					}}
					currentRound={rounds}
					teams={null}
				/>
			</div>
			<div className="app__phaseFinale">
				<RoundSwitcher
					componentRound={ROUNDS.huitieme}
					key={Tools.generateId("huitieme")}
					onChangeRound={() => setRounds(ROUNDS.quart)}
					currentRound={rounds}
					teams={null}
				/>
				<RoundSwitcher
					componentRound={ROUNDS.quart}
					key={Tools.generateId("quart")}
					onChangeRound={() => setRounds(ROUNDS.demi)}
					currentRound={rounds}
					teams={null}
				/>
				<RoundSwitcher
					componentRound={ROUNDS.demi}
					key={Tools.generateId("demi")}
					onChangeRound={() => setRounds(ROUNDS.finale)}
					currentRound={rounds}
					teams={null}
				/>
				<RoundSwitcher
					componentRound={ROUNDS.finale}
					key={Tools.generateId("finale")}
					onChangeRound={() => setRounds(ROUNDS.winner)}
					currentRound={rounds}
					teams={null}
				/>
				<RoundSwitcher
					componentRound={ROUNDS.winner}
					key={Tools.generateId("winner")}
					onChangeRound={() => setRounds(ROUNDS.group)}
					currentRound={rounds}
					teams={null}
				/>
			</div>
		</section>
	)
}
