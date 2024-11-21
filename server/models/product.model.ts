import { Document, Schema, model, Types } from 'mongoose'

interface ProductDoc extends Document {
  store_id: Types.ObjectId
  title: string
  description: string
  category: string
  images: string[]
  price: number
  shipping_options: string[]
  delivery_times: string[]
  costs: number
}

const ProductSchema: Schema = new Schema<ProductDoc>(
  {
    store_id: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      default: 0,
    },
    shipping_options: {
      type: [String],
      default: [],
    },
    delivery_times: {
      type: [String],
      default: [],
    },
    costs: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const Product = model<ProductDoc>('Product', ProductSchema)

export default Product
