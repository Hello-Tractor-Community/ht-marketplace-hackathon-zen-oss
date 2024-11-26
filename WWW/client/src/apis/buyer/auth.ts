import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface ICreateBuyer {
	name: string
	email: string
	phone: string
	password: string
}
// Create a buyer
// @route POST /api/v1/buyer
export const createBuyer = async (userData: ICreateBuyer) => {
	try {
		const response = await apiBase.post('/buyer', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Google Single Sign On
// @route GET /api/v1/buyer/google
export const googleSSO = async () => {
	try {
		const response = await apiBase.get('/buyer/google')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IGoogleCode{
    code: string
}
// Callback for Google Single Sign On
// @route GET /api/v1/buyer/google/callback?code=
export const googleSSOCallback = async (code: IGoogleCode) => {
	try {
		const response = await apiBase.get(
			`/buyer/google/callback?code=${code}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface ILoginBuyer {
	email: string
	password: string
}
// Login buyer
// @route POST /api/v1/buyer/login
export const loginBuyer = async (userData: ILoginBuyer) => {
	try {
		const response = await apiBase.post('/buyer/login', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Logout buyer
// @route GET /api/v1/buyer/logout
export const logoutBuyer = async () => {
	try {
		const response = await apiBase.get('/buyer/logout')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateBuyerPassword {
	oldPassword: string
	newPassword: string
}
// Update buyer password
// @route PUT /api/v1/buyer/password
export const updateBuyerPassword = async (userData: IUpdateBuyerPassword) => {
	try {
		const response = await apiBase.put('/buyer/password', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateBuyerDetails {
	name: string
	email: string
	phone: string
}
// Update buyer details
// @route PUT /api/v1/buyer
export const updateBuyerDetails = async (userData: IUpdateBuyerDetails) => {
	try {
		const response = await apiBase.put('/buyer', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get buyer details
// @route GET /api/v1/buyer/?id=buyer_id
export const getBuyer = async (id: string) => {
	try {
		const response = await apiBase.get(`/buyer?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IGetAllBuyers {
	page: number
	limit: number
}
// Get all buyers
// @route GET /api/v1/buyer/all/?page=1&limit=10
export const getAllBuyers = async ({ page, limit }: IGetAllBuyers) => {
	try {
		const response = await apiBase.get(
			`/buyer/all?page=${page}&limit=${limit}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IDeleteBuyer {
	id: string
}
// Delete buyer
// @route DELETE /api/v1/buyer/?id=buyer_id
export const deleteBuyer = async ({ id }: IDeleteBuyer) => {
	try {
		const response = await apiBase.delete(`/buyer?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
