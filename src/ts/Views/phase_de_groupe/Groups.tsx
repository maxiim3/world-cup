import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "../static/Loader"
import Group, {IGroupType} from "./Group"
import NextRoundButton from "../static/NextRoundButton"

type GroupsType = IGroupType[]

const Groups = (props: {onChangeRound: () => void; teams32: TeamModel[]}) => {
	// loader
	const [loading, setLoading] = useState<Boolean>(true)
	// groups
	const [groups, setGroups] = useState<GroupsType>([])
	useEffect(() => {
		function getTeam(team1: string, team2: string, team3: string, team4: string): TeamModel[] {
			return props.teams32.filter(
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

	/**
	 * Est Incrémenté à chaque fois qu'un groupe est joué
	 */
	const [countGroupsPlayed, setCountGroupsPlayed] = useState(0)
	useEffect(() => {
		return () => {}
	}, [countGroupsPlayed])

	/**
	 * @description countGroupsPlayed est incrémenté a chaque fois que les matchs d'un groupe sont générés
	 * si le total de countGroupsPlayed est = a 8 => tous les groupes sont joués, alors "NextRoundButton" devient actif
	 */
	const [nextBtnActive, setNextBtnActive] = useState(false)
	useEffect(() => {
		if (countGroupsPlayed === 8) {
			setNextBtnActive(true)
		}
		return () => {
		}
	}, [countGroupsPlayed])


	function countGroups() {
		setCountGroupsPlayed(countGroupsPlayed + 1)
	}

	if (loading) return <Loader />

	if (groups.length !== 0)
		return (
			<section className="round__container">
				<h2 className={"round__title"}>Groups</h2>
				{groups?.map(group => (
					<Group
						key={group.key}
						group={group}
						groupHasPlayed={countGroups}
					/>
				))}

				<NextRoundButton
					nextBtnActive={nextBtnActive}
					onClick={props.onChangeRound}>
					Aller aux huitièmes de finale
				</NextRoundButton>
			</section>
		)
	else return <h2>Houston we have a problem...</h2>
}
export default Groups
