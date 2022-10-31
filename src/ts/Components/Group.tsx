import React from "react"
import {TeamModel} from "../Classes/TeamModel"
import {Tools} from "../Misc/Utils/Tools"
import {TeamLayout} from "../Layouts/TeamLayout"
import {CardLayout} from "../Layouts/CardLayout"
import {TableLayout} from "../Layouts/TableLayout"

export function Group({teams}: {teams: TeamModel[]}) {
	return (
		<CardLayout
			label={"group"}
			title={"Group"}>
			<TableLayout label={"POINTS"}>
				{teams
					.sort((a, b) => b.score - a.score)
					.map(team => (
						<TeamLayout
							key={Tools.generateId(team.id)}
							team={team}
						/>
					))}
			</TableLayout>
		</CardLayout>
	)
}

