import { Document, Schema, model, Types } from 'mongoose'

interface MessageDoc extends Document {
  conversation_id: Types.ObjectId
  senderRole: 'buyer' | 'seller'
  sender_id: Types.ObjectId
  receiver_id: Types.ObjectId
  content: string
  isRead: boolean
}

const MessageSchema: Schema = new Schema<MessageDoc>(
  {
    conversation_id: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      index: true,
    },
    senderRole: {
      type: String,
      enum: ['buyer', 'seller'],
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      refPath: 'senderRole',
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      refPath: 'senderRole',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Message = model<MessageDoc>('Message', MessageSchema)

export default Message
