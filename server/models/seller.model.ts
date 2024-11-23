import { Document, Schema, model } from 'mongoose'

interface SellerDoc extends Document {
  name:string
  email: string
  phone: string[]
  password: string
  sessionInfo: string | null
  companyDetails: string[]
  isVerified: boolean
  lastLogin: Date
}

const SellerSchema: Schema = new Schema<SellerDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: [String],
      default: [],
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
    sessionInfo: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
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
