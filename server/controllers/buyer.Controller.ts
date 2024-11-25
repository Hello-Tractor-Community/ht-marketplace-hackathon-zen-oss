import { Logger } from 'borgen'
import Buyer from '../models/buyer.model'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import SiteSettings from '../models/settings.model'
import { signJwtToken } from '../utils/utils'
import { Config } from '../utils/config'
import bcrypt from 'bcrypt'
import { WorkOS } from '@workos-inc/node'
import User, { IBuyer, UserDoc } from '../models/user.model'

let isProduction = Config.NODE_ENV === 'production'

const workos = new WorkOS(Config.WORKOS_API_KEY)
const clientId = Config.WORKOS_CLIENT_ID

// Google Single Sign On
// @route GET /api/v1/buyer/google
export const googleSSO = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const provider = 'GoogleOAuth'
    const redirectUri = 'https://dashboard.my-app.com'

    const authorizationUrl = workos.sso.getAuthorizationUrl({
      provider,
      redirectUri,
      clientId,
    })

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Authorization URL',
      data: {
        url: authorizationUrl,
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

// Callback for Google Single Sign On
// @route GET /api/v1/buyer/google/callback?code=
export const googleSSOCallback = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { code } = req.query as { code: string }

    const { profile } = await workos.sso.getProfileAndToken({
      code,
      clientId,
    })
    let name = profile.firstName + ' ' + profile.lastName

    const buyer = await Buyer.findOne({ email: profile.email })
    if (!buyer) {
      const newBuyer = new Buyer({
        name,
        email: profile.email,
        phone: '',
        password: '',
      })

      let savedBuyer = await newBuyer.save()
      if (!savedBuyer) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: 'error',
          message: 'Error creating buyer',
          data: null,
        })
      }

      let user = new User({
        userType: 'Buyer',
        userId: savedBuyer.id,
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
        model: 'Buyer',
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
          buyer: populatedUser,
        },
      })
    } else {
      const user = await User.findOne({ userId: buyer.id })

      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: 'error',
          message: 'Error finding user',
          data: null,
        })
      }

      const populatedUser = await User.findById(user.id).populate({
        path: 'userId',
        model: 'Buyer',
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
          buyer: populatedUser,
        },
      })
    }
  } catch (err) {
    Logger.error({ message: 'Error fetching user info' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error fetching user info',
      data: null,
    })
  }
}

// Create a buyer
// @route POST /api/v1/buyer
export const createBuyer = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  const { name, email, phone, password } = req.body

  try {
    if (!name || !email || !password || !phone) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if buyer exists
    let buyer = await Buyer.findOne({ email })

    if (buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Account already exists. Please login!',
        data: null,
      })
    }
    buyer = await Buyer.findOne({ phone })

    if (buyer) {
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
          "We're not accepting new buyers at the moment. Please try again later.",
        data: null,
      })
    }

    let hashedPassword = await bcrypt.hash(password, 10)

    let newBuyer = new Buyer({
      name,
      email,
      phone,
      password: hashedPassword,
    })

    let savedBuyer = await newBuyer.save()

    if (!savedBuyer) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error creating buyer',
        data: null,
      })
    }

    let user = new User({
      userType: 'Buyer',
      userId: savedBuyer.id,
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
      model: 'Buyer',
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
        user: populatedUser,
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

// Login a buyer
// @route POST /api/v1/buyer/login
export const loginBuyer = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if buyer exists
    let buyer = await Buyer.findOne({ email })

    if (!buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }

    let isMatch = await bcrypt.compare(password, buyer.password)

    if (!isMatch) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }
    await buyer.save()

    const user = await User.findOne({ userDetails: buyer.id }).populate({
      path: 'userId',
      model: 'Buyer',
      select: '-_id -password -createdAt -updatedAt -__v',
    })
    if (!user) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error fetching user',
        data: null,
      })
    }
    user.lastLogin = new Date()
    await user.save()

    let signedToken = signJwtToken({
      payload: user.id,
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
        user,
        token: signedToken,
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

// Logout buyer
// @route GET /api/v1/buyer/logout
export const logoutBuyer = async (
  _: Request,
  res: Response<IServerResponse>,
) => {
  res.clearCookie('_dp010usr')

  res.status(HttpStatusCode.Ok).json({
    status: 'success',
    message: 'Buyer logged out successfully',
    data: null,
  })
}

// Update buyer password
// @route PUT /api/v1/buyer/password
export const updateBuyerPassword = async (
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
      model: 'Buyer',
      select: 'password', // Select only the password field
    })) as UserDoc & { userId: IBuyer }

    if (!user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Buyer not found',
        data: null,
      })
    }

    let isMatch = await bcrypt.compare(
      oldPassword,
      (user.userId as IBuyer).password,
    )

    if (!isMatch) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Incorrect password',
        data: null,
      })
    }

    const buyer = await Buyer.findByIdAndUpdate(
      user.userId._id,
      {
        password: await bcrypt.hash(newPassword, 10),
      },
      {
        new: true,
      },
    )
    if (!buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error updating password',
        data: null,
      })
    }

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

// Update buyer details
// @route PUT /api/v1/buyer
export const updateBuyerDetails = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const userId = res.locals.userId

    const { name, email, phone } = req.body
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

    const user = (await User.findById(userId).populate({
      path: 'userId',
      model: 'Buyer',
      select: 'name email phone',
    })) as UserDoc & { userId: IBuyer }

    if (!user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Buyer not found',
        data: null,
      })
    }

    let buyer = await Buyer.findById(user.userId._id)

    if (!buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Buyer not found',
        data: null,
      })
    }

    if (name) buyer.name = name
    if (email) buyer.email = email
    if (phone) buyer.phone = phone

    let updatedBuyer = await buyer.save()

    if (!updatedBuyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Error updating buyer',
        data: null,
      })
    }


    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Buyer updated successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating buyer',
      data: null,
    })
  }
}

// Get buyer details
// @route GET /api/v1/buyer/?id=buyer_id
export const getBuyer = async (
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

    let buyer = await Buyer.findById(id)

    if (!buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Buyer not found',
        data: null,
      })
    }

    const { password: _, ...buyerWithoutPassword } = buyer.toObject()

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User found',
      data: buyerWithoutPassword,
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

// Get all buyers
// @route GET /api/v1/buyer/all/?page=1&limit=10
export const getAllBuyers = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [buyers, totalBuyers] = await Promise.all([
      Buyer.find().skip(skip).limit(limit),
      Buyer.countDocuments(),
    ])

    const usersWithoutPassword = buyers.map((buyer) => {
      const { password: _, ...userWithoutPassword } = buyer.toJSON()
      return userWithoutPassword
    })

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Users found',
      data: {
        buyers: usersWithoutPassword,
        totalBuyers,
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

// Delete buyer
// @route DELETE /api/v1/buyer/?id=buyer_id
export const deleteBuyer = async (
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

    let buyer = await Buyer.findByIdAndDelete(id)

    if (!buyer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Buyer not found',
        data: null,
      })
    }

    let user = await Buyer.findOneAndDelete({ userId: buyer.id })

    if (!user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'User not found',
        data: null,
      })
    }

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Buyer deleted successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error deleting user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting buyer',
      data: null,
    })
  }
}
