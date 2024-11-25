import { toast } from 'sonner'
import { AdminRole } from '@/types'
import { apiBase } from '@/lib/config'

interface ICreateAdmin {
	name: string
	email: string
	password: string
}
// Create a new admin
// @route POST /api/v1/admin
export const createAdmin = async (userData: ICreateAdmin) => {
	try {
		const response = await apiBase.post('/admin', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IAdminLogin {
	email: string
	password: string
}
// Login admin
// @route POST /api/v1/admin/login
export const loginAdmin = async (userData: IAdminLogin) => {
	try {
		const response = await apiBase.post('/admin/login', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get an admin
// @route GET /api/v1/admin/?id=user_id
export const getAdmin = async (id: string) => {
	try {
		const response = await apiBase.get(`/admin/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Update an admin
// @route PUT /api/v1/admin/?id=user_id
export const updateAdmin = async (id: string, userData: ICreateAdmin) => {
	try {
		const response = await apiBase.put(`/admin/?id=${id}`, userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface UpdateAdminRole {
	id: string
	role: AdminRole
}
// Update admin role
// @route PUT /api/v1/admin/role
export const updateAdminRole = async ({ id, role }: UpdateAdminRole) => {
	try {
		const response = await apiBase.put('/admin/role', { id, role })
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateAdminPassword {
	password: string
	newPassword: string
}
// Update admin password
// @route PUT /api/v1/admin/password
export const updateAdminPassword = async ({
	password,
	newPassword
}: IUpdateAdminPassword) => {
	try {
		const response = await apiBase.put('/admin/password', {
			password,
			newPassword
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Refresh admin access
// @route GET /api/v1/admin/refresh
export const refreshAdmin = async () => {
	try {
		const response = await apiBase.get('/admin/refresh')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Logout admin
// @route GET /api/v1/admin/logout
export const logoutAdmin = async () => {
	try {
		const response = await apiBase.get('/admin/logout')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete an admin
// @route DELETE /api/v1/admin/?id=user_id
export const deleteAdmin = async (id: string) => {
	try {
		const response = await apiBase.delete(`/admin/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get all admins
// @route GET /api/v1/admin/all
export const getAllAdmins = async () => {
	try {
		const response = await apiBase.get('/admin/all')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Search for admin using email
// @route GET /api/v1/admin/search/?email=user_email
export const searchAdmin = async (email: string) => {
	try {
		const response = await apiBase.get(`/admin/search/?email=${email}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
