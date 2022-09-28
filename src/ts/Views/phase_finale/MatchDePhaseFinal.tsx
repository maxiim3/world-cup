import {TeamModel} from "../../Models/TeamModel"
import {Tools} from "../../Tools/Tools"
import React, {useEffect, useState} from "react"
import {Match} from "../../Models/MatchModel"
import {TeamRow} from "../static/TeamRow"
import {Rounds} from "../../App"

export function MatchDePhaseFinal(props: {
	teams: TeamModel[]
	id: string
	// onClick: () => void
	label: Rounds
}) {
	const tBodyId = Tools.generateId("id", "tbody", props.id, Math.random().toString())
	const buttonID = Tools.generateId("button", props.id, props.label.toString())
	const team1Id = Tools.generateId("team1", Math.random().toString(), props.label.toString())
	const team2Id = Tools.generateId("team2", Math.random().toString(), props.label.toString())

	const [matchIsPlayed, setMatchIsPlayed] = useState<boolean>()
	useEffect(() => {
		return () => {
			setMatchIsPlayed(false)
		}
	}, [])


	const setIsQualified = (team: TeamModel, value: boolean) => {
		switch (props.label) {
			case Rounds.Group:
				team.rounds.groups.isQualified = value
				break
			case Rounds.Huitieme:
				team.rounds.huitieme.isQualified = value
				break
			case Rounds.Quart:
				team.rounds.quart.isQualified = value
				break
			case Rounds.Demi:
				team.rounds.semiFinal.isQualified = value
				break
			case Rounds.Finale:
				team.rounds.final.isQualified = value
				break
			case Rounds.Done:
				team.rounds.winner = value
				break
		}
	}
	const getIsQualified = (team: TeamModel): boolean => {
		switch (props.label) {
			case Rounds.Group:
				return team.rounds.groups.isQualified
			case Rounds.Huitieme:
				return team.rounds.huitieme.isQualified
			case Rounds.Quart:
				return team.rounds.quart.isQualified
			case Rounds.Demi:
				return team.rounds.semiFinal.isQualified
			case Rounds.Finale:
				return team.rounds.final.isQualified
			case Rounds.Done:
				return team.rounds.winner
		}
	}
	const setPoints = (team: TeamModel, value: number) => {
		switch (props.label) {
			case Rounds.Group:
				team.rounds.groups.points = value
				break
			case Rounds.Huitieme:
				team.rounds.huitieme.points = value
				break
			case Rounds.Quart:
				team.rounds.quart.points = value
				break
			case Rounds.Demi:
				team.rounds.semiFinal.points = value
				break
			case Rounds.Finale:
				team.rounds.final.points = value
				break
			case Rounds.Done:
				break
		}
	}
	const getPoints = (team: TeamModel): number => {
		switch (props.label) {
			case Rounds.Group:
				return team.rounds.groups.points
			case Rounds.Huitieme:
				return team.rounds.huitieme.points
			case Rounds.Quart:
				return team.rounds.quart.points
			case Rounds.Demi:
				return team.rounds.semiFinal.points
			case Rounds.Finale:
				return team.rounds.final.points
			case Rounds.Done:
				return team.rounds.final.points
		}
	}

	function simulateMatch(event: React.MouseEvent<HTMLButtonElement>) {
		const match = new Match(props.teams[0], props.teams[1])
		const isWinner = match.playMatch()
		if (isWinner) {
			event.currentTarget.disabled = true
			const targetWinner = props.teams.filter(team => team.id === isWinner.id)[0]
			setPoints(targetWinner, Math.ceil(Math.random() * 3 + 1))
			setIsQualified(targetWinner, true)
			const targetLooser = props.teams.filter(team => team.id !== isWinner.id)[0]
			setPoints(targetLooser, Math.ceil(Math.random()))
			setIsQualified(targetLooser, false)
			setMatchIsPlayed(true)
			// props.onClick()
		} else simulateMatch(event)
	}

	// todo auto btn siumnulate not working, refactor all phadse de grope to one component with teams.lengtth/2 for n matchs
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
						points={matchIsPlayed ? getPoints(props.teams[0]) : 0}
						isWinner={matchIsPlayed ? (getIsQualified(props.teams[0]) ? "true" : "false") : ""}
					/>
					<TeamRow
						key={Tools.generateId(team2Id)}
						team={props.teams[1]}
						points={matchIsPlayed ? getPoints(props.teams[1]) : 0}
						isWinner={matchIsPlayed ? (getIsQualified(props.teams[1]) ? "true" : "false") : ""}
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
