import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import NextRoundButton from "../static/NextRoundButton"
import Loader from "../static/Loader"

export function HuitiemeDeFinal(props: {teams16: TeamModel[]}) {
	const [loading, setLoading] = useState<Boolean>(true)
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

		console.log(matchs)
		return () => clearTimeout(waiting)
	}, [setLoading])

	if (loading) return <Loader />
	else
		return (
			<section className="round__container">
				<h2 className={"round__title"}>Huitieme de Finale</h2>

			</section>
		)
}
