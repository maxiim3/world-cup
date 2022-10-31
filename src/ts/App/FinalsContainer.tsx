import React, {useState} from "react"
import {StatusEnum} from "../Misc/Enums/StatusEnum"
import ContainerLayout from "../Layouts/ContainerLayout"
import {EightFinalComponent} from "../Components/EightFinalComponent"
import {QuarterFinalComponent} from "../Components/QuarterFinalComponent"

export function Finals() {
	// Eight final
	const [EighthStageStatus, setEighthStageStatus] = useState(StatusEnum.online)

	// Quarter Final
	const [QuarterStageStatus, setQuarterStageStatus] = useState(StatusEnum.offline)

	// Semi Final
	const [SemiStageStatus, setSemiStageStatus] = useState(StatusEnum.offline)

	// Final
	const [FinalStageStatus, setFinalStageStatus] = useState(StatusEnum.offline)

	// Winner
	const [WinnerStatus, setWinnerStatus] = useState(StatusEnum.offline)

	if (EighthStageStatus === StatusEnum.loading) return <h3>LOADING</h3>
	if (EighthStageStatus === StatusEnum.offline) return <h3>Error</h3>
	else
		return (
			<>
				<ContainerLayout title={"Eliminations"}>
					<EightFinalComponent updateStatus={setEighthStageStatus} />

					{EighthStageStatus === StatusEnum.archived && (
						<QuarterFinalComponent updateStatus={setQuarterStageStatus} />
					)}

					{/*{(function() {*/}
					{/*	if (QuarterStageStatus !== StatusEnum.archived) return*/}
					{/*	else {*/}
					{/*		return (*/}
					{/*			<SemiFinalComponent*/}
					{/*				updateStatus={(status: StatusEnum) => setQuarterStageStatus(status)}*/}
					{/*			/>*/}
					{/*		)*/}
					{/*	}*/}
					{/*})()}*/}

					{/*{(function() {*/}
					{/*	if (SemiStageStatus !== StatusEnum.archived) return*/}
					{/*	else {*/}
					{/*		return <FinalComponent*/}
					{/*			updateStatus={(status: StatusEnum) => setQuarterStageStatus(status)} />*/}
					{/*	}*/}
					{/*})()}*/}

					{/*{(function() {*/}
					{/*	if (FinalStageStatus !== StatusEnum.archived) return*/}
					{/*	else {*/}
					{/*		return <WinnerComponent />*/}
					{/*	}*/}
					{/*})()}*/}
				</ContainerLayout>
			</>
		)
}
