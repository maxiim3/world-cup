import React, {useEffect, useState} from "react"
import {PhaseComponentProps} from "../Types/PhaseComponentProps"
import {Winner} from "./Phases/PhaseFinale/Winner"
import {PhaseDeGroupe} from "./Phases/PhaseDeGroupe/PhaseDeGroupe"
import {HuitiemeDeFinale} from "./Phases/PhaseFinale/HuitiemeDeFinale"
import {QuartDeFinale} from "./Phases/PhaseFinale/QuartDeFinale"
import {DemiFinale} from "./Phases/PhaseFinale/DemiFinale"
import {Finale} from "./Phases/PhaseFinale/Finale"

export default function RoundSwitcher(props: PhaseComponentProps) {
	const {onChangeRound, componentRound, currentRound} = props
	const [isCurrentRound, setIsCurrentRound] = useState(componentRound.index === currentRound.index)
	const [isDisplayed, setIsDisplayed] = useState(false)
	useEffect(() => {
		setIsDisplayed(componentRound.index <= currentRound.index)
		setIsCurrentRound(componentRound.index === currentRound.index)
	}, [setIsDisplayed, componentRound, currentRound, setIsCurrentRound])

	function handleChangeRound(e: React.MouseEvent) {
		e.preventDefault()
		if (isCurrentRound) return onChangeRound()
	}

	return (
		<section
			data-is-displayed={`${isDisplayed}`}
			className={`phase ${componentRound.key}`}
			id={`phase--${componentRound.index}`}>
			<header className="phase__header">
				<h2>{componentRound.label}</h2>
				<button
					className={"changeRoundBtn"}
					disabled={!isCurrentRound}
					onClick={handleChangeRound}>
					{componentRound.index === 5 ? "Reset" : "Next RoundSwitcher"}
				</button>
			</header>
			<article className="phase__content">
				{(() => {
					switch (componentRound.index) {
						case 0:
							return <PhaseDeGroupe />
						case 1:
							return <HuitiemeDeFinale />
						case 2:
							return <QuartDeFinale />
						case 3:
							return <DemiFinale />
						case 4:
							return <Finale />
						case 5:
							return <Winner />
					}
				})()}
			</article>
		</section>
	)
}
