import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface ICreateConversation {
	recipient_id: string
}
// Create a new conversation
// @route POST /api/v1/conversation?id=recipient_id
export const createConversation = async ({
	recipient_id
}: ICreateConversation) => {
	try {
		const response = await apiBase.post(`/conversation?id=${recipient_id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get messages in a conversation
// @route GET /api/v1/conversation/messages?id=conversation_id
export const getMessagesInConversation = async (conversation_id: string) => {
	try {
		const response = await apiBase.get(
			`/conversation/messages?id=${conversation_id}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}


// Get all conversations for a particular user
// @route GET /api/v1/conversation/all
export const getAllConversations = async () => {
    try {
        const response = await apiBase.get('/conversation/all')
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}


// Update has new message
// @route PUT /api/v1/conversation?id=conversation_id
export const updateHasNewMsg = async (conversation_id: string) => {
    try {
        const response = await apiBase.put(`/conversation?id=${conversation_id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}
