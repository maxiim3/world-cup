export function resetLocalStorage() {
	localStorage.clear()

	return () => {
		localStorage.setItem("groups", "")
		localStorage.setItem("eighthFinal", "")
		localStorage.setItem("quarterFinal", "")
		localStorage.setItem("semiFinal", "")
		localStorage.setItem("final", "")
		localStorage.setItem("winner", "")
	}

}