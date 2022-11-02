import React, {useState} from "react"
import {StatusEnum} from "../Misc/Enums/StatusEnum"
import ContainerLayout from "../Layouts/ContainerLayout"
import {EightFinalComponent} from "../Components/EightFinalComponent"
import {QuarterFinalComponent} from "../Components/QuarterFinalComponent"
import {SemiFinalComponent} from "../Components/SemiFinalComponent"
import {FinalComponent} from "../Components/FinalComponent"
import {WinnerComponent} from "../Components/WinnerComponent"

export function Finals() {
	// Eight final
	const [EighthStageStatus, setEighthStageStatus] = useState(StatusEnum.online)

	// Quarter Final
	const [QuarterStageStatus, setQuarterStageStatus] = useState(StatusEnum.offline)

	// Semi Final
	const [SemiStageStatus, setSemiStageStatus] = useState(StatusEnum.offline)

	// Final
	const [FinalStageStatus, setFinalStageStatus] = useState(StatusEnum.offline)

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
					{QuarterStageStatus === StatusEnum.archived && (
						<SemiFinalComponent updateStatus={setSemiStageStatus} />
					)}
					{SemiStageStatus === StatusEnum.archived && <FinalComponent updateStatus={setFinalStageStatus} />}
					{FinalStageStatus === StatusEnum.archived && <WinnerComponent />}
				</ContainerLayout>
			</>
		)
}
