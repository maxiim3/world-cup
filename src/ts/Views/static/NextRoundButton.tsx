import React from "react"

const NextRoundButton = (props: {onClick: () => void; children: string}) => {
	return (
		<div className={"component__static-footer"}>
			<button
				className={"component__static-footer__btn"}
				onClick={props.onClick}>
				{props.children}
			</button>
		</div>
	)
}
export default NextRoundButton
