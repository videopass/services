import { UploadBody, Upload, VideoBody, TranscodeUploadBody, Response, TranscodeUploadBodyExternal, Video, TranscodeBody } from '@videopass/model'
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { log } from '../logging'

const baseUrlVideoApi = 'https://api.thetavideoapi.com'
// https://docs.thetatoken.org/docs/theta-video-api-developer-api

/**
 * createPreSignedURL returns Upload
 * upload returns null
 * transcode return video
 */
export class VideoApi {
	headers: any

	constructor(id: string, secret: string) {
		if (id === '' || secret === '') throw new Error(` video api id or video api secret are empty`)

		this.headers = {
			'x-tva-sa-id': id,
			'x-tva-sa-secret': secret,
			'Content-Type': 'application/json',
		}
	}

	async createPreSignedURL(): Promise<UploadBody> {
		try {
			const url = `${baseUrlVideoApi}/upload`
			const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers }

			const data = await (await axios(config)).data
			return (data as Response).body as UploadBody
		} catch (error) {
			log.error(error, `createPreSignedURL`)
			throw error
		}
	}

	async uploadFileBrowserToServer(data: ArrayBuffer, upload: Upload, onUploadProgress: any) {
		try {
			const headers = {
				'Content-Type': 'application/octet-stream',
			}

			const config: AxiosRequestConfig = {
				method: 'put',
				url: upload.presigned_url,
				headers,
				data,
				onUploadProgress: onUploadProgress,
				maxContentLength: Infinity,
				maxBodyLength: Infinity,
			}
			const result = await axios(config)
			return result
		} catch (error) {
			log.error(error, `uploadFileBrowserToServer ${upload.id}`)
			throw error
		}
	}

	async uploadFileServerToServer(data: ArrayBuffer, upload: Upload) {
		try {
			const headers = {
				'Content-Type': 'application/octet-stream',
			}

			const config: AxiosRequestConfig = {
				method: 'put',
				url: upload.presigned_url,
				headers,
				data,
				maxContentLength: Infinity,
				maxBodyLength: Infinity,
			}
			const result = await axios(config)
			return result
		} catch (error) {
			log.error(error, `uploadFileServerToServer ${upload.id}`)
			throw error
		}
	}

	async transcodeVideo(transcodeUploadBody: TranscodeUploadBody): Promise<VideoBody> {
		try {
			const url = `${baseUrlVideoApi}/video`
			const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers, data: transcodeUploadBody }
			const data = await (await axios(config)).data
			return (data as Response).body as VideoBody
		} catch (error) {
			log.error(error, `transcodeVideo ${transcodeUploadBody.source_upload_id}`)
			throw error
		}
	}

	async transcodeExternalVideo(transcodeUploadBody: TranscodeUploadBodyExternal): Promise<VideoBody> {
		try {
			const url = `${baseUrlVideoApi}/video`
			const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers, data: transcodeUploadBody }
			const data = await (await axios(config)).data
			return (data as Response).body as VideoBody
		} catch (error) {
			log.error(error, `transcodeExternalVideo ${transcodeUploadBody.source_uri}`)
			throw error
		}
	}

	/**
	 *
	 * @param id is id video_### and not upload_###
	 * @returns
	 */
	async checkTranscodeProgress(id: string): Promise<TranscodeBody> {
		try {
			const url = `${baseUrlVideoApi}/video/${id}`
			const config: AxiosRequestConfig = { method: 'get', url, headers: this.headers }
			const data = await (await axios(config)).data
			return (data as Response).body as TranscodeBody
		} catch (error) {
			log.error(error, `checkTranscodeProgress ${id}`)
			throw error
		}
	}

	// https://api.thetavideoapi.com/video/srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx/list?page=1&number=100
	async listVideos(videoApiId: string, page: number = 1, limit: number = 100): Promise<VideoBody> {
		try {
			const url = `${baseUrlVideoApi}/video/${videoApiId}/list?page=${page}&number=${limit}`
			const config: AxiosRequestConfig = { method: 'get', url, headers: this.headers }
			const data = await (await axios(config)).data
			return (data as Response).body as VideoBody
		} catch (error) {
			log.error(error, `listVideos ${videoApiId}`)
			throw error
		}
	}
}
