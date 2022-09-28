import {Rounds} from "../../App"
import React from "react"

export function ButtonSimulateAll(props: {round: Rounds}) {
	return (
		/**
				 Add Click on all BTN to simulate all groups at once
		 */
		<button
			style={{width: 350, height: 65, fontSize: 32, cursor: "pointer"}}
			onClick={() => {
				const htmlButtonElements = [
					...document.querySelectorAll(`.btn__simulate-${CSS.escape(props.round.toString())}`),
				] as HTMLButtonElement[]
				htmlButtonElements.forEach(btn => {
					setTimeout(() => {
						btn.click()
					}, 850)
				})
			}}>
			Simulate All {(Rounds.Huitieme && "Groups") || "Matchs"}
		</button>
	)
}
