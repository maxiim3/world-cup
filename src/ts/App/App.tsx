import React, {useMemo, useState} from "react"
import ContainerLayout from "../Layouts/ContainerLayout"
import {fetchTeams} from "../Misc/Utils/FetchTeams"
import {StatusEnum} from "../Misc/Enums/StatusEnum"
import {Finals} from "./FinalsContainer"
import {GroupsContainer} from "./GroupsContainer"
import {APP_STATE} from "../Misc/Constant/APP_STATE"

export function App() {
	const [appState, setAppState] = useState(APP_STATE.loading)
	//
	// const [teams, setTeams] = useState<TeamModel[]>()
	// useEffect(() => {
	// 	return () => {
	// 		const teams = fetchTeams()
	// 		setTeams(teams)
	// 		setAppState(APP_STATE.ok)
	// 	}
	// }, [setTeams])

	const teams = useMemo(() => {
		setAppState(APP_STATE.ok)
		return fetchTeams()
	}, [fetchTeams, setAppState, APP_STATE])

	const [GroupeStageStatus, setGroupeStageStatus] = useState(StatusEnum.online)

	if (appState === APP_STATE.error) {
		// console.table(teams) // debug
		return <h1 className={"error"}>ERROR 404</h1>
	}
	if (teams && appState === APP_STATE.ok) {
		// console.table(teams) // debug
		return (
			<>


				{(function() {
					switch (GroupeStageStatus) {
						case StatusEnum.offline:
							return
						case StatusEnum.loading:
							return (
								<ContainerLayout title={"Phases De Groupe"}>
									<h2>LOADING</h2>
								</ContainerLayout>
							)
						default:
							return (
								<GroupsContainer
									teams={teams}
									updateStatus={(status: StatusEnum) => setGroupeStageStatus(status)}
								/>
							)
					}
				})()}

				{(function() {
					if (GroupeStageStatus !== StatusEnum.archived) return
					else {
						return (
							<ContainerLayout title={"Phases Finales"}>
								<Finals />
							</ContainerLayout>
						)
					}
				})()}
			</>
		)
	}
	// console.log("loading", teams, appState) // debug
	return <h1 className={"loading"}>Loading.....</h1>
}
