import {CardLayout} from "../Layouts/CardLayout"
import React, {useEffect, useState} from "react"
import {useIsPlayed} from "../Hooks/useIsPlayed"
import {TeamModel} from "../Classes/TeamModel"
import {useFetchFromLocalStorage} from "../Hooks/useFetchFromLocalStorage"
import usePlayMatch from "../Hooks/usePlayMatch"
import {Button} from "./Button"
import {MatchTableTemplate} from "../Layouts/MatchTableTemplate"
import {Tools} from "../Utils/Tools"
import {FinalModel} from "../Classes/FinalModel"

export function FinalComponent({updateStatus}: {updateStatus: Function}) {
	// Visual feedback for winners
	const {isPlayed, updateIsPlayed} = useIsPlayed(false)

	// Matches for the 4th final //  todo refactor to custom hook
	let [matches, setMatches] = useState<TeamModel[][]>([])
	useEffect(() => {
		localStorage.final = JSON.stringify(matches)
		return () => {
		}
	}, [matches])

	useFetchFromLocalStorage(setMatches, FinalModel)

	// Handle Match
	const {handlePlayMatch} = usePlayMatch(matches, updateIsPlayed)

	return (
		<article>
			<Button
				handlePlayMatch={() => setMatches(handlePlayMatch())}
				updateStatus={updateStatus}
			/>
			<CardLayout title={"Final"}
						label={"final"}>
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
