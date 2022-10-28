import React, {useEffect, useRef} from "react"
import {useCardinals} from "../Hooks/useCardinals"
import {useAnimateCard} from "../Hooks/useAnimateCard"
import {TeamModel} from "../Models/TeamModel"
import {Tools} from "../Utils/Tools"

export function MatchTable(props: {id: string; match: TeamModel[]}) {
	const {id, match} = props

	const tableRef = useRef<HTMLTableElement>(null)
	const [rotateStyles, resetRotateStyles] = useCardinals()
	const {isHovered, handleIsHovered} = useAnimateCard(false)
	useEffect(() => {
		let rotate = isHovered ? resetRotateStyles : rotateStyles
		if (tableRef.current) tableRef.current.style.transform = rotate
	}, [handleIsHovered, tableRef])

	return (
		<table
			onMouseEnter={() => handleIsHovered(true)}
			onMouseLeave={() => handleIsHovered(false)}
			ref={tableRef}
			className={"matchTable"}>
			<thead>
				<tr>
					<th
						className={"title"}
						colSpan={3}>
						MATCH
					</th>
				</tr>
				<tr>
					<th className={"col__label"}>Nom</th>
					<th className={"col__flag"}>Flag</th>
					<th className={"col__score"}>Score</th>
				</tr>
			</thead>
			<tbody>
				{(() =>
					match.map(team => (
						<tr key={Tools.generateId(team.id)}>
							<td className={"col__label"}>{team.name}</td>
							<td className={"col__flag"}>{team.flag}</td>
							<td className={"col__score"}>{team.score}</td>
						</tr>
					)))()}
			</tbody>
		</table>
	)
}
