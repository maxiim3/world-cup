import {TeamModel} from "../Classes/TeamModel"
import {Tools} from "../Misc/Utils/Tools"
import React from "react"
import {TeamLayout} from "./TeamLayout"
import {TableLayout} from "./TableLayout"

export function MatchTableTemplate({teams, isPlayed = false}: {teams: TeamModel[], isPlayed?: boolean}) {
	const firstTeamID = `${Tools.generateId(teams[0].id)}`
	const secondTeamID = `${Tools.generateId(teams[1].id)}`

	return (
		<TableLayout key={Tools.generateId(firstTeamID + secondTeamID)} isPlayed={isPlayed}>
			<TeamLayout
				key={firstTeamID}
				team={teams[0]}
			/>
			<TeamLayout
				key={secondTeamID}
				team={teams[1]}
			/>
		</TableLayout>
	)
}