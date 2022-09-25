import {TeamModel} from "../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "./Loader"
import Group, {IGroupType} from "./Group"

type GroupsType = IGroupType[]

const Groups = (props: {initialTeams: TeamModel[]; onClick: () => void}) => {
	const [loading, setLoading] = useState<Boolean>(true)
	const [groups, setGroups] = useState<GroupsType>([])
	useEffect(() => {
		function getTeam(team1: string, team2: string, team3: string, team4: string): TeamModel[] {
			return props.initialTeams.filter(
				(team: TeamModel) =>
					team.name.toLowerCase() === team1 ||
					team.name.toLowerCase() === team2 ||
					team.name.toLowerCase() === team3 ||
					team.name.toLowerCase() === team4
			)
		}

		const waiting = setTimeout(() => {
			setGroups([
				{key: "A", teams: getTeam("qatar", "ecuador", "senegal", "netherlands")},
				{key: "B", teams: getTeam("england", "iran", "usa", "wales")},
				{key: "C", teams: getTeam("argentina", "saudi-arabia", "mexico", "poland")},
				{key: "D", teams: getTeam("france", "australia", "denmark", "tunisia")},
				{key: "E", teams: getTeam("spain", "costa-rica", "germany", "japan")},
				{key: "F", teams: getTeam("belgium", "canada", "morocco", "croatia")},
				{key: "G", teams: getTeam("brazil", "serbia", "switzerland", "cameroun")},
				{key: "H", teams: getTeam("portugal", "ghana", "uruguay", "south-korea")},
			])
			setLoading(false)
		}, 1500)

		return () => clearTimeout(waiting)
	}, [setLoading])

	if (loading) return <Loader>Loading Groups</Loader>
	if (groups.length !== 0)
		return (
			<section className="round__container">
				<h2 className={"round__title"}>Groups</h2>
				{groups?.map(group => (
					<Group
						key={group.key}
						group={group}
					/>
				))}
				<button onClick={props.onClick}>Finish Round</button>
			</section>
		)
	else return <h2>Houston we have a problem...</h2>
}
export default Groups
