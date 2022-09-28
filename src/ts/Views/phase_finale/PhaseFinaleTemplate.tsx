import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import {ButtonSimulateAll} from "../static/ButtonSimulateAll"
import {MatchDePhaseFinal} from "./MatchDePhaseFinal"
import {Tools} from "../../Tools/Tools"
import {Rounds} from "../../App"

export function PhaseFinaleTemplate(props: {
	qualifiedTeams: TeamModel[]
	round: Rounds
	setRound: (state: Rounds) => void
}) {
	function getMatchs() {
		if (props.round === Rounds.Huitieme) {
			return [
				[props.qualifiedTeams[0], props.qualifiedTeams[3]],
				[props.qualifiedTeams[4], props.qualifiedTeams[7]],
				[props.qualifiedTeams[8], props.qualifiedTeams[11]],
				[props.qualifiedTeams[12], props.qualifiedTeams[15]],
				[props.qualifiedTeams[2], props.qualifiedTeams[1]],
				[props.qualifiedTeams[6], props.qualifiedTeams[5]],
				[props.qualifiedTeams[10], props.qualifiedTeams[9]],
				[props.qualifiedTeams[14], props.qualifiedTeams[13]],
			]
		}
		else if (props.round === Rounds.Quart) {
			console.log( [
							 [props.qualifiedTeams[0], props.qualifiedTeams[1]],
							 [props.qualifiedTeams[2], props.qualifiedTeams[3]],
							 [props.qualifiedTeams[4], props.qualifiedTeams[5]],
							 [props.qualifiedTeams[6], props.qualifiedTeams[7]],
						 ])
			return [
				[props.qualifiedTeams[0], props.qualifiedTeams[1]],
				[props.qualifiedTeams[2], props.qualifiedTeams[3]],
				[props.qualifiedTeams[4], props.qualifiedTeams[5]],
				[props.qualifiedTeams[6], props.qualifiedTeams[7]],
			]
		}
		else if (props.round === Rounds.Demi) {
			return [
				[props.qualifiedTeams[0], props.qualifiedTeams[1]],
				[props.qualifiedTeams[2], props.qualifiedTeams[3]],
			]
		}
		else {
			return [
				[props.qualifiedTeams[0], props.qualifiedTeams[1]],
				[props.qualifiedTeams[2], props.qualifiedTeams[3]],
			]
		}
		// else {
		// 	const createMatch: Array<TeamModel[]> = [] as Array<TeamModel[]>
		// 	const numberOfTeams = props.qualifiedTeams.length
		// 	const {qualifiedTeams: teams} = props
		// 	for (let i = 0; i < numberOfTeams; i += 2) {
		// 		createMatch.push([teams[i], teams[i + 1]])
		// 	}
		// 	return createMatch
		// }
	}

	const getTitle = () => {
		switch (props.round) {
			case Rounds.Huitieme:
				return "C'est les Huititeme!"
			case Rounds.Quart:
				return "Quart de Final"
			case Rounds.Demi:
				return "Demi Finales !!"
			case Rounds.Finale:
				return "La Grande Finale !!!"
			default:
				return "Default..."
		}
	}

	return (
		<section className="round__container">
			<ButtonSimulateAll round={props.round} />
			<h2 className={"round__title"}>{getTitle()}</h2>
			{getMatchs()?.map(teams => (
				<MatchDePhaseFinal
					key={`${(Math.random() * 1000000).toString()}  ${props.round}`}
					id={Tools.generateId(getMatchs().indexOf(teams).toString())}
					teams={teams}
					// onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
					label={props.round}
				/>
			))}
		</section>
	)
}
