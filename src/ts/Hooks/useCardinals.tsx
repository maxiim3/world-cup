export function useCardinals() {
	const parity = Math.floor(Math.random() * 10) % 2 === 0 ? 1 : -1
	const x = Math.floor(Math.random() * 10) / (parity * 10)
	const y = Math.floor(Math.random() * 10) / (parity * 10)
	const z = Math.floor(Math.random() * 10) / (parity * 10)
	const deg = Math.floor(Math.random() * 15) + 5
	const rotateStyles = `rotate3D(${x}, ${y}, ${z}, ${deg}deg)`
	const resetRotateStyles = "rotate3d(1, 1, 1, 0)"

	return [rotateStyles, resetRotateStyles]
}