import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'
import Dealer from '../models/dealer.model'

// Fetch all dealers from database
// @route GET /api/v1/dealer
export const getAllDealers = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const dealers = await Dealer.find()
    if (!dealers) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Dealers not found',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Dealers found',
      data: dealers,
    })
  } catch (error) {
    Logger.error({ message: 'Error fetching all dealers: ' + error })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error fetching all dealers',
      data: null,
    })
  }
}

// Get details of a particular dealer
// @route GET /api/v1/dealer/?id=dealer_id
export const getDealer = async (
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

    let dealer = await Dealer.findById(id)
    if (!dealer) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Dealer not found',
        data: null,
      })
    }
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Dealer found',
      data: dealer,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting dealer' + err })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting dealer',
      data: null,
    })
  }
}
