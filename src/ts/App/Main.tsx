import React, {useMemo, useState} from "react"
import ContainerLayout from "../Layouts/ContainerLayout"
import {fetchTeams} from "../Utils/FetchTeams"
import {StatusEnum} from "../Enums/StatusEnum"
import {Finals} from "./FinalsContainer"
import {GroupsContainer} from "./GroupsContainer"
import {APP_STATE} from "../Constant/APP_STATE"

export function Main() {
	const [appState, setAppState] = useState(APP_STATE.loading)
	const teams = useMemo(() => {
		setAppState(APP_STATE.ok)
		return fetchTeams()
	}, [fetchTeams, setAppState, APP_STATE])

	const [GroupeStageStatus, setGroupeStageStatus] = useState(StatusEnum.online)

	const renderGroupComponent = () => {
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
	}
	const renderFinals = () => {
		if (GroupeStageStatus !== StatusEnum.archived) return
		else {
			return (
				<ContainerLayout title={"Phases Finales"}>
					<Finals />
				</ContainerLayout>
			)
		}
	}

	const renderOnConditions = () => {
		if (teams && appState === APP_STATE.ok) {
			return (
				<>
					{renderGroupComponent()}
					{renderFinals()}
				</>
			)
		}
		else if (appState === APP_STATE.error) {
			return <h1 className={"error"}>ERROR 404</h1>
		}
		return <h1 className={"loading"}>Loading.....</h1>
	}


	return renderOnConditions()
}
