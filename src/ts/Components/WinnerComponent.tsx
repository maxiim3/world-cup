import {CardLayout} from "../Layouts/CardLayout"
import React, {useEffect, useId, useState} from "react"
import {TeamModel} from "../Classes/TeamModel"
import {useFetchFromLocalStorage} from "../Hooks/useFetchFromLocalStorage"
import {Tools} from "../Utils/Tools"
import {TableRowLayout} from "../Layouts/TableRowLayout"
import {WinnerModel} from "../Classes/WinnerModel"
import {TableLayout} from "../Layouts/TableLayout"

export function WinnerComponent() {
	// Matches for the 8th final //todo refactor to custom hook
	let [winner, setWinner] = useState<TeamModel>()
	useEffect(() => {
		localStorage.winner = JSON.stringify(winner)
	}, [winner])

	const id = useId()
	useFetchFromLocalStorage(setWinner, WinnerModel)

	if (winner) {
		return (
			<article>
				<button
					className={"changeRoundBtn"}
					onClick={() => window.location.reload()}>
					Reset APP
				</button>
				<CardLayout
					title={"Winner"}
					label={"winner"}>
					<TableLayout
						key={Tools.generateId(id)}
						isPlayed={false}>
						<TableRowLayout
							key={id}
							team={winner}
						/>
					</TableLayout>
				</CardLayout>
			</article>
		)
	}
	else return <h3>LOADING</h3>
}
