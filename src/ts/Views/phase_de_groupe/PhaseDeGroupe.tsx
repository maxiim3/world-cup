import {TeamModel} from "../../Models/TeamModel"
import React, {useEffect, useState} from "react"
import Loader from "../static/Loader"
import Group, {IGroupType} from "./Group"
import NextRoundButton from "../static/NextRoundButton"
import {Rounds} from "../../App"
import {ButtonSimulateAll} from "../static/ButtonSimulateAll"

type GroupsType = IGroupType[]

const PhaseDeGroupe = (props: {
	teams32: TeamModel[]
	round: Rounds
	setRound: (state: Rounds) => void
/*	setQualified: (state: TeamModel[]) => void*/
}) => {
	const [loading, setLoading] = useState(true)

/*
	/!**
	 * Est Incrémenté à chaque fois qu'un groupe est joué
	 *!/
	const [countGroupsPlayed, setCountGroupsPlayed] = useState(0)
	useEffect(() => {
		if (countGroupsPlayed === 8) setNextBtnIsEnable(true)
		return () => {}
	}, [countGroupsPlayed, setNextBtnIsEnable])
*/

	// groupes
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
		}, 300)
		return () => {
			clearTimeout(waiting)
			setLoading(false)
		}
	}, [setLoading, props.teams32])

/*	function handleNextRound() {
		// todo refactor to app.tsx ?
		setNextBtnIsEnable(false)
		const qualifiedTeams: TeamModel[] = props.teams32.filter(team => team.rounds.groups.isQualified)
		props.setQualified(qualifiedTeams)
		props.setRound(Rounds.Huitieme)
	}*/

	if (loading) return <Loader />
	else if (groups.length !== 0)
		return (
			<section className="round__container">
				<ButtonSimulateAll round={Rounds.Group} />
				<h2 className={"round__title"}>Groups</h2>
				{groups?.map(group => (
					<Group
						key={group.key}
						group={group}
						// groupHasPlayed={() => setCountGroupsPlayed(countGroupsPlayed + 1)}
					/>
				))}
{/*				<NextRoundButton
					nextBtnActive={nextBtnIsEnable}
					onClick={() => props.handleNextRound()}>
					Next Round
				</NextRoundButton>*/}
			</section>
		)
	else return <h2>Houston we have a problem...</h2>
}
export default PhaseDeGroupe
