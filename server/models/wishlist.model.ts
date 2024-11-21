import { Document, Schema, model, Types } from 'mongoose'

interface WishlistDoc extends Document {
  product_id: Types.ObjectId
  buyer_id: Types.ObjectId
}

const WishlistSchema: Schema = new Schema<WishlistDoc>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
  },
  { timestamps: true },
)

const Wishlist = model<WishlistDoc>('Wishlist', WishlistSchema)

export default Wishlist
