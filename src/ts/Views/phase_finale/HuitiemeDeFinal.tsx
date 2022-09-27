import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "../static/Loader"
import {Tools} from "../../Tools/Tools"
import {MatchDePhaseFinal} from "./MatchDePhaseFinal"
import NextRoundButton from "../static/NextRoundButton"
import {Rounds} from "../../App"

export function HuitiemeDeFinal(props: {
	teams16: TeamModel[]
	round: Rounds
	setRound: (state: Rounds) => void
	setTeams8: (state: TeamModel[]) => void
}) {
	const [loading, setLoading] = useState<Boolean>(true)

	const [nextBtnIsEnable, setNextBtnIsEnable] = useState<boolean>(false)
	/**
	 * Est Incrémenté à chaque fois qu'un groupe est joué
	 */
	const [countMatchPlayed, setCountMatchPlayed] = useState(0)

	useEffect(() => {
		if (countMatchPlayed === 8) setNextBtnIsEnable(true)
		return () => {}
	}, [countMatchPlayed, setNextBtnIsEnable])

	const [matchs, setMatchs] = useState<Array<[TeamModel, TeamModel]>>([])
	useEffect(() => {
		const waiting = setTimeout(() => {
			setMatchs([
				[props.teams16[0], props.teams16[1]],
				[props.teams16[2], props.teams16[3]],
				[props.teams16[4], props.teams16[5]],
				[props.teams16[6], props.teams16[7]],
				[props.teams16[8], props.teams16[9]],
				[props.teams16[10], props.teams16[11]],
				[props.teams16[12], props.teams16[13]],
				[props.teams16[14], props.teams16[15]],
			])
			setLoading(false)
		}, 850)

		return () => clearTimeout(waiting)
	}, [setLoading])

	function handleNextRound() {
		setNextBtnIsEnable(false)
		const qualifiedTeams: TeamModel[] = props.teams16.filter(team => team.isQualified)
		props.setTeams8(qualifiedTeams)
		props.setRound(Rounds.Quart)
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
							...document.querySelectorAll(".btn__simulate-1"),
						] as HTMLButtonElement[]
						htmlButtonElements.forEach(btn => {
							setTimeout(() => {
								btn.click()
							}, 250)
						})
					}}>
					Simulate all Match
				</button>
				<h2 className={"round__title"}>Huitieme de Finale</h2>
				{matchs.map(teams => (
					<MatchDePhaseFinal
						key={`${(Math.random() * 1000000).toString()}  ${Rounds.Huitieme}`}
						id={Tools.generateId(matchs.indexOf(teams).toString())}
						teams={teams}
						onClick={() => setCountMatchPlayed(countMatchPlayed + 1)}
						label={Rounds.Huitieme}
					/>
				))}
				<NextRoundButton
					nextBtnActive={nextBtnIsEnable}
					onClick={() => handleNextRound()}>
					Next Round
				</NextRoundButton>
			</section>
		)
}
