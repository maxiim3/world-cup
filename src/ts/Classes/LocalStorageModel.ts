import {LocalStorageDataProps} from "../Misc/Types/LocalStorageDataProps"

export class LocalStorageModel {
	private readonly key: string

	constructor(key: string) {
		this.key = key
	}

	fetchData() {
		const data = localStorage.getItem(this.key) ? JSON.parse(localStorage[this.key]) : []

		data && data.forEach((data: LocalStorageDataProps) => data?.teams?.forEach(team => (team.score = 0)))
		return data
	}
}