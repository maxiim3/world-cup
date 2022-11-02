import React, {useEffect, useState} from "react"
import ContainerLayout from "../Layouts/ContainerLayout"
import {fetchTeams} from "../Misc/Utils/FetchTeams"
import {TeamModel} from "../Classes/TeamModel"
import {StatusEnum} from "../Misc/Enums/StatusEnum"
import {Finals} from "./FinalsContainer"
import {GroupsContainer} from "./GroupsContainer"
import {APP_STATE} from "../Misc/Constant/APP_STATE"

export function App() {
	const [appState, setAppState] = useState(APP_STATE.loading)

	const [Teams, setTeams] = useState<TeamModel[]>()
	useEffect(() => {
		return () => {
			const teams = fetchTeams()
			setTeams(teams)
			setAppState(APP_STATE.ok)
		}
	}, [])

	const [GroupeStageStatus, setGroupeStageStatus] = useState(StatusEnum.online)

	if (appState === APP_STATE.error) return <h1 className={"error"}>ERROR 404</h1>

	if (Teams && appState === APP_STATE.ok) {
		// console.table(Teams) // debug
		return (
			<>
				<h1 className={"competition__title"}>World Cup 2022</h1>

				{(function () {
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
									teams={Teams}
									updateStatus={(status: StatusEnum) => setGroupeStageStatus(status)}
								/>
							)
					}
				})()}

				{(function () {
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
	// console.log("loading") // debug
	return <h1 className={"loading"}>ERROR 404</h1>
}
