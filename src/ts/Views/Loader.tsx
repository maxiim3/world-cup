import React from "react"

type LoaderProps = {
	children: string
}
const Loader:React.FunctionComponent<LoaderProps> = ({children}) => {
	return (
		<span id="loader">{children}</span>
	)
}

export default Loader
