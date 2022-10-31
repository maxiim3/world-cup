import React from "react"
import ReactDOM from "react-dom/client"
import "./sass/App.css"
import {App} from "./ts/App/App"

const $link = document.createElement("link") as HTMLLinkElement
$link.rel = "stylesheet"
$link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
$link.integrity = "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
$link.crossOrigin = "anonymous"
$link.referrerPolicy = "no-referrer"
document.head.append($link)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
;(() => localStorage.clear())()
;(function () {
	localStorage.setItem("groups", "")
	localStorage.setItem("eighthFinal", "")
	localStorage.setItem("quarterFinal", "")
	localStorage.setItem("semiFinal", "")
	localStorage.setItem("final", "")
	localStorage.setItem("winner", "")
})()

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
