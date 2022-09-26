import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "../static/Loader"
import Group, {IGroupType} from "./Group"
import NextRoundButton from "../static/NextRoundButton"

type GroupsType = IGroupType[]

const Groups = (props: {onChangeRound: () => void; initialTeams: TeamModel[]}) => {
	// loader
	const [loading, setLoading] = useState<Boolean>(true)
	// groups
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

	if (loading) return <Loader />

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
				<NextRoundButton onClick={props.onChangeRound}>Next Round</NextRoundButton>
			</section>
		)
	else return <h2>Houston we have a problem...</h2>
}
export default Groups
