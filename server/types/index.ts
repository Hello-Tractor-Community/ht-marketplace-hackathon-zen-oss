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
    modelName?: RegExp
    description?: RegExp
  }>
  modelName?: RegExp
  description?: RegExp
  category?: string
  brand?: string
  horsePower?:{
    $gte?: number
    $lte?: number
  }
  year?: number
  type?: string
  engineHours?:{

    $gte?: number
    $lte?: number
  }
  price?: {
    $gte?: number
    $lte?: number
  }
}
