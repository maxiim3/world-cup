import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import NextRoundButton from "../static/NextRoundButton"
import Loader from "../static/Loader"

export function HuitiemeDeFinal(props: {teams16: TeamModel[]; onChangeRound: () => void}) {
	const [loading, setLoading] = useState<Boolean>(false)
	const [nextBtnActive, setNextBtnActive] = useState(false)
/*	useEffect(() => {
		if (countGroupsPlayed === 8) {
			setNextBtnActive(true)
		}
		return () => {
		}
	}, [countGroupsPlayed])*/
	console.log(props.teams16)

	if (loading) return <Loader />
	else
		return (
			<section className="round__container">
				<h2 className={"round__title"}>Huitieme de Finale</h2>

				<NextRoundButton nextBtnActive={nextBtnActive} onClick={props.onChangeRound}>Next Round</NextRoundButton>
			</section>
		)
}
