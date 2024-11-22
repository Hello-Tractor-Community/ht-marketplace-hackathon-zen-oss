import { Document, Schema, model } from 'mongoose'

interface BuyerDoc extends Document {
  name: string
  email: string
  phone: string
  password: string
  lastLogin: Date
}

const BuyerSchema: Schema = new Schema<BuyerDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      default: '',
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
)

const Buyer = model<BuyerDoc>('Buyer', BuyerSchema)

export default Buyer
