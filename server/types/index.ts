export interface IServerResponse {
  status: 'success' | 'error'
  message: string
  data: any
}

type WsMessageType =
  | 'user.auth'
  | 'user.acct'
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

export interface SearchTractorQuery {
  $or?: Array<{
    title?: RegExp
    description?: RegExp
  }>
  title?: RegExp
  description?: RegExp
  category?: string
  price?: {
    $gte?: number
    $lte?: number
  }
  shipping_options?: string
  delivery_times?: {
    $lte?: number
  }
  costs?: {
    $gte?: number
    $lte?: number
  }
}
