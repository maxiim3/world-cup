import {useEffect, useState} from "react"
import {TeamModel} from "../Classes/TeamModel"
import {StageModel} from "../Misc/Interfaces/StageModel"

export function useFetchFromLocalStorage(updateMatches: Function, ClassModel: {new() : StageModel}){
	// Data fetched from LocalStorage
	const [fetchData] = useState<TeamModel[][]>([])
	useEffect(() => {
		const quarterFinalStage = new ClassModel()
		updateMatches(quarterFinalStage.init())
	}, [updateMatches])

	return { }
}