import { GetStatusResult, RpcData, RpcResult, PutFileResult, GetFileResult } from '@videopass/model'
import axios, { AxiosRequestConfig } from 'axios'
import { RpcMethod } from './RpcMethod'

const baseUrlVideoApi = `http://${process.env.EDGESTORE_SERVER}:${process.env.EDGESTORE_PORT}/rpc`

const headers = {
	'Content-Type': 'application/json',
}

export async function getStatus(): Promise<GetStatusResult> {
	let data: RpcData = { jsonrpc: '2.0', method: RpcMethod.GetStatus, params: [], id: 1 }

	const config: AxiosRequestConfig = {
		method: 'post',
		url: baseUrlVideoApi,
		headers,
		data,
	}
	try {
		const response = (await (await axios(config)).data) as RpcResult
		if (response.error) throw new Error(`during get status ${response.error.message}`)
		return response.result as GetStatusResult
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function putFile(path: string): Promise<PutFileResult> {
	let data: RpcData = { jsonrpc: '2.0', method: RpcMethod.PutFile, params: [{ path }], id: 1 }

	const config: AxiosRequestConfig = {
		method: 'post',
		url: baseUrlVideoApi,
		headers,
		data,
	}
	try {
		const response = (await (await axios(config)).data) as RpcResult
		if (response.error) throw new Error(`during put file ${path} ${response.error.message}`)
		return response.result as PutFileResult
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function getFile(key: string): Promise<GetFileResult> {
	let data: RpcData = { jsonrpc: '2.0', method: RpcMethod.GetFile, params: [{ key }], id: 1 }

	const config: AxiosRequestConfig = {
		method: 'post',
		url: baseUrlVideoApi,
		headers,
		data,
	}
	try {
		const response = (await (await axios(config)).data) as RpcResult
		if (response.error) throw new Error(`during get file with key ${key} ${response.error.message}`)
		return response.result as GetFileResult
	} catch (error) {
		console.error(error)
		throw error
	}
}
