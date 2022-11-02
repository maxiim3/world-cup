import React from "react"
import {TeamModel} from "../Classes/TeamModel"
import {MatchModel} from "../Classes/MatchModel"

const usePlayMatch = (matches : TeamModel[][], updateIsPlayed:Function) => {
	function handlePlayMatch() {
		const output: TeamModel[][] = matches.map(match => {
			const matchClass = new MatchModel(match)
			return matchClass.runEliminationMatch()
		})
		updateIsPlayed()
		return output
	}

	return {handlePlayMatch}
}

export default usePlayMatch
