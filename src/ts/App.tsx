import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"
import Loader from "./Views/static/Loader"
import PhaseDeGroupe from "./Views/phase_de_groupe/PhaseDeGroupe"
import {HuitiemeDeFinal} from "./Views/phase_finale/HuitiemeDeFinal"
import useBoolean from "./Hooks/useBoolean"
import NextRoundButton from "./Views/static/NextRoundButton"
import {QuartDeFinal} from "./Views/phase_finale/QuartDeFInal"

export enum Rounds {
	Group,
	Huitieme,
	Quart,
	Demi,
	Finale,
}

function App() {
	//region APP-STATE
	const [error, setError] = useState<Error | null>(null)
	const handleStatePropagation = (err: Error) => setError(err)

	const [loading, setLoading] = useState<boolean>(true)
	const handleLoadingPropagation = (state: boolean) => setLoading(state)
	//endregion

	//region ROUNDS
	const [round, setRound] = useState(Rounds.Group)
	useEffect(() => {
		setLoading(true)

		const wait = setTimeout(() => {
			setLoading(false)
		}, 550)
		return () => {
			clearTimeout(wait)
		}
	}, [round, setRound])
	const handleRoundPropagation = (state: Rounds) => setRound(state)
	//endregion

	//region HANDLE-TEAMS
	const [teams32, setTeams32] = useState<TeamModel[] | null>(null)
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
				setTeams32(mappedData)
			})
			.catch(err => {
				setError(err)
				console.error("Error :" + err)
			})
	}, [])

	const [teams16, setTeams16] = useState<TeamModel[] | null>(teams32)
	const handleQualifiedTeamsFor8thFinalPropagation = (teams: TeamModel[]) => setTeams16(teams)

	const [teams8, setTeams8] = useState<TeamModel[] | null>(teams16)
	const handleQualifiedTeamsFor4thFinalPropagation = (teams: TeamModel[]) => setTeams8(teams)

	const [teams4, setTeams4] = useState<TeamModel[] | null>(teams8)
	const handleQualifiedTeamsForSemiFinalPropagation = (teams: TeamModel[]) => setTeams4(teams)

	const [teamsFinal, setTeamsFinal] = useState<TeamModel[] | null>(teams4)
	const handleQualifiedTeamsForFinalPropagation = (teams: TeamModel[]) => setTeamsFinal(teams)

	const [winner, setWinner] = useState<TeamModel | null>()
	const handleWinnerPropagation = (team: TeamModel) => setWinner(team)
	//endregion

	if (loading) return <Loader />
	else if (!teams32 || error) {
		return <h1>Oups...</h1>
	} else if (teams32.length !== 0)
		return (
			<main>
				{round === Rounds.Group && teams32 && (
					<PhaseDeGroupe
						teams32={teams32}
						round={round}
						setRound={handleRoundPropagation}
						setTeams16={handleQualifiedTeamsFor8thFinalPropagation}
					/>
				)}
				{round === Rounds.Huitieme && teams16 && (
					<HuitiemeDeFinal
						teams16={teams16}
						round={round}
						setRound={handleRoundPropagation}
						setTeams8={handleQualifiedTeamsFor4thFinalPropagation}
					/>
				)}
				{round === Rounds.Quart && teams8 && (
					<QuartDeFinal
						teams8={teams8}
						round={round}
						setRound={handleRoundPropagation}
						setTeams4={handleQualifiedTeamsForSemiFinalPropagation}
					/>
				)}
				{round === Rounds.Demi && (
					<div>
						<h2>Demi!!!</h2>
					</div>
				)}
				{round === Rounds.Finale && (
					<div>
						<h2>Finale!!!</h2>
					</div>
				)}
			</main>
		)
	else {
		return <Loader />
	}
}

export default App
