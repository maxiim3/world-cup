import {TeamModel} from "../Classes/TeamModel"
import React from "react"

export const TeamLayout = ({team}: {team: TeamModel}) => {
	return (
		<tr className={team.isQualified ? "winner" : "looser"}>
			<td className={"tbody__name"}>{team.name}</td>
			<td className={"tbody__flag"}>{team.flag}</td>
			<td className={"tbody__label"}>{team.score}</td>
			<td className={"tbody__xp"}>{team.xp}</td>
			<td className={"tbody__attack"}>{team.skills.attack}</td>
			<td className={"tbody__defense"}>{team.skills.defense}</td>
			<td className={"tbody__stamina"}>{team.skills.stamina}</td>
			<td className={"tbody__mood"}>{team.skills.mood}</td>
		</tr>
	)
}
