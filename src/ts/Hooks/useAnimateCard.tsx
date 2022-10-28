import {useState} from "react"

export function useAnimateCard(value: boolean) {
	const [isHovered, setIsHovered] = useState(value)
	const handleIsHovered = (value: boolean) => setIsHovered(value)

	return {isHovered, handleIsHovered}
}

