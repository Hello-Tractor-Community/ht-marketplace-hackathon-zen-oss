import { WebSocket } from 'ws'
import { WsMessageDataType } from '../types'
import { CONNECTED_CLIENTS } from '.'
import { objToJson } from '../utils/utils'
import Message from '../models/message.model'
import Conversation from '../models/conversation.model'

export const handleUserMessage = async (
  wsClient: WebSocket,
  request: WsMessageDataType,
) => {
  // Get the recipient user id  & message
  let recepientWs = CONNECTED_CLIENTS[request.msg_res.data.recipient_id]
  let isDelivered = false

  if (recepientWs && recepientWs.readyState === WebSocket.OPEN) {
    isDelivered = true

    // send the receipient their message
    let recipientMsg = objToJson({
      msg_type: 'user.message',
      msg_res: {
        status: 'success',
        message: 'Sent the message',
        data: {
          sender_id: request.msg_res.data.sender_id,
          recipient_id: request.msg_res.data.recipient_id,
          conversation_id: request.msg_res.data.conversation_id,
          message: request.msg_res.data.message,
        },
      },
    })

    recepientWs.send(recipientMsg)
  }

  if (wsClient.readyState === WebSocket.OPEN) {
    // Send the sender a confirmation message
    let senderMsg = objToJson({
      msg_type: 'user.message',
      msg_res: {
        status: 'success',
        message: 'Message sent',
        data: {
          sender_id: request.msg_res.data.sender_id,
          recipient_id: request.msg_res.data.recipient_id,
          message: request.msg_res.data.message,
          conversation_id: request.msg_res.data.conversation_id,
          is_delivered: isDelivered,
        },
      },
    })

    wsClient.send(senderMsg)
  }

  // Create a new message
  const newMessage = new Message({
    conversation_id: request.msg_res.data.conversation_id,
    content: request.msg_res.data.message,
    sender_id: request.msg_res.data.sender_id,
    recipient_id: request.msg_res.data.recipient_id,
    isDelivered,
  })
  let message = await newMessage.save()
  if (!message) {
    return {
      status: 'error',
      message: 'Error saving message',
      data: null,
    }
  }

  // Update the conversation
  let conversation = await Conversation.findOneAndUpdate(
    { _id: request.msg_res.data.conversation_id },
    { $push: { messages: newMessage._id }, $set: { newMsg: true } },
  )

  if (!conversation) {
    return {
      status: 'error',
      message: 'Error updating conversation',
      data: null,
    }
  }

  // - Fetch the conversation between the two users
  // => newMsg field in conversation model
  // - Create a new message
  // - Append the message to the conversation
  // - Set the conversation has new message for the recipient
  // - API to update the hasNewMsg field
  // - API to fetch the all conversations
}
