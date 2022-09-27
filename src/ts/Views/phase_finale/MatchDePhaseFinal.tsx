import {TeamModel} from "../../Models/TeamModel"
import {Tools} from "../../Tools/Tools"
import React, {useState} from "react"
import {Match} from "../../Models/MatchModel"
import {TeamRow} from "../static/TeamRow"
import {Rounds} from "../../App"

export function MatchDePhaseFinal(props: {
	teams: [TeamModel, TeamModel]
	id: string
	onClick: () => void
	label: Rounds
}) {
	const tBodyId = Tools.generateId("id", "tbody", props.id, Math.random().toString())
	const buttonID = Tools.generateId("button", props.id, props.label.toString())
	const team1Id = Tools.generateId("team1", Math.random().toString())
	const team2Id = Tools.generateId("team2", Math.random().toString())
	const [matchIsPlayed, setMatchIsPlayed] = useState(false)

	function simulateMatch(event: React.MouseEvent<HTMLButtonElement>) {
		console.log(event.currentTarget)
		console.log(props.label)
		event.currentTarget.disabled = true
		const match = new Match(props.teams[0], props.teams[1])
		const isWinner = match.playMatch()
		if (isWinner) {
			const targetWinner = props.teams.filter(team => team.id === isWinner.id)[0]
			targetWinner.points = Math.ceil(Math.random() * 3 + 1)
			targetWinner.isQualified = true
			const targetLooser = props.teams.filter(team => team.id !== isWinner.id)[0]
			targetLooser.points = Math.ceil(Math.random())
			targetLooser.isQualified = false
			setMatchIsPlayed(true)
			props.onClick()
		} else simulateMatch(event)
	}

	return (
		<article>
			<h3 className={"group__name"}>Match {parseInt(props.id) + 1}</h3>
			<table className={`group__table group__table--${props.id}`}>
				<thead>
					<tr>
						<th>nom</th>
						<th>flag</th>
						<th>score</th>
					</tr>
				</thead>
				<tbody id={tBodyId}>
					<TeamRow
						key={Tools.generateId(team1Id)}
						team={props.teams[0]}
						initialPoints={matchIsPlayed ? props.teams[0].points : 0}
						isWinner={matchIsPlayed ? (props.teams[0].isQualified ? "true" : "false") : ""}
					/>
					<TeamRow
						key={Tools.generateId(team2Id)}
						team={props.teams[1]}
						initialPoints={matchIsPlayed ? props.teams[1].points : 0}
						isWinner={matchIsPlayed ? (props.teams[1].isQualified ? "true" : "false") : ""}
					/>
				</tbody>
			</table>
			<button
				id={buttonID}
				className={"btn__simulate-" + props.label}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => simulateMatch(event)}>
				Simulate
			</button>
		</article>
	)
}
