export interface IServerResponse {
  status: 'success' | 'error'
  message: string
  data: any
}

type WsMessageType =
  | 'user.auth'
  | 'user.message'
  | 'user.balance'
  | 'auth.error'
  | 'pay.deposit'
  | 'pay.withdraw.code'
  | 'pay.withdraw.complete'

export interface WsMessageDataType {
  msg_type: WsMessageType
  msg_res: {
    status: 'success' | 'error'
    message: string
    data: any
  }
}

export interface SearchQuery {
  $or?: Array<{
    title?: RegExp
    description?: RegExp
  }>
  model?: RegExp
  description?: RegExp
  category?: string
  brand?: string
  horsePower?: number
  year?: number
  type?: string
  engineHours?: number
  price?: {
    $gte?: number
    $lte?: number
  }
}
