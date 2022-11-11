import {TeamModel} from "../Classes/TeamModel"
import {Tools} from "../Utils/Tools"
import React from "react"
import {TableRowLayout} from "./TableRowLayout"
import {TableLayout} from "./TableLayout"

export function MatchTableTemplate({teams, isPlayed = false}: {teams: TeamModel[], isPlayed?: boolean}) {
	const firstTeamID = `${Tools.generateId(teams[0].id)}`
	const secondTeamID = `${Tools.generateId(teams[1].id)}`

	return (
		<TableLayout key={Tools.generateId(firstTeamID + secondTeamID)} isPlayed={isPlayed}>
			<TableRowLayout
				key={firstTeamID}
				team={teams[0]}
			/>
			<TableRowLayout
				key={secondTeamID}
				team={teams[1]}
			/>
		</TableLayout>
	)
}