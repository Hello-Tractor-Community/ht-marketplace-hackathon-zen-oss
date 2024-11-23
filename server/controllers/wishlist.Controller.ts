import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import Wishlist from '../models/wishlist.model'

// Add to Wishlist
// @route POST /api/v1/wishlist?id=product_id
export const addToWishlist = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { product_id } = req.query
    const buyer_id = res.locals.userId

    if (!product_id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const exists = await Wishlist.findOne({ buyer_id })
    if (exists) {
        // Update wishlist
        const wishlist = await Wishlist.findOneAndUpdate(
          { buyer_id },
          { $push: { product_id } },
          { new: true },
        )
        if (!wishlist) {
          return res.status(HttpStatusCode.BadRequest).json({
            status: 'error',
            message: 'Error adding product to wishlist',
            data: null,
          })
        }
        wishlist.populate('product_id')
        return res.status(HttpStatusCode.Created).json({
          status: 'success',
          message: 'Product added to wishlist successfully',
          data: wishlist,
        })
    }

    const wishlist = new Wishlist({
      product_id,
      buyer_id,
    })
    await wishlist.save()
    if (!wishlist) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error adding product to wishlist',
        data: null,
      })
    }

    wishlist.populate('product_id')
    res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Product added to wishlist successfully',
      data: wishlist,
    })
  } catch (error) {
    Logger.error({ message: 'Error adding product to wishlist: ' + error })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error adding product to wishlist',
      data: null,
    })
  }
}

// Get buyers wishlist
// @route GET /api/v1/wishlist/all/?page=1&limit=10
export const getBuyerWishlist = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const buyer_id = res.locals.userId
    const wishlist = await Wishlist.find({ buyer_id }).populate('product_id')

    if (!wishlist) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error getting wishlist',
        data: null,
      })
    }
    // Number of items in wishlist
    const count = wishlist.length

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Wishlist fetched successfully',
      data: {
        wishlist,
        count,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error getting wishlist: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting wishlist',
      data: null,
    })
  }
}

// Remove from Wishlist
// @route PUT /api/v1/wishlist?id=product_id
export const removeFromWishlist = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { product_id } = req.query
    const buyer_id = res.locals.userId
    if (!product_id || !buyer_id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Update wishlist
    const wishlist = await Wishlist.findOneAndUpdate(
      { buyer_id, product_id },
      { $pull: { product_id } },
      { new: true },
    )

    if (!wishlist) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error removing product from wishlist',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Product removed from wishlist successfully',
      data: wishlist,
    })
  } catch (error) {
    Logger.error({ message: 'Error removing product from wishlist: ' + error })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error removing product from wishlist',
      data: null,
    })
  }
}
