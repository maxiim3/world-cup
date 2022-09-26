import React from "react"

type LoaderProps = {}
const Loader: React.FunctionComponent<LoaderProps> = () => {
	return (
		<div id="loader-container">
			<span id="loader"></span>
		</div>
	)
}

export default Loader
