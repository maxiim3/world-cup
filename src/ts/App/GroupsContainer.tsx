import {TeamModel} from "../Classes/TeamModel"
import React, {useEffect, useState} from "react"
import {Tools} from "../Misc/Utils/Tools"
import {Button} from "../Components/Button"
import ContainerLayout from "../Layouts/ContainerLayout"
import {Group} from "../Components/Group"

export function GroupsContainer({teams, updateStatus}: {teams: TeamModel[]; updateStatus: Function}) {
	const mapGroups = [
		{label: "group_A", teams: teams.filter(team => team.group === "A")},
		{label: "group_B", teams: teams.filter(team => team.group === "B")},
		{label: "group_C", teams: teams.filter(team => team.group === "C")},
		{label: "group_D", teams: teams.filter(team => team.group === "D")},
		{label: "group_E", teams: teams.filter(team => team.group === "E")},
		{label: "group_F", teams: teams.filter(team => team.group === "F")},
		{label: "group_G", teams: teams.filter(team => team.group === "G")},
		{label: "group_H", teams: teams.filter(team => team.group === "H")},
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
		const updatedGroups = groups.map(group => {
			for (let i = 0; i < group.teams.length; i++) {
				const host = group.teams[i]
				for (let j = i + 1; j < group.teams.length; j++) {
					if (i !== j) {
						const guest = group.teams[j]
						const hostScore = Tools.GenerateRandomGoals(host)
						const guestScore = Tools.GenerateRandomGoals(guest)
						if (hostScore === guestScore) {
							host.score += 1
							guest.score += 1
						}
						else if (hostScore > guestScore) {
							host.score += 3
							host.xp += 3
							guest.xp -= 2
						}
						else if (hostScore < guestScore) {
							guest.score += 3
							guest.xp += 3
							host.xp -= 2
						}
					}
				}
			}
			return group
		})
		return updatedGroups
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
			<Button
				updateStatus={updateStatus}
				handlePlayMatch={() => setGroups(handlePlayMatch())}
			/>
			<ContainerLayout title={"Phases De Groupe"}>
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