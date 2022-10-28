import React, {useEffect, useState} from "react"
import {APP_STATE} from "../Constant/APP_STATE"
import {Rounds} from "./Rounds"

export function App() {
	const [appState] = useState(APP_STATE.ok)
	useEffect(() => {
		localStorage.appStatusIndex = JSON.stringify({
			index: appState.index,
			status: appState.label,
		})
	}, [appState])

	if (appState === APP_STATE.loading)
		return (
			<>
				<h1>LOADING</h1>
				<section className={"loading"}></section>
			</>
		)
	if (appState === APP_STATE.error)
		return (
			<>
				<h1>404</h1>
				<section className={"error"}></section>
			</>
		)

	return (
		<>
			<h1>World Cup 2022</h1>
			<Rounds />
		</>
	)
}
