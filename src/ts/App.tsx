import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"
import Loader from "./Views/static/Loader"
import Groups from "./Views/phase_de_groupe/Groups"
import {HuitiemeDeFinal} from "./Views/phase_finale/HuitiemeDeFinal"
import useDOMIsUpdated from "./Hooks/useBoolean"
import useBoolean from "./Hooks/useBoolean"

export enum Rounds {
	Group,
	Huitieme,
	Seizieme,
	Quart,
	Demi,
	Finale,
}

function App() {
	/*const [DOMChange, setDOMChange] = useState<boolean>(false)*/
	const {state: DOMChange, setState:setDOMChange} = useBoolean(false)
	const [round, setRound] = useState(Rounds.Group)

	function switchRound() {
			setDOMChange.setFalse()
		switch (round) {
			case Rounds.Group:
				setRound(Rounds.Huitieme)
				break
			case Rounds.Huitieme:
				setRound(Rounds.Quart)
				break
			case Rounds.Quart:
				setRound(Rounds.Demi)
				break
			case Rounds.Demi:
				setRound(Rounds.Finale)
				break
		}
	}

	useEffect(() => {
		setLoading(true)
		if (DOMChange) {
			switchRound()
		}

		const wait = setTimeout(() => {
			setLoading(false)

			console.log("round " + round)
		}, 1200)
		return () => {
			clearTimeout(wait)
		}
	}, [round, setRound, DOMChange])

	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<null | Error>(null)
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
			.finally(() => setLoading(false))
	}, [])

	const [teams16, setTeams16] = useState<TeamModel[] | null>(teams32)
	useEffect(() => {
		if (teams32 !== null && round === Rounds.Huitieme) setTeams16(teams32.filter(team => team.isQualified))

		return () => {
			console.log("TEAMS 16")
			console.log(teams16)
		}
	}, [round, setRound, teams32, setTeams16])

	if (loading) return <Loader />
	else if (!teams32 || error) {
		setError(new Error("Couldn't load ressources"))
		return <h1>Oups...</h1>
	} else if (teams32.length !== 0)
		return (
			<main>
				{/**
				 Add Click on all BTN to simulate all groups at once
				 */}
				<button
					style={{width: 350, height: 65, fontSize: 32, cursor: "pointer"}}
					onClick={() => {
						const htmlButtonElements = [
							...document.querySelectorAll(".btn__simulate-group"),
						] as HTMLButtonElement[]
						htmlButtonElements.forEach(btn => {
							setTimeout(() => {
								btn.click()
							}, 850)
						})
					}}>
					SimulateALlGroups
				</button>
				{round === Rounds.Group && teams32 && (
					<Groups
						teams32={teams32}
						onChangeRound={() => setDOMChange.setTrue()}
					/>
				)}
				{round === Rounds.Huitieme && teams16 && (
					<HuitiemeDeFinal
						teams16={teams16}
						onChangeRound={() => setDOMChange.setTrue()}
					/>
				)}
			</main>
		)
	else {
		return <Loader />
	}
}

export default App
