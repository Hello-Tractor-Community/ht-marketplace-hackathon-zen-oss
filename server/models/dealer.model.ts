import { Document, Schema, model } from 'mongoose'

interface Location {
  type: 'Point'
  coordinates: [number, number]
}

interface DealerDoc extends Document {
  dealer_type: string
  phone: string[]
  address: string
  location: Location
}

const DealerSchema: Schema = new Schema<DealerDoc>(
  {
    dealer_type: {
      type: String,
      required: true,
    },
    phone: {
      type: [String],
      default: [],
      required: true,
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
  },
  { timestamps: true },
)

DealerSchema.index({ location: '2dsphere' })

const Dealer = model<DealerDoc>('Dealer', DealerSchema)

export default Dealer
