import { Document, Schema, model } from 'mongoose'

interface Location {
  type: 'Point'
  coordinates: [number, number]
}
interface SellerDoc extends Document {
  name: string
  email: string
  phone: string[]
  password: string
  companyDetails: string[]
  bio: string
  address: string
  location: Location
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
    address: {
      type: String,
      default: '',
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number],
      },
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
