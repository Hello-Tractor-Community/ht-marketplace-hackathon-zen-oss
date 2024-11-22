import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import Reviews from '../models/reviews.model'

// Create Review
// @route POST /api/v1/review?id=product_id
export const createReview = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { product_id } = req.query
    const buyer_id = res.locals.userId
    const { title, description, rating } = req.body
    if (!product_id || !buyer_id || !title || !description || !rating) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    const review = new Reviews({
      product_id,
      buyer_id,
      title,
      description,
      rating,
    })

    await review.save()
    res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Review created successfully',
      data: review,
    })
  } catch (error) {
    Logger.error({ message: 'Error creating review: ' + error })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating review',
      data: null,
    })
  }
}

// Get Review
// @route GET /api/v1/review?id=review_id
export const getReview = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const review = await Reviews.findById(id)
    if (!review) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Review not found',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Review found',
      data: review,
    })
  } catch (error) {
    Logger.error({ message: 'Error getting review: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting review',
      data: null,
    })
  }
}

// Get reviews for a product
// @route GET /api/v1/reviews/all?id=product_id
export const getProductReviews = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const reviews = await Reviews.find({ product_id: id })
    if (!reviews) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Reviews not found',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Reviews found',
      data: reviews,
    })
  } catch (error) {
    Logger.error({ message: 'Error getting reviews: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting reviews',
      data: null,
    })
  }
}

// Respond to a review
// @route PUT /api/v1/review?id=review_id
export const respondToReview = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    const { response } = req.body
    if (!id || !response) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const review = await Reviews.findById(id)
    if (!review) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Review not found',
        data: null,
      })
    }
    review.response = response
    await review.save()
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Review responded successfully',
      data: review,
    })
  } catch (error) {
    Logger.error({ message: 'Error responding to review: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error responding to review',
      data: null,
    })
  }
}

// Update a review
// @route PUT /api/v1/review?id=review_id
export const updateReview = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    const { title, description, rating } = req.body

    const review = await Reviews.findById(id)
    if (!review) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Review not found',
        data: null,
      })
    }

    if (title) review.title = title
    if (description) review.description = description
    if (rating) review.rating = rating
    await review.save()

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Review updated successfully',
      data: review,
    })
  } catch (error) {
    Logger.error({ message: 'Error updating review: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating review',
      data: null,
    })
  }
}

// Delete Review
// @route DELETE /api/v1/review?id=review_id
export const deleteReview = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const review = await Reviews.findByIdAndDelete(id)
    if (!review) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Review not found',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Review deleted successfully',
      data: null,
    })
  } catch (error) {
    Logger.error({ message: 'Error deleting review: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting review',
      data: null,
    })
  }
}
