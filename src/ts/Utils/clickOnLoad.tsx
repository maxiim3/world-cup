import {Tools} from "./Tools"

export const clickOnLoad = async () => {
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