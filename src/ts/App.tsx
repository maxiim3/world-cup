import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"
import Loader from "./Views/static/Loader"
import PhaseDeGroupe from "./Views/phase_de_groupe/PhaseDeGroupe"
import NextRoundButton from "./Views/static/NextRoundButton"
import {Tools} from "./Tools/Tools"
import {DemiFinal, Final, HuitiemeDeFinale, QuartDeFinal} from "./Views/phase_finale/PhaseFinaleComponents"

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

	const [error, setError] = useState<Error | null>(null)

	const [loading, setLoading] = useState<boolean>(true)

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
	})

	const [round, setRound] = useState(Rounds.Group)

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

	const playRef = React.useRef()
	const reloadRef = React.useRef()
	const nextRef = React.useRef()
	const prevRef = React.useRef()

	if (loading) return <Loader />
	else if (!allTeams || error) {
		return <h1>Oups...</h1>
	} else if (allTeams.length !== 0) {
		let teams = allTeams

		return (
			<>
				<header>
					<nav>
						<button
							ref={playRef.current}
							aria-details={"Play Application"}>
							<span
								className={"fa-solid fa-play"}
								style={{width: 50, fontSize: 22}}
							/>
						</button>
						<button
							ref={reloadRef.current}
							aria-details={"Restart Application"}>
							<span
								className={"fa-solid fa-rotate-right"}
								style={{width: 50, fontSize: 22}}
							/>
						</button>
						<button
							ref={nextRef.current}
							aria-details={"Go to next round"}>
							<span
								className={"fa-solid fa-forward"}
								style={{width: 50, fontSize: 22}}
							/>
						</button>
						<button
							ref={prevRef.current}
							aria-details={"Go to previous round"}>
							<span
								className={"fa-solid fa-backward"}
								style={{width: 50, fontSize: 22}}
							/>
						</button>
					</nav>
				</header>
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
							<dialog open={true}>
								<h1>WINNER!!!!🎉</h1>
								<h2>
									{
										allTeams?.filter(
											team =>
												team.rounds.groups.isQualified &&
												team.rounds.huitieme.isQualified &&
												team.rounds.quart.isQualified &&
												team.rounds.semiFinal.isQualified &&
												team.rounds.final.isQualified
										)[0].name
									}
									{
										allTeams?.filter(
											team =>
												team.rounds.groups.isQualified &&
												team.rounds.huitieme.isQualified &&
												team.rounds.quart.isQualified &&
												team.rounds.semiFinal.isQualified &&
												team.rounds.final.isQualified
										)[0].flag
									}
								</h2>
								<p>
									{
										allTeams?.filter(
											team =>
												team.rounds.groups.isQualified &&
												team.rounds.huitieme.isQualified &&
												team.rounds.quart.isQualified &&
												team.rounds.semiFinal.isQualified &&
												team.rounds.final.isQualified
										)[0].name
									}{" "}
									wins the World Cup 2022 in Qatar!
								</p>
							</dialog>
						</section>
					)}
				</main>
			</>
		)
	} else {
		return <Loader />
	}
}

export default App
