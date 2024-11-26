import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface ICreateSeller {
	name: string
	email: string
	phone: string
	password: string
}
// Create a seller
// @route POST /api/v1/seller
export const createSeller = async (userData: ICreateSeller) => {
	try {
		const response = await apiBase.post('/seller', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IVerifySeller {
	code: string
}
// Verify the code sent to seller
// @route POST /api/v1/seller/verify
export const verifySeller = async (userData: IVerifySeller) => {
	try {
		const response = await apiBase.post('/seller/verify', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface ILoginSeller {
	email: string
	password: string
}
// Login a seller
// @route POST /api/v1/seller/login
export const loginSeller = async (userData: ILoginSeller) => {
	try {
		const response = await apiBase.post('/seller/login', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Logout seller
// @route GET /api/v1/seller/logout
export const logoutSeller = async () => {
	try {
		const response = await apiBase.get('/seller/logout')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateSellerPassword {
	oldPassword: string
	newPassword: string
}
// Update seller password
// @route PUT /api/v1/seller/password
export const updateSellerPassword = async (userData: IUpdateSellerPassword) => {
	try {
		const response = await apiBase.put('/seller/password', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateSellerDetails {
	name: string
	email: string
	phone: string
    bio: string
    address: string
    location: string
	companyDetails?: string
}
// Update seller details
// @route PUT /api/v1/seller
export const updateSellerDetails = async (userData: IUpdateSellerDetails) => {
	try {
		const response = await apiBase.put('/seller', userData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IGetSellers {
	id?: string
}
// Get seller details
// @route GET /api/v1/seller/?id=seller_id
export const getSeller = async ({ id }: IGetSellers = {}) => {
	try {
		const response = await apiBase.get(`/seller?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface ISearchSellers {
	type: string
	term: string
}
// Search for a seller by name
// @route GET /api/v1/seller/search?type=name&term=seller_name
export const searchSeller = async ({ type, term }: ISearchSellers) => {
	try {
		const response = await apiBase.get(
			`/seller/search?type=${type}&term=${term}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IGetAllSellers {
	page?: number
	limit?: number
}
// Get all sellers
// @route GET /api/v1/seller/all/?page=1&limit=10
export const getAllSellers = async ({ page, limit }: IGetAllSellers) => {
	try {
		const response = await apiBase.get(
			`/seller/all?page=${page}&limit=${limit}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}


// Delete seller
// @route DELETE /api/v1/seller/?id=user_id
export const deleteSeller = async ({ id }: { id: string }) => {
    try {
        const response = await apiBase.delete(`/seller?id=${id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}
