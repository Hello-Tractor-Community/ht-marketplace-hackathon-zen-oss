import { Document, Schema, model, Types } from 'mongoose'

interface ReviewsDoc extends Document {
  product_id: Types.ObjectId
  buyer_id: Types.ObjectId
  title: string
  description: string
  rating: number
  response: string
}

const ReviewsSchema: Schema = new Schema<ReviewsDoc>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    response: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
)

const Reviews = model<ReviewsDoc>('Reviews', ReviewsSchema)

export default Reviews
