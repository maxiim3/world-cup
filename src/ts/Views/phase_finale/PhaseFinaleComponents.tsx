import {TeamModel} from "../../Models/TeamModel"
import React from "react"
import {Tools} from "../../Tools/Tools"
import {Rounds} from "../../App"
import {ButtonSimulateAll} from "../static/ButtonSimulateAll"
import {MatchDePhaseFinal} from "./MatchDePhaseFinal"

export function HuitiemeDeFinale(props: {qualifiedTeams: TeamModel[]; round: Rounds; setRound: (state: Rounds) => void}) {
	const round = props.round
	function getMatchs() {
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

	return (
		<section className="round__container">
			<ButtonSimulateAll round={round} />
			<h2 className={"round__title"}>{"C'est les Huititeme!"}</h2>
			{getMatchs()?.map(teams => (
				<MatchDePhaseFinal
					key={`${(Math.random() * 1000000).toString()}  ${round}`}
					id={Tools.generateId(getMatchs().indexOf(teams).toString())}
					teams={teams}
					// onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
					label={round}
				/>
			))}
		</section>
	)
}

export function QuartDeFinal(props: {qualifiedTeams: TeamModel[]; round: Rounds; setRound: (state: Rounds) => void}) {
	const round = props.round
	function getMatchs() {
		return [
			[props.qualifiedTeams[0], props.qualifiedTeams[1]],
			[props.qualifiedTeams[2], props.qualifiedTeams[3]],
			[props.qualifiedTeams[4], props.qualifiedTeams[5]],
			[props.qualifiedTeams[6], props.qualifiedTeams[7]],
		]
	}

	return (
		<section className="round__container">
			<ButtonSimulateAll round={round} />
			<h2 className={"round__title"}>{"Quart de Final"}</h2>
			{getMatchs()?.map(teams => (
				<MatchDePhaseFinal
					key={`${(Math.random() * 1000000).toString()}  ${round}`}
					id={Tools.generateId(getMatchs().indexOf(teams).toString())}
					teams={teams}
					// onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
					label={round}
				/>
			))}
		</section>
	)
}

export function DemiFinal(props: {qualifiedTeams: TeamModel[]; round: Rounds; setRound: (state: Rounds) => void}) {
	const round = props.round
	function getMatchs() {
		return [
			[props.qualifiedTeams[0], props.qualifiedTeams[1]],
			[props.qualifiedTeams[2], props.qualifiedTeams[3]],
		]
	}

	return (
		<section className="round__container">
			<ButtonSimulateAll round={round} />
			<h2 className={"round__title"}>{"Demi Finales !!"}</h2>
			{getMatchs()?.map(teams => (
				<MatchDePhaseFinal
					key={`${(Math.random() * 1000000).toString()} ${round}`}
					id={Tools.generateId(getMatchs().indexOf(teams).toString())}
					teams={teams}
					// onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
					label={round}
				/>
			))}
		</section>
	)
}

export function Final(props: {qualifiedTeams: TeamModel[]; round: Rounds; setRound: (state: Rounds) => void}) {
	const round = props.round
	function getFinalTeams() {
		return [props.qualifiedTeams[0], props.qualifiedTeams[1]]
	}

	return (
		<section className="round__container">
			<ButtonSimulateAll round={round} />
			<h2 className={"round__title"}>{"La Grande Finale !!!"}</h2>
			{
				<MatchDePhaseFinal
					key={`${(Math.random() * 1000000).toString()}  ${round}`}
					id={Tools.generateId("final")}
					teams={getFinalTeams()}
					// onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
					label={round}
				/>
			}
		</section>
	)
}
