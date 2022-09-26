import React, {useState} from "react"

const useBoolean = (initialState = false) => {
	const [state, setState] = useState(initialState)

	const handleToggle = () => setState(!state)
	const handleTrue = () => setState(true)
	const handleFalse = () => setState(false)

	return {
		state,
		setState: {
			setTrue: handleTrue,
			setFalse: handleFalse,
			setToggle: handleToggle,
		},
	}
}
export default useBoolean
