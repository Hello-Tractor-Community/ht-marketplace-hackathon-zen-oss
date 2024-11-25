import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

// Fetch all dealers from database
// @route GET /api/v1/dealers
export const getAllDealers = async () => {
	try {
		const response = await apiBase.get('/dealer/all')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IGetADealer {
    id: string
}
// Get details of a particular dealer
// @route GET /api/v1/dealers/?id=dealer_id
export const getDealer = async ({ id }: IGetADealer) => {
    try {
        const response = await apiBase.get(`/dealer?id=${id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}

