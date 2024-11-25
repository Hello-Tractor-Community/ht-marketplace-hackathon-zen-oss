import http from 'http'
import crypto from 'crypto'
import { WebSocket } from 'ws'
import { jsonToObj } from '../utils/utils'
import { handleUserMessage } from './controllers'

export const CONNECTED_CLIENTS: Record<string, WebSocket> = {
  '334543': new WebSocket('ws://localhost:8080'),
}

// Setup websocket server
export async function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocket.Server({ server })
  let socketId = crypto.randomUUID()

  wss.on('connection', (wsClient) => {
    CONNECTED_CLIENTS[socketId] = wsClient

    // Listen for messages from Client socket
    wsClient.on('message', (message) => {
      let request = jsonToObj(message.toString())

      if (request.msg_type === 'user.message') {
        handleUserMessage(wsClient, request)
      }

      if (request.msg_type === 'pay.withdraw.code') {
      }

      if (request.msg_type === 'pay.withdraw.complete') {
      }
    })

    wsClient.on('close', () => {
      console.log('Client disconnected')
    })
  })

  wss.on('close', () => {
    delete CONNECTED_CLIENTS[socketId]
    console.log('Server closed')
  })

  wss.on('error', (err) => {
    console.error(err)
  })

  return wss
}
