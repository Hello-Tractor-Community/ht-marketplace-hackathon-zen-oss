import { Document, Schema, model, Types } from 'mongoose'

interface ConversationDoc extends Document {
    participants: {
        buyer_id: Types.ObjectId
        seller_id: Types.ObjectId
    }
    lastMessage: string
}

const ConversationSchema: Schema = new Schema<ConversationDoc>(
  {
      participants: {
          buyer_id: {
              type: Schema.Types.ObjectId,
              ref: 'Buyer',
          },
          seller_id: {
              type: Schema.Types.ObjectId,
              ref: 'Seller',
          }
      },
      lastMessage: {
          type: String,
          default: '',
      }
  },
  { timestamps: true },
)

const Conversation = model<ConversationDoc>('Conversation', ConversationSchema)

export default Conversation
