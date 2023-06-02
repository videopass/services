import { AxiosError } from 'axios'
import { LogMetadata } from './LogMetadata'

const level = process.env.LOG_LEVEL

export default class log {
	static trace(message: string | object, metadata?: LogMetadata) {
		if (level === 'debug') {
			console.trace(this.buildMessage(message, metadata))
		}
	}

	static debug(message: string | object, metadata?: LogMetadata) {
		if (level === 'debug' || level === 'trace') {
			console.debug(this.buildMessage(message, metadata))
		}
	}

	static info(message: string | object, metadata?: LogMetadata) {
		console.log(this.buildMessage(message, metadata))
	}

	static warn(message: string | object, metadata?: LogMetadata) {
		console.warn(this.buildMessage(message, metadata))
	}

	static buildMessage(message: string | object, metadata?: LogMetadata) {
		if (String(message) === message) {
			if (metadata) {
				message = `${message}, action: ${metadata.action}, ref: ${metadata.ref}`
			}
			return message
		}
		return JSON.stringify(message)
	}

	/**
	 *
	 * @param error
	 * @param metadata if object then use message for extra information
	 * @param message
	 */
	static error(error: unknown, metadata: string | LogMetadata, message?: string) {
		if (Object(metadata) === metadata) {
			metadata = `${message || ''} action: ${(metadata as LogMetadata).action}, ref: ${(metadata as LogMetadata).ref}`
		}
		const errorMessage = (error as Error).message || ''

		errorMessage.replace(/(\r\n|\n|\r)/gm, '')
		const errorObject = error as AxiosError
		if (errorObject.isAxiosError) {
			console.error(`ERROR | ${metadata} ${errorObject.message}`)
		} else {
			console.error(`ERROR | ${metadata} ${errorMessage}`)
		}
	}
}
