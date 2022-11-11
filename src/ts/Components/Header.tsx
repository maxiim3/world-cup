import React from "react"
import {BallIcon} from "./BallIcon"

export function Header() {
	return <>
		<BallIcon />
		<h1 className={"competition__title"}>World Cup 2022</h1>
		<button
			onClick={() =>
				window.scrollTo({
									behavior: "smooth",
									top: document?.getElementById("main__root")?.offsetTop,
								})
			}>
			Go to simulation
		</button>
	</>
}