import ReactDOM, {Root} from "react-dom/client"
import React from "react"
import {Header} from "../Components/header"
import {App} from "../App/App"


export class RenderApp {
	private mainRoot: Root
	private headerRoot: Root

	constructor() {
		this.mainRoot = ReactDOM.createRoot(document.getElementById("main__root") as HTMLElement)
		this.headerRoot = ReactDOM.createRoot(document.getElementById("header__root") as HTMLElement)

	}

	renderHeader() {
		return this.headerRoot.render(
			<React.StrictMode>
				{<Header />}
			</React.StrictMode>,
		)
	}

	renderMain() {
		return this.mainRoot.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
		)
	}

	init() {
		this.renderHeader()
		this.renderMain()
	}
}