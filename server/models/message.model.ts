import { Document, Schema, model, Types } from 'mongoose'

interface MessageDoc extends Document {
  conversation_id: Types.ObjectId
  content: string
  sender_id: Types.ObjectId
  recipient_id: Types.ObjectId
  isDelivered: boolean
}

const MessageSchema: Schema = new Schema<MessageDoc>(
  {
    conversation_id: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    content: {
      type: String,
    },
    recipient_id: {
      type: Schema.Types.ObjectId,
    },
    sender_id: {
      type: Schema.Types.ObjectId,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Message = model<MessageDoc>('Message', MessageSchema)

export default Message
