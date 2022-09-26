import React, {useState} from "react"
import {TeamModel} from "../../Models/TeamModel"
import {Tools} from "../../Tools/Tools"
import Loader from "../static/Loader"
import {Match} from "../../Models/MatchModel"
import {TeamRow} from "./TeamRow"

const Group = (props: {group: IGroupType}) => {
	const [loading, setLoading] = useState(false)

	const tBodyId = Tools.generateId("id", "tbody", props.group.key)
	const buttonID = Tools.generateId("button", props.group.key)

	const [groupHasPlayed, setGroupHasPlayed] = useState(false)

	async function simulateGroups() {
		setLoading(true)
		setGroupHasPlayed(true)

		const $btn = document.getElementById(CSS.escape(buttonID)) as HTMLButtonElement
		$btn.disabled = true

		const matchs = [
			new Match(props.group.teams[0], props.group.teams[1]),
			new Match(props.group.teams[0], props.group.teams[2]),
			new Match(props.group.teams[0], props.group.teams[3]),
			new Match(props.group.teams[1], props.group.teams[2]),
			new Match(props.group.teams[1], props.group.teams[3]),
			new Match(props.group.teams[2], props.group.teams[3]),
		]

		await matchs.forEach(match => {
			const isWinner = match.playMatch()
			if (isWinner) isWinner.points += 3
		})

		await setTimeout(async () => {
			setLoading(false)
		}, 750)
	}

	// todo SORT teams after match result | set winner / looser : add prop to TEAMMODEL ? isqulified => true||false so get value of isqualifeied teams for each round, then reset it to false. Or create a isqualified for each round (isQUalForHuitieme, isQUalForQuart etc...) and filter teams

	return (
		<article>
			<h3 className={"group__name"}>{props.group.key.toUpperCase()}</h3>
			<table className={`group__table group__table--${props.group.key}`}>
				<thead>
					<tr>
						<th>nom</th>
						<th>flag</th>
						<th>points</th>
					</tr>
				</thead>
				<tbody id={tBodyId}>
					{loading ? (
						<Loader />
					) : (
						props.group.teams
							.sort((a, b) => {
								if (groupHasPlayed && (b.points === a.points)) return b.xp - a.xp
								return b.points - a.points
							})
							.map(team => {
								let isWinner: string = ""
								if (groupHasPlayed) {
									isWinner = props.group.teams.indexOf(team) < 2 ? "true" : "false"
								}
								return (
									<TeamRow
										key={Tools.generateId(team.id)}
										team={team}
										isWinner={isWinner}
									/>
								)
							})
					)}
				</tbody>
			</table>
			<button
				id={buttonID}
				className={"btn__simulate-group"}
				onClick={() => simulateGroups()}>
				Simulate
			</button>
		</article>
	)
}

export default Group

export interface IGroupType {
	key: string
	teams: TeamModel[]
}
