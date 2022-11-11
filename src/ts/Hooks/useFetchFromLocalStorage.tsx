import {useEffect, useState} from "react"
import {TeamModel} from "../Classes/TeamModel"
import {StageModel} from "../Interfaces/StageModel"

export function useFetchFromLocalStorage(updateMatches: Function, ClassModel: {new(): StageModel}) {
	// Data fetched from LocalStorage
	const [fetchData] = useState<TeamModel[][]>([])
	useEffect(() => {
		const genericClass = new ClassModel()
		updateMatches(genericClass.init())
	}, [updateMatches])

	return {}
}
