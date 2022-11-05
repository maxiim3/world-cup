import React from "react"
import {TeamModel} from "../Classes/TeamModel"
import {Tools} from "../Misc/Utils/Tools"
import {TableRowLayout} from "../Layouts/TableRowLayout"
import {CardLayout} from "../Layouts/CardLayout"
import {TableLayout} from "../Layouts/TableLayout"

export function Group({teams, groupLabel}: {teams: TeamModel[], groupLabel: string}) {
	return (
		<CardLayout
			label={"group"}
			title={"Group " + groupLabel}>
			<TableLayout label={"POINTS"}>
				{teams
					.sort((a, b) => b.score - a.score)
					.map(team => (
						<TableRowLayout
							key={Tools.generateId(team.id)}
							team={team}
						/>
					))}
			</TableLayout>
		</CardLayout>
	)
}

