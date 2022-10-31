import {TeamModel} from "../Classes/TeamModel"
import React from "react"

export const TeamLayout = ({team}: {team: TeamModel}) => {
	return (
		<tr className={team.isQualified ? "winner" : "looser"}>
			<td>{team.name}</td>
			<td>{team.flag}</td>
			<td>{team.score}</td>
			<td>{team.xp}</td>
		</tr>
	)
}