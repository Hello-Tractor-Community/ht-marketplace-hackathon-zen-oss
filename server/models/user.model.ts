import { Document, Schema, model, Types } from 'mongoose'

interface BuyerDoc extends Document {
    seller_id: Types.ObjectId
    buyer_id: Types.ObjectId
    lastLogin: Date
}

const UserSchema: Schema = new Schema<BuyerDoc>(
  {
      seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
      },
      buyer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
)

const User = model<BuyerDoc>('User', UserSchema)

export default User
