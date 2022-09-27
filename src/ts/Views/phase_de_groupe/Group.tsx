import React, {useState} from "react"
import {TeamModel} from "../../Models/TeamModel"
import {Tools} from "../../Tools/Tools"
import Loader from "../static/Loader"
import {Match} from "../../Models/MatchModel"
import {TeamRow} from "../static/TeamRow"

const Group = (props: {group: IGroupType; groupHasPlayed: () => void}) => {
	const [loading, setLoading] = useState(false)

	const tBodyId = Tools.generateId("id", "tbody", props.group.key)
	const buttonID = Tools.generateId("button", props.group.key)

	const [groupHasPlayed, setGroupHasPlayed] = useState(false)

	async function simulateGroups(event: React.MouseEvent<HTMLButtonElement>) {
		setLoading(true)
		setGroupHasPlayed(true)
		props.groupHasPlayed()

		event.currentTarget.disabled = true

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
								if (groupHasPlayed && b.points === a.points) return b.xp - a.xp
								return b.points - a.points
							})
							.map(team => {
								let isWinner: string = ""
								if (groupHasPlayed) {
									if (props.group.teams.indexOf(team) < 2) {
										isWinner = "true"
										team.isQualified = true
									} else isWinner = "false"
								}
								return (
									<TeamRow
										key={Tools.generateId(team.id)}
										team={team}
										isWinner={isWinner}
										initialPoints={team.points}
									/>
								)
							})
					)}
				</tbody>
			</table>
			<button
				id={buttonID}
				className={"btn__simulate-0"}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => simulateGroups(event)}>
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
