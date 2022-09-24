export class Tools {
	static generateId(...keys: string[]) {
		const ids: string[] = []
		const ranNum = Math.floor(Math.random() * 1000 + 100)
		keys.forEach(key => {
			const word = key.toLowerCase().split("").splice(0, 3)
			ids.push(word.join(""))
			ids.push(ranNum.toString())
		})
		return ids.join("_")
	}
}
