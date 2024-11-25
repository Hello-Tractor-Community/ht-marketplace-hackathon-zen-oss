import { apiBase } from '@/lib/config'
import { SupportStatus } from '@/types'
import { toast } from 'sonner'

interface ICreateTicket {
	name: string
	email: string
	phone: string
	message: string
}
// Create a support ticket
// @route POST /api/v1/support/ticket
export const createSupportTicket = async (data: ICreateTicket) => {
	try {
		const response = await apiBase.post('/support/ticket', data)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get user one support ticket
// @route GET /api/v1/support/ticket/?id=<userId>
export const getUserTickets = async (id: string) => {
	try {
		const response = await apiBase.get(`/support/ticket`, {
			params: {
				id
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Search for a support ticket
// @route GET /api/v1/support/search/?term=<searchTerm>
export const searchSupportTicket = async (term: string) => {
	try {
		const response = await apiBase.get(`/support/search`, {
			params: {
				term
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get all support tickets
// @route GET /api/v1/support/all/?status=pending
export const getAllSupportTickets = async ({
	status,
	page,
	limit
}: {
	page: number
	limit: number
	status: SupportStatus | 'all'
}) => {
	try {
		const response = await apiBase.get(`/support/all`, {
			params: {
				status,
				page,
				limit
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Update support ticket status
// @route PUT /api/v1/support/ticket/?id=<ticketId>&status=<status>
export const updateTicketStatus = async (
	id: string,
	status: 'pending' | 'resolved'
) => {
	try {
		const response = await apiBase.put(`/support/ticket`, null, {
			params: {
				id: id,
				status: status
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete support ticket
// @route DELETE /api/v1/support/ticket/?id=<ticketId>
export const deleteTicket = async (id: string) => {
	try {
		const response = await apiBase.delete(`/support/ticket`, {
			params: {
				id
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
