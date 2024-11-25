import { Document, Schema, model, Types } from 'mongoose'

interface ConversationDoc extends Document {
    messages: Types.Array<Types.ObjectId>
    starter: Types.ObjectId
    recipient: Types.ObjectId
    newMsg: boolean
}

const ConversationSchema: Schema = new Schema<ConversationDoc>(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    starter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    newMsg: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Conversation = model<ConversationDoc>('Conversation', ConversationSchema)

export default Conversation
