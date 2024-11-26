import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface IAddToWishlist {
    product_id: string
}
// Add to Wishlist
// @route POST /api/v1/wishlist?id=product_id
export const addToWishlist = async ({ product_id }: IAddToWishlist) => {
    try {
        const response = await apiBase.post(`/wishlist?id=${product_id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}


interface IGetWishlist {
    page: number
    limit: number
}
// Get buyers wishlist
// @route GET /api/v1/wishlist/all/?page=1&limit=10
export const getWishlist = async ({ page, limit }: IGetWishlist) => {
    try {
        const response = await apiBase.get(`/wishlist/all?page=${page}&limit=${limit}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}

interface IRemoveFromWishlist {
    product_id: string
}
// Remove from wishlist
// @route DELETE /api/v1/wishlist?id=product_id
export const removeFromWishlist = async ({ product_id }: IRemoveFromWishlist) => {
    try {
        const response = await apiBase.delete(`/wishlist?id=${product_id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}

