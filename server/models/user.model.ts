import { Document, Schema, model, Types } from 'mongoose'

export interface UserDoc extends Document {
  userType: 'Buyer' | 'Seller'
  userId: Types.ObjectId | IBuyer | ISeller
  lastLogin: Date
}

export interface IBuyer extends Document {
  name: string
  email: string
  phone: string
  password: string
}

export interface ISeller extends Document {
  name: string
  email: string
  phone: string
  password: string
  storeName: string
  storeDescription: string
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
