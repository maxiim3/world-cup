import React, {useEffect, useState} from "react"
import {TeamModel} from "../../Models/TeamModel"
import {Tools} from "../../Tools/Tools"
import {Match} from "../../Models/MatchModel"
import {TeamRow} from "../static/TeamRow"

const Group = (props: {group: IGroupType}) => {
	const tBodyId = Tools.generateId("id", "tbody", props.group.key)
	const buttonID = Tools.generateId("button", props.group.key)

	const [groupHasPlayed, setGroupHasPlayed] = useState(false)
	const [qualifiedTeams, setQualifiedTeams] = useState<TeamModel[] | null>(null)
	useEffect(() => {
		qualifiedTeams?.forEach(team => (team.rounds.groups.isQualified = true))
	}, [qualifiedTeams])

	const [groupData, setGroupData] = useState<TeamModel[]>(props.group.teams)
	useEffect(() => {
		groupData.sort((a, b) => {
			if (!groupHasPlayed || b.rounds.groups.points === a.rounds.groups.points) return b.xp - a.xp
			else return b.rounds.groups.points - a.rounds.groups.points
		})
		if (groupHasPlayed) {
			setQualifiedTeams([groupData[0], groupData[1]])
		}
	}, [groupData, groupHasPlayed, setGroupData])

	function simulateGroups(event: React.MouseEvent<HTMLButtonElement>) {
		// setLoading(true)
		setGroupHasPlayed(true)
		event.currentTarget.disabled = true
		const matchs = [
			new Match(groupData[0], groupData[1]),
			new Match(groupData[0], groupData[2]),
			new Match(groupData[0], groupData[3]),
			new Match(groupData[1], groupData[2]),
			new Match(groupData[1], groupData[3]),
			new Match(groupData[2], groupData[3]),
		]

		matchs.forEach(match => {
			const isWinner = match.playMatch()
			console.log(match)
			if (isWinner) {
				isWinner.rounds.groups.points += 3
			}
		})
		props.group.teams = groupData
	}

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
					{groupData.map(team => {
						return (
							// todo fix add is Qualified
							<TeamRow
								key={Tools.generateId(team.id)}
								team={team}
								isWinner={team.rounds.groups.isQualified ? team.rounds.groups.isQualified.toString() : ""}
								points={team.rounds.groups.points}
							/>
						)
					})}
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

export type IGroupType = {
	key: string
	teams: TeamModel[]
}
