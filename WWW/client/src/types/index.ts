export type AdminRole = 'super' | 'admin'

export interface TractorFormData {
	model: string
	wheelDrive: string
	horsePower: string
	price: string
	engineHours: string
	description: string
	category: 'new' | 'used'
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
	images: File[]
}
