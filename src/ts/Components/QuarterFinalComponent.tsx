import React, {useEffect, useState} from "react"
import {TeamModel} from "../Classes/TeamModel"
import {Button} from "./Button"
import {CardLayout} from "../Layouts/CardLayout"
import {MatchTableTemplate} from "../Layouts/MatchTableTemplate"
import {Tools} from "../Misc/Utils/Tools"
import {useIsPlayed} from "../Hooks/useIsPlayed"
import usePlayMatch from "../Hooks/usePlayMatch"
import {QuarterFinalModel} from "../Classes/QuarterFinalModel"
import {useFetchFromLocalStorage} from "../Hooks/useFetchFromLocalStorage"

export function QuarterFinalComponent({updateStatus}: {updateStatus: Function}) {
	// Visual feedback for winners
	const {isPlayed, updateIsPlayed} = useIsPlayed(false)

	// Matches for the 4th final //  todo refactor to custom hook
	let [matches, setMatches] = useState<TeamModel[][]>([])
	useEffect(() => {
		localStorage.quarterFinal = JSON.stringify(matches)
		return () => {}
	}, [matches])

	useFetchFromLocalStorage(setMatches, QuarterFinalModel)

	// Handle Match
	const {handlePlayMatch} = usePlayMatch(matches, updateIsPlayed)

	return (
		<article>
			<Button
				handlePlayMatch={() => setMatches(handlePlayMatch())}
				updateStatus={updateStatus}
			/>
			<CardLayout
				title={"Quarter Final"}
				label={"quarterFinal"}>
				{matches.map(match => (
					<MatchTableTemplate
						teams={match}
						key={Tools.generateIds(match)}
						isPlayed={isPlayed}
					/>
				))}
			</CardLayout>
		</article>
	)
}
