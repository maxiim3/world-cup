import React, {useEffect, useState} from "react"
import {TeamModel} from "../Classes/TeamModel"
import {EightFinalModel} from "../Classes/EightFinalModel"
import {Button} from "./Button"
import {CardLayout} from "../Layouts/CardLayout"
import {MatchTableTemplate} from "../Layouts/MatchTableTemplate"
import {Tools} from "../Misc/Utils/Tools"
import {useIsPlayed} from "../Hooks/useIsPlayed"
import usePlayMatch from "../Hooks/usePlayMatch"
import {useFetchFromLocalStorage} from "../Hooks/useFetchFromLocalStorage"

export function EightFinalComponent({updateStatus}: {updateStatus: Function}) {
	// Visual feedback for winners
	const {isPlayed, updateIsPlayed} = useIsPlayed(false)

	// Matches for the 8th final
	let [matches, setMatches] = useState<TeamModel[][]>([])
	useEffect(() => {
		return () => {
			localStorage.eighthFinal = JSON.stringify(matches)
		}
	}, [matches])

	useFetchFromLocalStorage(setMatches, EightFinalModel)

	const {handlePlayMatch} = usePlayMatch(matches, updateIsPlayed)

	if (matches) {
		return (
			<article>
				<Button
					handlePlayMatch={() => setMatches(handlePlayMatch())}
					updateStatus={updateStatus}
				/>
				<CardLayout
					title={"Eighth Final"}
					label={"eighthFinal"}>
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
	} else return <h3>LOADING</h3>
}
