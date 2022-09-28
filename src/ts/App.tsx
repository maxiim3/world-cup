import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"
import Loader from "./Views/static/Loader"
import PhaseDeGroupe from "./Views/phase_de_groupe/PhaseDeGroupe"
import NextRoundButton from "./Views/static/NextRoundButton"
import {Tools} from "./Tools/Tools"
import {DemiFinal, Final, HuitiemeDeFinale, QuartDeFinal} from "./Views/phase_finale/PhaseFinaleComponents"
import {TeamRow} from "./Views/static/TeamRow"
import {Logger} from "sass"

export enum Rounds {
	Group,
	Huitieme,
	Quart,
	Demi,
	Finale,
	Done,
}

export type RoundProps = {
	GroupIsDone: boolean
	HuitiemeIsDone: boolean
	QuartIsDone: boolean
	DemiIsDone: boolean
	FinaleIsDone: boolean
	Winner: boolean
}

function App() {
	const [allTeams, setAllTeams] = useState<TeamModel[] | null>(null)
	useEffect(() => {
		fetch("api/teams.json")
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw response
			})
			.then(data => {
				// setTeams(data)
				const mappedData = [] as TeamModel[]
				for (const d of data) {
					mappedData.push(new TeamModel(d))
				}
				setAllTeams(mappedData)
				setLoading(false)
			})
			.catch(err => {
				setError(err)
				console.error("Error :" + err)
			})
	}, [])

	//region APP-STATE
	const [error, setError] = useState<Error | null>(null)
	// const handleStatePropagation = (err: Error) => setError(err)

	const [loading, setLoading] = useState<boolean>(true)
	// const handleLoadingPropagation = (state: boolean) => setLoading(state)
	//endregion
	const [roundState, setRoundState] = useState<RoundProps>({
		DemiIsDone: false,
		Winner: false,
		FinaleIsDone: false,
		GroupIsDone: false,
		HuitiemeIsDone: false,
		QuartIsDone: false,
	})
	useEffect(() => {
		console.log(roundState)
	}, )

	// const [nextBtnIsEnable, setNextBtnIsEnable] = useState<boolean>(true)
	//region ROUNDS
	const [round, setRound] = useState(Rounds.Group)
	/*	useEffect(() => {
	 let teams: TeamModel[] | null
	 switch (round) {
	 case Rounds.Huitieme:
	 teams = allTeams && allTeams?.filter(team => team.rounds.groups.isQualified)
	 console.log(teams)
	 setQualifiedForHuitieme(teams)
	 break
	 case Rounds.Quart:
	 teams =
	 allTeams &&
	 allTeams?.filter(team => team.rounds.groups.isQualified && team.rounds.huitieme.isQualified)
	 console.log(teams)
	 setQualifiedForQuart(teams)
	 break
	 case Rounds.Demi:
	 teams =
	 allTeams &&
	 allTeams?.filter(
	 team =>
	 team.rounds.groups.isQualified &&
	 team.rounds.huitieme.isQualified &&
	 team.rounds.quart.isQualified
	 )
	 console.log(teams)
	 setQualifiedForDemi(teams)
	 break
	 case Rounds.Finale:
	 teams =
	 allTeams &&
	 allTeams?.filter(
	 team =>
	 team.rounds.groups.isQualified &&
	 team.rounds.huitieme.isQualified &&
	 team.rounds.quart.isQualified &&
	 team.rounds.semiFinal.isQualified
	 )
	 console.log(teams)
	 setQualifiedForFinale(teams)
	 break
	 case Rounds.Done:
	 const team =
	 allTeams &&
	 allTeams?.filter(
	 team =>
	 team.rounds.groups.isQualified &&
	 team.rounds.huitieme.isQualified &&
	 team.rounds.quart.isQualified &&
	 team.rounds.semiFinal.isQualified &&
	 team.rounds.final.isQualified
	 )[0]
	 setWinner(team)
	 console.log("WINNER!!!!")
	 console.log(winner)
	 break
	 }
	 }, [round])*/

	const handleRoundPropagation = (state: Rounds) => setRound(state)

	function handleNextRound() {
		switch (round) {
			case Rounds.Group:
				setRoundState({
					DemiIsDone: false,
					Winner: false,
					FinaleIsDone: false,
					GroupIsDone: true,
					HuitiemeIsDone: false,
					QuartIsDone: false,
				})
				console.log("Switched to Huitieme")
				setRound(Rounds.Huitieme)
				break
			case Rounds.Huitieme:
				console.log("Switched to Quart")
				setRound(Rounds.Quart)
				setRoundState({
					DemiIsDone: false,
					Winner: false,
					FinaleIsDone: false,
					GroupIsDone: true,
					HuitiemeIsDone: true,
					QuartIsDone: false,
				})
				break
			case Rounds.Quart:
				console.log("Switched to Demi")
				setRound(Rounds.Demi)
				setRoundState({
					DemiIsDone: false,
					Winner: false,
					FinaleIsDone: false,
					GroupIsDone: true,
					HuitiemeIsDone: true,
					QuartIsDone: true,
				})
				break
			case Rounds.Demi:
				console.log("Switched to Finale")
				setRound(Rounds.Finale)
				setRoundState({
					DemiIsDone: true,
					Winner: false,
					FinaleIsDone: false,
					GroupIsDone: true,
					HuitiemeIsDone: true,
					QuartIsDone: true,
				})
				break
			case Rounds.Finale:
				console.log("Switched to Done")
				setRound(Rounds.Done)
				setRoundState({
					DemiIsDone: true,
					Winner: false,
					FinaleIsDone: true,
					GroupIsDone: true,
					HuitiemeIsDone: true,
					QuartIsDone: true,
				})
				break
			case Rounds.Done:
				setRoundState({
					DemiIsDone: true,
					Winner: true,
					FinaleIsDone: true,
					GroupIsDone: true,
					HuitiemeIsDone: true,
					QuartIsDone: true,
				})
				break
		}
	}

	//endregion

	//region HANDLE-TEAMS
	/*	const [qualifiedForHuitieme, setQualifiedForHuitieme] = useState<TeamModel[] | null>(null)
	 const [qualifiedForQuart, setQualifiedForQuart] = useState<TeamModel[] | null>(null)
	 const [qualifiedForDemi, setQualifiedForDemi] = useState<TeamModel[] | null>(null)
	 const [qualifiedForFinale, setQualifiedForFinale] = useState<TeamModel[] | null>(null)
	 const [winner, setWinner] = useState<TeamModel | null>(null)*/

	//endregion

	if (loading) return <Loader />
	else if (!allTeams || error) {
		return <h1>Oups...</h1>
	} else if (allTeams.length !== 0) {
		let teams = allTeams
		return (
			<main>
				{teams && (
					<PhaseDeGroupe
						teams32={teams}
						round={round}
						setRound={handleRoundPropagation}
					/>
				)}
				{allTeams && roundState.GroupIsDone && (
					<HuitiemeDeFinale
						key={Tools.generateId("quart")}
						qualifiedTeams={allTeams && allTeams?.filter(team => team.rounds.groups.isQualified)}
						round={Rounds.Huitieme}
						setRound={handleRoundPropagation}
					/>
				)}
				{/*todo Problem a quart de final, les teams se mettent a jour partout, et les component se reset./...*/}
				{allTeams && roundState.HuitiemeIsDone && (
					<QuartDeFinal
						key={Tools.generateId("demi")}
						qualifiedTeams={allTeams?.filter(
							team => team.rounds.groups.isQualified && team.rounds.huitieme.isQualified
						)}
						round={Rounds.Quart}
						setRound={handleRoundPropagation}
					/>
				)}

				{allTeams && roundState.QuartIsDone && (
					<DemiFinal
						key={Tools.generateId("semi")}
						qualifiedTeams={allTeams?.filter(
							team =>
								team.rounds.groups.isQualified &&
								team.rounds.huitieme.isQualified &&
								team.rounds.quart.isQualified
						)}
						round={Rounds.Demi}
						setRound={handleRoundPropagation}
					/>
				)}
				{allTeams && roundState.DemiIsDone && (
					<Final
						key={Tools.generateId("finale")}
						qualifiedTeams={allTeams?.filter(
							team =>
								team.rounds.groups.isQualified &&
								team.rounds.huitieme.isQualified &&
								team.rounds.quart.isQualified &&
								team.rounds.semiFinal.isQualified
						)}
						round={Rounds.Finale}
						setRound={handleRoundPropagation}
					/>
				)}
				{allTeams && roundState.FinaleIsDone && (
					<section>
						<h3>The Winner is!</h3>
						<TeamRow
							isWinner={"true"}
							team={
								allTeams?.filter(
									team =>
										team.rounds.groups.isQualified &&
										team.rounds.huitieme.isQualified &&
										team.rounds.quart.isQualified &&
										team.rounds.semiFinal.isQualified &&
										team.rounds.final.isQualified
								)[0]
							}
							points={999}
							key={"hdf&*()"}></TeamRow>
					</section>
				)}

				<NextRoundButton
					nextBtnActive={true}
					onClick={() => handleNextRound()}>
					Next Round
				</NextRoundButton>
			</main>
		)
	} else {
		return <Loader />
	}
}

export default App
