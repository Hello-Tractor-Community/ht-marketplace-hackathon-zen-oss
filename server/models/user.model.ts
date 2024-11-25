import { Document, Schema, model, Types } from 'mongoose'

interface UserDoc extends Document {
  userType: 'Buyer' | 'Seller'
  userId: Types.ObjectId
  lastLogin: Date
}

const UserSchema: Schema = new Schema<UserDoc>(
  {
    userType: {
      type: String,
      enum: ['Buyer', 'Seller'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      refPath: 'userType',
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
)

const User = model<UserDoc>('User', UserSchema)

export default User
