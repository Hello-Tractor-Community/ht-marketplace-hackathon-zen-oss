import { apiBase } from '@/lib/config'
import { toast } from 'sonner'

// Send an email
// @route POST /api/v1/email/send
export const sendEmail = async (emailData: {
	to: string
	subject: string
	message: string
}) => {
	try {
		const response = await apiBase.post('/email/send', emailData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get all emails
// @route GET /api/v1/email/all/?page=<page>&limit=<limit>
export const getAllPaginatedEmails = async ({
	page,
	limit
}: {
	page: number
	limit: number
}) => {
	try {
		const response = await apiBase.get('/email/all', {
			params: {
				page,
				limit
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Search for email
// @route GET /api/v1/email/search/?term=<email|subject>
export const searchEmail = async (term: string) => {
	try {
		const response = await apiBase.get('/email/search', {
			params: {
				term
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get email by id
// @route GET /api/v1/email/?id=<emailId>
export const getEmail = async (id: string) => {
	try {
		const response = await apiBase.get(`/email/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete email by id
// @route DELETE /api/v1/email/?id=<emailId>
export const deleteEmail = async (id: string) => {
	try {
		const response = await apiBase.delete(`/email/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
