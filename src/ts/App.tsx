import React, {useEffect, useState} from "react"
import {TeamModel} from "./Models/TeamModel"
import Groups from "./Groups"
import Loader from "./Components/Loader"

export enum Rounds {
	Group,
	Huitieme,
	Seizieme,
	Quart,
	Demi,
	Finale,
}

function App() {
	const [loading, setLoading] = useState<Boolean>(true)
	const [error, setError] = useState<null | Error>(null)
	const [teams, setTeams] = useState<TeamModel[] | null>(null)
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
				setTeams(mappedData)
			})
			.catch(err => {
				setError(err)
				console.error("Error :" + err)
			})
			.finally(() => setLoading(false))
	}, [])

	const [round, setRound] = useState(Rounds.Group)
	useEffect(() => {
		setLoading(true)
		const wait = setTimeout(() => {
			setLoading(false)
		}, 1200)
		return () => {
			clearTimeout(wait)
		}
	}, [round])

	if (loading) return <Loader>Waiting...</Loader>
	else if (!teams || error) {
		setError(new Error("Couldn't load ressources"))
		return <h1>Oups...</h1>
	} else if (teams.length !== 0)
		return (
				<main>
					{round === Rounds.Group && (
						<Groups
							initialTeams={teams}
							onClick={() => setRound(Rounds.Huitieme)}
						/>
					)}
					{round === Rounds.Huitieme && <div> C'est les Huitièmes!</div>}
				</main>
		)
	else {
		return <Loader>You shouldn't be here...</Loader>
	}
}

export default App
