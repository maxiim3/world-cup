export class LocalStorageModel {
	private readonly key: string

	constructor(key: string) {
		this.key = key
	}

	fetchData() {
		return localStorage.getItem(this.key) ? JSON.parse(localStorage[this.key]) : []
	}
}