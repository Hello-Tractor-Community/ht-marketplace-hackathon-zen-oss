import { WebSocket } from 'ws'
import { WsMessageDataType } from '../types'
import { CONNECTED_CLIENTS } from '.'
import { objToJson } from '../utils/utils'

export const handleUserMessage = (
  wsClient: WebSocket,
  request: WsMessageDataType,
) => {
  // Get the recipient user id  & message
  let recepientWs = CONNECTED_CLIENTS[request.msg_res.data.recipient_id]
  let isDelivered = false

  if (recepientWs && recepientWs.readyState === WebSocket.OPEN) {
    isDelivered = true

    // send the receipeint their message
    let recipientMsg = objToJson({
      msg_type: 'user.message',
      msg_res: {
        status: 'success',
        message: 'Sent the message',
        data: {
          sender_id: request.msg_res.data.sender_id,
          recipient_id: request.msg_res.data.recipient_id,
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
          is_delivered: isDelivered,
        },
      },
    })

    wsClient.send(senderMsg)
  }

  // Store message in DB for persistence
  // - Fetch the conversation between the two users
  // => newMsg field in conversation model
  // - Create a new message
  // - Append the message to the conversation
  // - Set the conversation has new message for the recipient
  // - API to update the hasNewMsg field
  // - API to fetch the all conversations
}
