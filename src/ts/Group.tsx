import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"

const Group: React.FunctionComponent<GroupProps> = ({group}) => {
	const [teams, setTeams] = useState<IGroupType>()
	useEffect(() => {
		return () => {
			setTeams(group)
		}
	}, [])

	function createRow(team: TeamModel) {
		return (
			<tr>
				<td>{team.name}</td>
				<td>{team.flag}</td>
				<td>{team.points}</td>
			</tr>
		)
	}

	return (
		<article>
			<h3>{group.key.toUpperCase()}</h3>
			<table className={`group group__${group.key}`}>
				<thead>
					<th>
						<td>nom</td>
						<td>flag</td>
						<td>points</td>
					</th>
				</thead>
				<tbody>{group.teams.map(team => createRow(team))}</tbody>
			</table>
		</article>
	)
}

export default Group
export type GroupProps = {
	group: IGroupType
}

export interface IGroupType {
	key: string
	teams: TeamModel[]
}
