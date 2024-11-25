import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface ICreateReview {
	product_id: string
	title: string
	description: string
	rating: number
}

// Create Review
// @route POST /api/v1/review?id=product_id
export const createReview = async ({
	product_id,
	title,
	description,
	rating
}: ICreateReview) => {
	try {
		const response = await apiBase.post(`/review?id=${product_id}`, {
			title,
			description,
			rating
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get Review
// @route GET /api/v1/review?id=review_id
export const getReview = async (id: string) => {
	try {
		const response = await apiBase.get(`/review?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Get reviews for a product
// @route GET /api/v1/reviews/all?id=product_id
export const getProductReviews = async (id: string) => {
	try {
		const response = await apiBase.get(`/reviews/all?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IRespondToReview {
	id: string
	responseToReview: string
}
// Respond to a review
// @route PUT /api/v1/review?id=review_id
export const respondToReview = async ({
	id,
	responseToReview
}: IRespondToReview) => {
	try {
		const response = await apiBase.put(`/review?id=${id}`, {
			response: responseToReview
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateReview {
    id: string
    title: string
    description: string
    rating: number
}
// Update a review
// @route PUT /api/v1/review?id=review_id
export const updateReview = async ({
    id,
    title,
    description,
    rating
}: IUpdateReview ) => {
    try {
        const response = await apiBase.put(`/review?id=${id}`, {
            title,
            description,
            rating
        })
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}


interface IDeleteReview {
    id: string
}
// Delete Review
// @route DELETE /api/v1/review?id=review_id
export const deleteReview = async ({ id }: IDeleteReview) => {
    try {
        const response = await apiBase.delete(`/review?id=${id}`)
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}
