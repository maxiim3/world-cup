import {TeamModel} from "../Classes/TeamModel"
import React, {useEffect, useState} from "react"
import {Tools} from "../Misc/Utils/Tools"
import {Button} from "../Components/Button"
import ContainerLayout from "../Layouts/ContainerLayout"
import {Group} from "../Components/Group"
import {MatchModel} from "../Classes/MatchModel"

export function GroupsContainer({teams, updateStatus}: {teams: TeamModel[]; updateStatus: Function}) {
	const mapGroups = [
		{label: "group_A", teams: teams.filter(team => team.group === "A")},
		{
			label: "group_B",
			teams: teams.filter(team => team.group === "B"),
		},
		{label: "group_C", teams: teams.filter(team => team.group === "C")},
		{
			label: "group_D",
			teams: teams.filter(team => team.group === "D"),
		},
		{label: "group_E", teams: teams.filter(team => team.group === "E")},
		{
			label: "group_F",
			teams: teams.filter(team => team.group === "F"),
		},
		{label: "group_G", teams: teams.filter(team => team.group === "G")},
		{
			label: "group_H",
			teams: teams.filter(team => team.group === "H"),
		},
	]

	// GROUPS
	const [groups, setGroups] = useState(mapGroups)
	useEffect(() => {
		return () => {
			// console.table(groups) //debugger
			localStorage.groups = JSON.stringify(groups)
		}
	}, [groups, teams, updateStatus])

	function handlePlayMatch() {
		return groups.map(group => {
			const {teams, label} = group
			const firstMatch = new MatchModel([teams[0], teams[1]])
			const secondMatch = new MatchModel([teams[2], teams[3]])
			const thirdMatch = new MatchModel([teams[0], teams[2]])
			const fourthMatch = new MatchModel([teams[1], teams[3]])
			const fifthMatch = new MatchModel([teams[0], teams[3]])
			const sixthMatch = new MatchModel([teams[1], teams[2]])
			firstMatch.runGroupMatch()
			secondMatch.runGroupMatch()
			thirdMatch.runGroupMatch()
			fourthMatch.runGroupMatch()
			fifthMatch.runGroupMatch()
			sixthMatch.runGroupMatch()
			return {teams, label}
		})
	}

	//RENDER
	if (!teams)
		return (
			<>
				<h2>LOADING</h2>
			</>
		)

	return (
		<>
			<ContainerLayout title={"Phases De Groupe"}>
				<Button
					updateStatus={updateStatus}
					handlePlayMatch={() => setGroups(handlePlayMatch())}
				/>
				{groups.map(group => (
					<Group
						key={Tools.generateId(`${groups.indexOf(group)}`)}
						teams={groups[groups.indexOf(group)].teams}
					/>
				))}
			</ContainerLayout>
		</>
	)
}
