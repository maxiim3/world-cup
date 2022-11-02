import React, {useEffect, useState} from "react"
import {StatusEnum} from "../Misc/Enums/StatusEnum"

export type ButtonProps = {
	handlePlayMatch: Function,
	updateStatus: Function
}

/**
 * Button first to handle play match, the change state to go to next stage/round
 * @param {Function} handlePlayMatch
 * @param {Function} updateStatus
 * @return {JSX.Element}
 * @constructor
 */
export function Button({handlePlayMatch, updateStatus} :ButtonProps) {
	const [buttonInnerText, setButtonInnerText] = useState("Let's Play")
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

	const [buttonState, setButtonState] = useState(0)
	useEffect(() => {
		if (buttonState === 1) {
			// console.log("%cPlay MatchModel", "color: tomato")
			handlePlayMatch()
			setButtonInnerText("Go to next round")
		}
		if (buttonState >= 2) {
			// console.log("%cChange Stage", "color:green")
			setButtonIsDisabled(true)
			if (localStorage.groups) {
				return updateStatus(StatusEnum.archived)
			}
		}
	}, [buttonState, setButtonInnerText, setButtonIsDisabled])

	return (
		<button
			className={"changeRoundBtn"}
			data-disabled = {buttonIsDisabled}
			disabled={buttonIsDisabled}
			onClick={() => setButtonState(buttonState + 1)}>
			{buttonInnerText}
		</button>
	)
}
