import { Document, Schema, model } from 'mongoose'

interface SellerDoc extends Document {
  name: string
  email: string
  phone: string
  password: string
  companyDetails: string[]
  lastLogin: Date
}

const SellerSchema: Schema = new Schema<SellerDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
      required: true,
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
    companyDetails: {
      type: [String],
      default: [],
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
)

const Seller = model<SellerDoc>('Seller', SellerSchema)

export default Seller
