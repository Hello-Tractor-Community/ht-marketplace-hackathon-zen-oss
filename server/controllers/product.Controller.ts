import { Logger } from 'borgen'
import Product from '../models/product.model'
import { HttpStatusCode } from 'axios'
import type { IServerResponse, SearchQuery } from '../types'
import type { Request, Response } from 'express'
import { deleteImages } from '../utils/image-upload'
import Seller from '../models/seller.model'

// Create a new tractor
// @route POST /api/v1/product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      model,
      wheelDrive,
      horsePower,
      price,
      engineHours,
      description,
      category,
      cylinders,
      engineRpm,
      transmissionType,
      clutchType,
      gearboxType,
      brakesType,
      steeringType,
      fuelTankCapacity,
      liftingCapacity,
      frontWheelSize,
      rearWheelSize,
      images: [],
    } = req.body

    const seller_id = res.locals.userId

    // Validate required fields
    if (
      !model ||
      !wheelDrive ||
      !horsePower ||
      !price ||
      !engineHours ||
      !description ||
      !category ||
      !cylinders ||
      !engineRpm ||
      !transmissionType ||
      !clutchType ||
      !gearboxType ||
      !brakesType ||
      !steeringType ||
      !fuelTankCapacity ||
      !liftingCapacity ||
      !frontWheelSize ||
      !rearWheelSize
    ) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing required fields',
        data: null,
      })
    }

    // Validate price and stock
    if (price <= 0) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid price values',
        data: null,
      })
    }

    // Find seller's store
    const seller = await Seller.findById(seller_id)
    if (!seller) {
      return res.status(HttpStatusCode.NotFound).json({
        status: 'error',
        message: 'Seller not found',
        data: null,
      })
    }

    // Create product
    const newProduct = new Product({
      seller_id,
      modelName: model,
      wheelDrive,
      horsePower,
      price,
      engineHours,
      description,
      category,
      cylinders,
      engineRpm,
      transmissionType,
      clutchType,
      gearboxType,
      brakesType,
      steeringType,
      fuelTankCapacity,
      liftingCapacity,
      frontWheelSize,
      rearWheelSize,
      images: [],
    })

    const savedProduct = await newProduct.save()

    return res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Product created successfully',
      data: savedProduct,
    })
  } catch (error) {
    Logger.error({ message: 'Error creating product: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Failed to create product',
      data: null,
    })
  }
}

// Get all products
// @route GET /api/v1/product/all/?page=1&limit=10
export const getAllProducts = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [products, totalProducts] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ])

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Products found',
      data: {
        products,
        totalProducts,
        page,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error getting products: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting products',
      data: null,
    })
  }
}

// Filter products
// @route GET /api/v1/product/filter?search=product&category=category&brand=brand&horsePower=hp&year=year&engineHours=engineHours&minPrice=minPrice&maxPrice=maxPrice&page=1&limit=10&sortBy=createdAt&sortOrder=desc
export const filterProducts = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const {
        userQuery,
      type,
      brand,
      minHorsePower,
      maxHorsePower,
      year,
      minEngineHours,
      maxEngineHours,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query

    const searchQuery: SearchQuery = {}

    if (userQuery) {
      const searchRegex = new RegExp(String(userQuery), 'i')
      searchQuery.$or = [{ modelName: searchRegex }, { description: searchRegex }]
    }

    if (brand) {
      searchQuery.brand = String(brand)
    }

    if(type) {
      searchQuery.type = String(type)
    }

    if (minHorsePower || maxHorsePower) {
      searchQuery.horsePower = {}
      if (minPrice) searchQuery.horsePower.$gte = Number(minPrice)
      if (maxPrice) searchQuery.horsePower.$lte = Number(maxPrice)
    }

    if (year) {
      searchQuery.year = Number(year)
    }

    if (minEngineHours || maxEngineHours) {
      searchQuery.engineHours= {}
      if (minPrice) searchQuery.engineHours.$gte = Number(minPrice)
      if (maxPrice) searchQuery.engineHours.$lte = Number(maxPrice)
    }

    // Price range filter
    if (minPrice || maxPrice) {
      searchQuery.price = {}
      if (minPrice) searchQuery.price.$gte = Number(minPrice)
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice)
    }


    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(searchQuery)

    // Execute search query with pagination and sorting
    const products = await Product.find(searchQuery)
      .sort({ [String(sortBy)]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v') // Exclude version key

    if (!products) {
      return res.status(HttpStatusCode.NotFound).json({
        status: 'error',
        message: 'Products not found',
        data: null,
      })
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalProducts / Number(limit))
    const hasNextPage = Number(page) < totalPages
    const hasPrevPage = Number(page) > 1

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data: {
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalProducts,
          hasNextPage,
          hasPrevPage,
          limit: Number(limit),
        },
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error filtering products: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error filtering products',
      data: null,
    })
  }
}

// Get a product
// @route GET /api/v1/product/?id=product_id
export const getProduct = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query

    const product = await Product.findById(id)
    if (!product) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Product not found',
        data: null,
      })
    }
    // Increment views
    product.views += 1
    await product.save()
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Product found',
      data: product,
    })
  } catch (error) {
    Logger.error({ message: 'Error getting product: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting product',
      data: null,
    })
  }
}

// Update a product
// @route PUT /api/v1/product/?id=product_id
export const updateProduct = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    const {
      model,
      wheelDrive,
      horsePower,
      price,
      engineHours,
      description,
      category,
      cylinders,
      engineRpm,
      transmissionType,
      clutchType,
      gearboxType,
      brakesType,
      steeringType,
      fuelTankCapacity,
      liftingCapacity,
      frontWheelSize,
      rearWheelSize,
      imagesToAdd, // New image URLs from the frontend
      imagesToDelete,
    } = req.body

    const product = await Product.findById(id)
    if (!product) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Product not found',
        data: null,
      })
    }

    let remainingImages = [...(product.images || [])]
    if (imagesToDelete && Array.isArray(imagesToDelete)) {
      await deleteImages(imagesToDelete)
      remainingImages = remainingImages.filter(
        (image) => !imagesToDelete.includes(image),
      )
    }

    if (imagesToAdd && Array.isArray(imagesToAdd)) {
      remainingImages = [...remainingImages, ...imagesToAdd]
    }

    product.images = remainingImages

    if (model) product.modelName = model
    if (wheelDrive) product.wheelDrive = wheelDrive
    if (horsePower) product.horsePower = horsePower
    if (price) product.price = price
    if (engineHours) product.engineHours = engineHours
    if (description) product.description = description
    if (category) product.category = category
    if (cylinders) product.cylinders = cylinders
    if (engineRpm) product.engineRpm = engineRpm
    if (transmissionType) product.transmissionType = transmissionType
    if (clutchType) product.clutchType = clutchType
    if (gearboxType) product.gearboxType = gearboxType
    if (brakesType) product.brakesType = brakesType
    if (steeringType) product.steeringType = steeringType
    if (fuelTankCapacity) product.fuelTankCapacity = fuelTankCapacity
    if (liftingCapacity) product.liftingCapacity = liftingCapacity
    if (frontWheelSize) product.frontWheelSize = frontWheelSize
    if (rearWheelSize) product.rearWheelSize = rearWheelSize

    let updatedProduct = await product.save()
    if (!updatedProduct) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error updating product',
        data: null,
      })
    }
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct,
    })
  } catch (error) {
    Logger.error({ message: 'Error updating product: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating product',
      data: null,
    })
  }
}

// Delete a product
// @route DELETE /api/v1/product/?id=product_id
export const deleteProduct = async (
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
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Product not found',
        data: null,
      })
    }
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: null,
    })
  } catch (error) {
    Logger.error({ message: 'Error deleting product: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting product',
      data: null,
    })
  }
}
