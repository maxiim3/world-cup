export const delay = async (ms: number) =>
	new Promise((resolve: Function) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
