import { Schema, model, Types, Document } from 'mongoose'

interface ProductDoc extends Document {
  seller_id: Types.ObjectId
  modelName: string
  wheelDrive: string
  horsePower: number
  price: number
  engineHours: number
  description: string
  category: string
  cylinders: number
  engineRpm: number
  transmissionType: string
  clutchType: string
  gearboxType: string
  brakesType: string
  steeringType: string
  fuelTankCapacity: number
  liftingCapacity: number
  frontWheelSize: string
  rearWheelSize: string
  images: string[]
  views: number
}
const ProductSchema = new Schema<ProductDoc>(
  {
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    modelName: { type: String, default: '' },
    wheelDrive: { type: String, default: '' },
    horsePower: { type: Number },
    price: { type: Number },
    engineHours: { type: Number },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    cylinders: { type: Number },
    engineRpm: { type: Number },
    transmissionType: { type: String, default: '' },
    clutchType: { type: String, default: '' },
    gearboxType: { type: String, default: '' },
    brakesType: { type: String, default: '' },
    steeringType: { type: String, default: '' },
    fuelTankCapacity: { type: Number },
    frontWheelSize: { type: String, default: '' },
    rearWheelSize: { type: String, default: '' },
    images: { type: [String], default: [] },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const Product = model<ProductDoc>('Product', ProductSchema)

export default Product
