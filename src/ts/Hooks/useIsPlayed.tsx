import {useState} from "react"

/**
 *
 * @param {boolean} initialValue
 * @return IsPlayedProps
 */
export function useIsPlayed(initialValue: boolean): IsPlayedProps {
	const [isPlayed, setIsPlayed] = useState(initialValue)

	/**
	 * @type Function
	 * @description Switch isPlayed State False -> True || True -> False
	 * @return void
	 */
	const updateIsPlayed = () => setIsPlayed(!isPlayed)

	return {isPlayed, updateIsPlayed}
}

export type IsPlayedProps = {isPlayed: boolean, updateIsPlayed: Function}
