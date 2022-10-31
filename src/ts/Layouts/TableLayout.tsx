import {TableHeaderLayout} from "./TableHeaderLayout"
import React from "react"

export function TableLayout({
								label = "SCORE",
								children,
								isPlayed = false,
							}: {
	label?: string
	children: JSX.Element[] | JSX.Element
	isPlayed?: boolean
}) {
	return (
		<table className={isPlayed ? "isPlayed" : "null"}>
			<TableHeaderLayout label={label} />
			<tbody>{children}</tbody>
		</table>
	)
}