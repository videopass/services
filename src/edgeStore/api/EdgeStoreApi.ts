import axios from 'axios'
import { log } from '../../logging'
import { ethers } from 'ethers'

const baseUrlVideoApi = 'https://api.thetaedgestore.com/api/v2/data'

// https://docs.thetatoken.org/docs/theta-edgestore-gateway-alpha

export class EdgeStoreApi {
	headers: any

	constructor() {}

	// createReadStream(path)
	async signIn(key: string, createReadStream: any): Promise<any> {
		try {
			const provider = new ethers.providers.JsonRpcProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc') //?
			const wallet = new ethers.Wallet(key, provider) //?

			log.info(`address ${wallet.address}`)

			const timestamp = Date.now().toString()
			const msg = 'Theta EdgeStore Call ' + timestamp //?
			const sig = await wallet.signMessage(msg) //?

			const auth_token = timestamp + '.' + wallet.address + '.' + sig //?

			const result = await axios.post(
				baseUrlVideoApi,
				{
					file: createReadStream,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'x-theta-edgestore-auth': auth_token,
					},
				}
			)

			result.request //?
			return result.data.key //?
		} catch (error /*?*/) {
			error //?
			log.error(error, `createPreSignedURL`)
			throw error
		}
	}
}
