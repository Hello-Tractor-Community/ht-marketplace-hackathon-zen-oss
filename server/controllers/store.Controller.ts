import { Logger } from 'borgen'
import Store from '../models/store.model'
import axios, { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import { Config } from '../utils/config'
import { uploadImages } from '../utils/image-upload'

// Create a new store
// @route POST /api/v1/store
export const createStore = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { name, description, contact } = req.body
    if (!name || !description || !contact) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }
    const sellerId = res.locals.userId

    const store = new Store({
      seller_id: sellerId,
      name,
      description,
      contact,
    })

    let savedStore = await store.save()

    if (!store) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error creating store',
        data: null,
      })
    }

    res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Store created successfully',
      data: savedStore,
    })
  } catch (err) {
    Logger.error({ message: 'Error creating user' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating store',
      data: null,
    })
  }
}

// Store Logo Upload
// @route POST /api/v1/store/logo
export const storeLogoUpload = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    uploadImages({
      req,
      res,
      Model: Store,
      modelName: 'Store',
      imageField: 'logo',
    })
  } catch (err) {
    Logger.error({ message: 'Error uploading logo' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error uploading logo',
      data: null,
    })
  }
}

// Get a store
// @route GET /api/v1/store/?id=store_id
export const getStore = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    let store = await Store.findById(id)

    if (!store) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Store not found',
        data: null,
      })
    }

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Store found',
      data: store,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting store' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting store',
      data: null,
    })
  }
}

// Get all stores
// @route GET /api/v1/store/all/?page=1&limit=10
export const getAllStores = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [stores, totalStores] = await Promise.all([
      Store.find().skip(skip).limit(limit),
      Store.countDocuments(),
    ])

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Stores found',
      data: {
        stores,
        totalStores,
        page,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error getting all stores' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting all stores',
      data: null,
    })
  }
}

// Update store
// @route PUT /api/v1/store/?id=store_id
export const updateStore = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { id } = req.query
  const { name, description, contact } = req.body
  try {
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    let store = await Store.findById(id)

    if (!store) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Store not found',
        data: null,
      })
    }

    if (name) store.name = name
    if (description) store.description = description
    if (contact) store.contact = contact

    store = await store.save()

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Store updated successfully',
      data: store,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating store' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating store',
      data: null,
    })
  }
}

// Delete store
// @route DELETE /api/v1/store/?id=store_id
export const deleteStore = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    let store = await Store.findByIdAndDelete(id)

    if (!store) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Store not found',
        data: null,
      })
    }

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Store deleted successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error deleting store' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting store',
      data: null,
    })
  }
}
