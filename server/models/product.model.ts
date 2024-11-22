import { Schema, model, Types, Document } from 'mongoose'

interface ProductDoc extends Document {
  store_id: Types.ObjectId
  title: string
  description: string
  engine: {
    cylinder?: number
    capacity?: number
    cooling?: string
    PTO_hp?: number
    HP_Category?: string
    RPM?: number
    air_filter?: string
    torque?: number
  }
  transmission: {
    type?: string
    gear_box?: string
    reverse_speed?: string
    clutch?: string
    forward_speed?: string
  }
  brakes?: string
  steering?: string
  take_off: {
    type?: string
    RPM?: number
  }
  fuel_tank: {
    capacity?: string
  }
  dimensions: {
    weight?: string
    length?: string
    ground_clearance?: string
    wheel_base?: string
    width?: string
    turning_radius?: string
  }
  hydraulics: {
    lifting_capacity?: string
    linkage?: string
  }
  wheels: {
    wheel_drive?: string
    front?: string
    rear?: string
  }
  other_info?: string[]
  year?: string
  category?: string
  images?: string[]
  price?: number
  stock?: number
  shipping_options?: string[]
  delivery_times?: string[]
  costs?: number
  views?: number
}

const ProductSchema = new Schema<ProductDoc>(
  {
    store_id: { type: Schema.Types.ObjectId, ref: 'Store' },
    title: { type: String },
    description: { type: String },
    engine: {
      cylinder: { type: Number },
      capacity: { type: Number },
      cooling: { type: String },
      PTO_hp: { type: Number },
      HP_Category: { type: String },
      RPM: { type: Number },
      air_filter: { type: String },
      torque: { type: Number },
    },
    transmission: {
      type: { type: String },
      gear_box: { type: String },
      reverse_speed: { type: String },
      clutch: { type: String },
      forward_speed: { type: String },
    },
    brakes: { type: String },
    steering: { type: String },
    take_off: {
      type: { type: String },
      RPM: { type: Number },
    },
    fuel_tank: {
      capacity: { type: String },
    },
    dimensions: {
      weight: { type: String },
      length: { type: String },
      ground_clearance: { type: String },
      wheel_base: { type: String },
      width: { type: String },
      turning_radius: { type: String },
    },
    hydraulics: {
      lifting_capacity: { type: String },
      linkage: { type: String },
    },
    wheels: {
      wheel_drive: { type: String },
      front: { type: String },
      rear: { type: String },
    },
    other_info: { type: [String], default: [] },
    year: { type: String },
    category: { type: String },
    images: { type: [String], default: [] },
    price: { type: Number },
    stock: { type: Number },
    shipping_options: { type: [String], default: [] },
    delivery_times: { type: [String], default: [] },
    costs: { type: Number },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const Product = model<ProductDoc>('Product', ProductSchema)

export default Product
