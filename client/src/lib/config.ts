import axios from 'axios'

export let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const apiBase = axios.create({
	baseURL: `${serverUrl}/api/v1`,
	withCredentials: true
})
