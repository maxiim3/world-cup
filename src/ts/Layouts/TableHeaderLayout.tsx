import React from "react"

export function TableHeaderLayout({label}: {label?: string}) {
	return (
		<thead className={"th"}>
		<tr>
			<th className={"th__name"}>TEAM</th>
			<th className={"th__flag"}>FLAG</th>
			<th className={"th__label"}>{label}</th>
			<th className={"th__xp"}>XP</th>
			<th className={"th__attack"}>attack</th>
			<th className={"th__defense"}>defense</th>
			<th className={"th__stamina"}>stamina</th>
			<th className={"th__mood"}>mood</th>
		</tr>
		</thead>
	)
}