import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { IServerResponse  } from '../types'
import type { Request, Response } from 'express'
import Conversation from '../models/conversation.model'

// Create a new conversation
// @route POST /api/v1/conversation?id=recipient_id
export const createConversation = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const starter = res.locals.userId
    const recipient = req.query.id

    const newConversation = new Conversation({
      starter,
      recipient,
    })

    let conversation = await newConversation.save()
    if (!conversation) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error creating conversation',
        data: null,
      })
    }

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Conversation created successfully',
      data: {
        conversation,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error creating conversation: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating conversation',
      data: null,
    })
  }
}

// Get messages in a conversation
// @route GET /api/v1/conversation/messages?id=conversation_id
export const getMessagesInConversation = async (
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
    const conversation = await Conversation.findById(id).populate('messages')

    if (!conversation) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Conversation not found',
        data: null,
      })
    }
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Conversation found successfully',
      data: {
        conversation,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error getting conversation: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting conversation',
      data: null,
    })
  }
}

// Get all conversations for a particular user
// @route GET /api/v1/conversation/all
export const getAllConversations = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const id = res.locals.userId
    const conversations = await Conversation.find({
      $or: [{ starter: id }, { recipient: id }],
    })
    if (!conversations) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Conversations not found',
        data: null,
      })
    }

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Conversations found successfully',
      data: {
        conversations,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error getting conversations: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting conversations',
      data: null,
    })
  }
}

// Update has new message
// @route PUT /api/v1/conversation?id=conversation_id
export const updateHasNewMsg = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id } = req.query
    const conversation = await Conversation.findOneAndUpdate(
      { _id: id },
      { newMsg: false },
    )
    if (!conversation) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Conversation not found',
        data: null,
      })
    }
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Conversation updated successfully',
      data: {
        conversation,
      },
    })
  } catch (error) {
    Logger.error({ message: 'Error updating conversation: ' + error })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating conversation',
      data: null,
    })
  }
}
