import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import {Tools} from "../../Tools/Tools"

export const TeamRow = (props: {team: TeamModel, isWinner: string}) => {
	const [points, setPoints] = useState(props.team.points)
	useEffect(() => {
		return () => {}
	}, [points])

	return (
		<tr
			key={Tools.generateId(props.team.id)}
			data-is-winner={props.isWinner}
			data-row-id={props.team.id}
			data-team-points={points}>
			<td>{props.team.name}</td>
			<td className={"group__flags"}>{props.team.flag}</td>
			<td className={"points"}>{points}</td>
		</tr>
	)
}
