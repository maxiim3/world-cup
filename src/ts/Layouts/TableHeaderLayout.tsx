import React from "react"

export function TableHeaderLayout({label}: {label?: string}) {
	return (
		<thead className={"th"}>
		<tr>
			<th className={"th__name"}>TEAM</th>
			<th className={"th__flag"}>FLAG</th>
			<th className={"th__label"}>{label}</th>
			<th className={"th__xp"}>XP</th>
		</tr>
		</thead>
	)
}