import { Logger } from 'borgen'
import Seller from '../models/seller.model'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import SiteSettings from '../models/settings.model'
import { signJwtToken } from '../utils/utils'
import { Config } from '../utils/config'
import bcrypt from 'bcrypt'
import { google } from 'googleapis'
import User, { ISeller, UserDoc } from '../models/user.model'

let isProduction = Config.NODE_ENV === 'production'

// Create a seller
// @route POST /api/v1/seller
export const createSeller = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    let { name, email, phone, password, companyDetails } = req.body

    if (!name || !email || !password || !phone) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if seller exists
    let seller = await Seller.findOne({ email })

    if (seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Account already exists. Please login!',
        data: null,
      })
    }

    // Check if seller exists using phone number
    phone = Array.isArray(phone) ? phone : [phone]
    seller = await Seller.findOne({ phone: { $in: [phone] } })

    if (seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Account with this phone number already exists. Please login!',
        data: null,
      })
    }

    let settings = await SiteSettings.findOne()

    if (!settings) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error fetching site settings',
        data: null,
      })
    }

    if (settings?.allowSignup === false) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message:
          "We're not accepting new sellers at the moment. Please try again later.",
        data: null,
      })
    }

    let hashedPassword = await bcrypt.hash(password, 10)

    let newSeller = new Seller({
      name,
      email,
      phone,
      companyDetails,
      password: hashedPassword,
    })

    let savedSeller = await newSeller.save()

    if (!savedSeller) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error creating seller',
        data: null,
      })
    }

    let user = new User({
      userType: 'Seller',
      userId: savedSeller.id,
    })

    let savedUser = await user.save()

    if (!savedUser) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error creating user',
        data: null,
      })
    }

    const populatedUser = await User.findById(savedUser.id).populate({
      path: 'userId',
      model: 'Seller',
      select: '-_id -password -createdAt -updatedAt -__v',
    })

    if (!populatedUser) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error populating user',
        data: null,
      })
    }

    let signedToken = signJwtToken({
      payload: populatedUser.id,
      expiresIn: '7d',
    })

    if (signedToken.status === 'error') {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error signing token',
        data: null,
      })
    }

    // Set cookie
    res.cookie('_dp010usr', signedToken.data.token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      httpOnly: isProduction,
    })

    return res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Account created successfully',
      data: {
        seller: populatedUser,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error creating user' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating user',
      data: null,
    })
  }
}

// Login a seller
// @route POST /api/v1/seller/login
export const loginSeller = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if seller exists
    let seller = await Seller.findOne({ email })

    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }

    let isMatch = await bcrypt.compare(password, seller.password)

    if (!isMatch) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }

    seller.lastLogin = new Date()
    await seller.save()

    let user = await User.findOne({ userId: seller.id })
    if (!user) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error fetching user',
        data: null,
      })
    }

    const populatedUser = await User.findById(user.id).populate({
      path: 'userId',
      model: 'Seller',
      select: '-_id -password -createdAt -updatedAt -__v',
    })

    if (!populatedUser) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error populating user',
        data: null,
      })
    }

    let signedToken = signJwtToken({
      payload: populatedUser.id,
      expiresIn: '7d',
    })

    if (signedToken.status === 'error') {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error signing token',
        data: null,
      })
    }

    // Set cookie
    res.cookie('_dp010usr', signedToken.data.token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      httpOnly: isProduction,
    })

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        seller: populatedUser,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error logging in user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error logging in user',
      data: null,
    })
  }
}

// Logout seller
// @route GET /api/v1/seller/logout
export const logoutSeller = async (
  _: Request,
  res: Response<IServerResponse>,
) => {
  res.clearCookie('_dp010usr')

  res.status(HttpStatusCode.Ok).json({
    status: 'success',
    message: 'Seller logged out successfully',
    data: null,
  })
}

// Update seller password
// @route PUT /api/v1/seller/password
export const updateSellerPassword = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { oldPassword, newPassword } = req.body
  const userId = res.locals.userId

  try {
    if (!oldPassword || !newPassword) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing password',
        data: {
          body: {
            password: 'string',
          },
        },
      })
    }

    const user = (await User.findById(userId).populate({
      path: 'userId',
      model: 'Seller',
      select: 'password', // Select only the password field
    })) as UserDoc & { userId: ISeller }

    let isMatch = await bcrypt.compare(
      oldPassword,

      (user.userId as ISeller).password,
    )

    if (!isMatch) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Incorrect password',
        data: null,
      })
    }

    const seller = await Seller.findByIdAndUpdate(
      user.userId._id,
      {
        password: await bcrypt.hash(newPassword, 10),
      },
      {
        new: true,
      },
    )
    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error updating password',
        data: null,
      })
    }

    seller.password = await bcrypt.hash(newPassword, 10)
    await seller.save()

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User updated successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating password' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating password',
      data: null,
    })
  }
}

// Update seller details
// @route PUT /api/v1/seller
export const updateSellerDetails = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { name, email, phone, address, location, bio } = req.body
    if (!name && !email && !phone) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing details',
        data: {
          body: {
            name: 'string',
            email: 'string',
            phone: 'string',
          },
        },
      })
    }
    const userId = res.locals.userId

    const user = (await User.findById(userId).populate({
      path: 'userId',
      model: 'Seller',
      select: 'name email phone',
    })) as UserDoc & { userId: ISeller }

    let seller = await Seller.findById(user.userId._id)
    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Seller not found',
        data: null,
      })
    }

    if (name) seller.name = name
    if (email) seller.email = email
    if (phone) seller.phone = phone
    if (address) seller.address = address
    if (location) seller.location = location
    if (bio) seller.bio = bio

    let updatedSeller = await seller.save()

    if (!updatedSeller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error updating seller',
        data: null,
      })
    }

    // seller without password

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Seller updated successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating user' + err })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating seller',
      data: null,
    })
  }
}

// Get seller details
// @route GET /api/v1/seller/?id=seller_id
export const getSeller = async (
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

    let seller = await Seller.findById(id)

    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Seller not found',
        data: null,
      })
    }

    const { password: _, ...sellerWithoutPassword } = seller.toJSON()

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User found',
      data: sellerWithoutPassword,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting user',
      data: null,
    })
  }
}

// Search for a seller by name
// @route GET /api/v1/seller/search?type=name&term=seller_name
export const searchSeller = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { type, term } = req.query
  try {
    if ((type !== 'name' && type !== 'id') || !term) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    let seller
    if (type === 'id') {
      seller = await Seller.findOne({ id: term })
    } else {
      seller = await Seller.findOne({
        $or: [
          { name: { $regex: term, $options: 'i' } },
          { email: { $regex: term, $options: 'i' } },
        ],
      })
    }

    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'User not found',
        data: null,
      })
    }

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User found',
      data: seller,
    })
  } catch (err) {
    Logger.error({ message: 'Error searching user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error searching user',
      data: null,
    })
  }
}

// Get all sellers
// @route GET /api/v1/seller/all/?page=1&limit=10
export const getAllSellers = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [sellers, totalSellers] = await Promise.all([
      Seller.find().skip(skip).limit(limit),
      Seller.countDocuments(),
    ])

    if (!sellers) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Users not found',
        data: null,
      })
    }
    // Remove password from response
    const usersWithoutPassword = sellers.map((seller) => {
      const { password: _, ...userWithoutPassword } = seller.toJSON()
      return userWithoutPassword
    })

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Users found',
      data: {
        sellers: usersWithoutPassword,
        totalSellers,
        page,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error getting all users: ' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting all users',
      data: null,
    })
  }
}

// Delete seller
// @route DELETE /api/v1/seller/?id=user_id
export const deleteSeller = async (
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

    let user = await User.findById(id)

    if (!user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Seller not found',
        data: null,
      })
    }

    let seller = await Seller.findByIdAndDelete(user.userId._id)
    if (!seller) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Seller not found',
        data: null,
      })
    }

    await User.findByIdAndDelete(id)

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Seller deleted successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error deleting user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting seller',
      data: null,
    })
  }
}
