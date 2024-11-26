import { Schema, model, Types, Document } from 'mongoose'

interface ProductDoc extends Document {
	modelName: string
	wheelDrive: string
	horsePower: string
	price: string
	engineHours: string
	description: string
	category: string
	cylinders: string
	engineRpm: string
	transmissionType: string
	clutchType: string
	gearboxType: string
	brakesType: string
	steeringType: string
	fuelTankCapacity: string
	liftingCapacity: string
	frontWheelSize: string
	rearWheelSize: string
	images: string[]
}
const ProductSchema = new Schema<ProductDoc>({
    modelName: { type: String, required: true },
    wheelDrive: { type: String, required: true },
    horsePower: { type: String, required: true },
    price: { type: String, required: true },
    engineHours: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    cylinders: { type: String, required: true },
    engineRpm: { type: String, required: true },
    transmissionType: { type: String, required: true },
    clutchType: { type: String, required: true },
    gearboxType: { type: String, required: true },
    brakesType: { type: String, required: true },
    steeringType: { type: String, required: true },
    fuelTankCapacity: { type: String, required: true },
    frontWheelSize: { type: String, required: true },
    rearWheelSize: { type: String, required: true },
    images: { type: [String], required: true },
}, { timestamps: true })

const Product = model<ProductDoc>('Product', ProductSchema)

export default Product
