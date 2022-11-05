import {TeamModel} from "../Classes/TeamModel"
import React from "react"

/**
 * @description Team Row Layout
 * @param {TeamModel} team
 * @return {JSX.Element}
 * @constructor
 */
export const TableRowLayout = ({team}: {team: TeamModel}) => {
	return (
		<tr className={team.isQualified ? "winner" : "looser"}>
			<td className={"tbody__name"}>{team.name}</td>
			<td className={"tbody__flag"}>{team.flag}</td>
			<td className={"tbody__label"}>{team.score}</td>
			<td className={"tbody__xp"}>{team.xp}</td>

		</tr>
	)
}
