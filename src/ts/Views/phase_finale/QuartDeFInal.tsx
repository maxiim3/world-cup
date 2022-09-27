import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "../static/Loader"
import {Tools} from "../../Tools/Tools"
import {MatchDePhaseFinal} from "./MatchDePhaseFinal"
import NextRoundButton from "../static/NextRoundButton"
import {Rounds} from "../../App"

export function QuartDeFinal (props: {
	teams8: TeamModel[]
	round: Rounds
	setRound: (state: Rounds) => void
	setTeams4: (state: TeamModel[]) => void
}) {
	const [loading, setLoading] = useState<Boolean>(true)

	const [nextBtnIsEnable, setNextBtnIsEnable] = useState<boolean>(false)
	/**
	 * Est Incrémenté à chaque fois qu'un groupe est joué
	 */
	const [countMatchPlayed, setCountMatchPlayed] = useState(0)

	useEffect(() => {
		if (countMatchPlayed === 4) setNextBtnIsEnable(true)
		return () => {}
	}, [countMatchPlayed, setNextBtnIsEnable])

	const [matchs, setMatchs] = useState<Array<[TeamModel, TeamModel]>>([])
	useEffect(() => {
		const waiting = setTimeout(() => {
			setMatchs([
				[props.teams8[0], props.teams8[3]],
				[props.teams8[2], props.teams8[1]],
			])
			setLoading(false)
		}, 850)

		return () => clearTimeout(waiting)
	}, [setLoading])

	function handleNextRound() {
		setNextBtnIsEnable(false)
		const qualifiedTeams: TeamModel[] = props.teams8.filter(team => team.isQualified)
		props.setTeams4(qualifiedTeams)
		props.setRound(Rounds.Demi)
	}

	if (loading) return <Loader />
	else
		return (
			<section className="round__container">
				{/**
				 Add Click on all BTN to simulate all groups at once
				 */}
				<button
					style={{width: 350, height: 65, fontSize: 32, cursor: "pointer"}}
					onClick={() => {
						const htmlButtonElements = [
							...document.querySelectorAll(".btn__simulate-2"),
						] as HTMLButtonElement[]
						htmlButtonElements.forEach(btn => {
							setTimeout(() => {
								btn.click()
							}, 850)
						})
					}}>
					Simulate all Match
				</button>
				<h2 className={"round__title"}>Quart de Finale</h2>
{/*				{matchs.map(teams => (
					<MatchDePhaseFinal
						key={`${(Math.random() * 1000000).toString()} ${Rounds.Quart}`}
						id={Tools.generateId(matchs.indexOf(teams).toString())}
						teams={teams}
						onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
						label={Rounds.Quart}
					/>
				))}*/}
				<NextRoundButton
					nextBtnActive={nextBtnIsEnable}
					onClick={() => handleNextRound()}>
					Next Round
				</NextRoundButton>
			</section>
		)
}
