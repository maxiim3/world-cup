import React from "react"

export function TableHeaderLayout({label}: {label?: string}) {
	return (
		<thead>
		<tr>
			<th>TEAM</th>
			<th>FLAG</th>
			<th>{label}</th>
			<th>XP</th>
		</tr>
		</thead>
	)
}