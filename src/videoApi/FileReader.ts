// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
export function readFile(file: Blob): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onabort = () => console.log('file reading was aborted')
		reader.onerror = () => console.log('file reading has failed')
		reader.onload = () => {
			try {
				const binaryStr = reader.result as ArrayBuffer
				if (binaryStr === null) return
				resolve(binaryStr)
			} catch (error) {
				console.error(error)
				reject(error)
			}
		}
		reader.readAsArrayBuffer(file)
	})
}
