import { Document, Schema, model, Types } from 'mongoose'

interface StoreDoc extends Document {
  seller_id: Types.ObjectId
  name: string
  logos: string[]
  description: string
  contact: string
}

const StoreSchema: Schema = new Schema<StoreDoc>(
  {
      seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
      },
    name: {
      type: String,
      required: true,
    },
    logos: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    contact: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
)

const Store = model<StoreDoc>('Store', StoreSchema)

export default Store
