import { apiBase } from '@/lib/config'
import { toast } from 'sonner'

// Search for a user by email or id
// @route GET /api/v1/user/search?type=name&term=user_email
export const searchUser = async (type: 'name' | 'id', value: string) => {
	try {
		const response = await apiBase.get(
			`/user/search?type=${type}&term=${value}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get a user
// @route GET /api/v1/user/?id=user_id
export const getUser = async (id: string) => {
	try {
		const response = await apiBase.get(`/user/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IFetchUsers {
	page: number
	limit: number
}
// Get all users
// @route GET /api/v1/user/all/?page=1&limit=1
export const getAllPaginatedUsers = async ({ page, limit }: IFetchUsers) => {
	try {
		const response = await apiBase.get(
			`/user/all/?page=${page}&limit=${limit}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateUser {
	name: string
	email: string
}
// Update a user
// @route PUT /api/v1/user/?id=user_id
export const updateUser = async (id: string, userData: IUpdateUser) => {
	try {
		const response = await apiBase.put(`/user/?id=${id}`, userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Refresh user access
// @route GET /api/v1/user/refresh
export const refreshUser = async ({ showToast = true } = {}) => {
	try {
		const response = await apiBase.get('/user/refresh')
		return response.data
	} catch (err: any) {
		if (showToast) {
			toast.error(err.response.data.message)
		}
	}
}

// Logout user
// @route GET /api/v1/user/logout
export const logoutUser = async () => {
	try {
		const response = await apiBase.get('/user/logout')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete user
// @route DELETE /api/v1/user/?id=user_id
export const deleteUser = async (id: string) => {
	try {
		const response = await apiBase.delete(`/user/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
