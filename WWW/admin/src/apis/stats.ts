import { apiBase } from '@/lib/config'
import { toast } from 'sonner'

// Get website stats
// @route GET /api/v1/stats
export const getWebsiteStats = async () => {
	try {
		const response = await apiBase.get('/stats')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
