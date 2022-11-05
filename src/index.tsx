import React from "react"
import ReactDOM from "react-dom/client"
import "./sass/App.css"
import {App} from "./ts/App/App"
import {Tools} from "./ts/Misc/Utils/Tools"

const $link = document.createElement("link") as HTMLLinkElement
$link.rel = "stylesheet"
$link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
$link.integrity = "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
$link.crossOrigin = "anonymous"
$link.referrerPolicy = "no-referrer"
document.head.append($link)

const mainRoot = ReactDOM.createRoot(document.getElementById("main__root") as HTMLElement)
const headerRoot = ReactDOM.createRoot(document.getElementById("header__root") as HTMLElement)


;(() => localStorage.clear())()
;(function() {
	localStorage.setItem("groups", "")
	localStorage.setItem("eighthFinal", "")
	localStorage.setItem("quarterFinal", "")
	localStorage.setItem("semiFinal", "")
	localStorage.setItem("final", "")
	localStorage.setItem("winner", "")
})()

const clickOnLoad = async () => {
	const load = async (ms: number) => {
		await Tools.Pause(ms)
		const btn: HTMLButtonElement = document.querySelector(
			".changeRoundBtn:not([data-disabled =\"true\"])",
		) as HTMLButtonElement
		btn && btn.click()
	}

	for (let i = 0; i < 6; i++) {
		await load(350)
	}

	window.scrollTo({behavior: "smooth", top: 9000})
}
/*const firstTeam = new TeamModel(Teams[12], "A")
 const secondTeam = new TeamModel(Teams[20], "A")

 const match = new MatchModel([firstTeam, secondTeam])
 match.runEliminationMatch()*/

headerRoot.render(
	<React.StrictMode>
		<h1 className={"competition__title"}>World Cup 2022</h1>
	</React.StrictMode>,
)
mainRoot.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

// clickOnLoad().catch()
