import React, {useEffect, useRef} from "react"
import {useCardinals} from "../Hooks/useCardinals"
import {useAnimateCard} from "../Hooks/useAnimateCard"
import {TeamModel} from "../Models/TeamModel"
import {Tools} from "../Utils/Tools"
import Teams from "../../Mock/Teams"

export function GroupTable(props: {id: string; teams: TeamModel[]}) {
	const {id, teams} = props

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
			className={"groupTable"}>
			<thead className={"groupTable__header"}>
				<tr>
					<th
						className={"title"}
						colSpan={3}>
						Group.Label
					</th>
				</tr>
				<tr>
					<th className={"col__label"}>Label</th>
					<th className={"col__flag"}>flag</th>
					<th className={"col__score"}>points</th>
				</tr>
			</thead>
			<tbody className={"groupTable__body"}>
				{(() => {
					return teams
						.sort((teamA, teamB) => teamB.score - teamA.score)
						.map(team => {
							return (
								<tr key={Tools.generateId(team.id)}>
									<td className={"col__label"}>{team.name}</td>
									<td className={"col__flag"}>{team.flag}</td>
									<td className={"col__score"}>{team.score}</td>
								</tr>
							)
						})
				})()}
			</tbody>
		</table>
	)
}
