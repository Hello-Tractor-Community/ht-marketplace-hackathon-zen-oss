import { toast } from 'sonner'
import { apiBase } from '@/lib/config'

interface ICreateProduct {
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
	images: string[]
}
// Create a new tractor
// @route POST /api/v1/product
export const createProduct = async (body: ICreateProduct) => {
	try {
		const response = await apiBase.post('/product', body)
		return response.data
	} catch (error: any) {
		toast.error(error.response.data.message)
	}
}

interface IGetAllProducts {
	page: number
	limit: number
}
// Get all products
// @route GET /api/v1/product/all/?page=1&limit=10
export const getAllProducts = async ({
	page = 1,
	limit = 10
}: IGetAllProducts) => {
	try {
		const response = await apiBase.get(
			`/product/all?page=${page}&limit=${limit}`
		)
		return response.data
	} catch (error: any) {
		toast.error(error.response.data.message)
	}
}

interface IFilterProducts {
	userQuery: string
	type: string
	brand: string
	minHorsePower: number
	maxHorsePower: number
	year: number
	minEngineHours: number
	maxEngineHours: number
	minPrice: number
	maxPrice: number
	page: number
	limit: number
	sortBy: string
	sortOrder: string
}
// Filter products
// @route GET /api/v1/product/filter?search=product&category=category&brand=brand&horsePower=hp&year=year&engineHours=engineHours&minPrice=minPrice&maxPrice=maxPrice&page=1&limit=10&sortBy=createdAt&sortOrder=desc
export const filterProducts = async ({
    userQuery,
    type,
    brand,
    minHorsePower,
    maxHorsePower,
    minEngineHours,
    maxEngineHours,
	minPrice,
	maxPrice,
	page = 1,
	limit = 10,
	sortBy = 'createdAt',
	sortOrder = 'desc'
}: IFilterProducts) => {
	try {
		const response = await apiBase.get(
			`/product/filter?userQuery=${userQuery}&type=${type}&brand=${brand}&minHorsePower=${minHorsePower}&maxHorsePower=${maxHorsePower}&minEngineHours=${minEngineHours}&maxEngineHours=${maxEngineHours}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
		)
		return response.data
	} catch (error: any) {
		toast.error(error.response.data.message)
	}
}

interface IGetProduct {
	id: string
}
// Get details of a particular product
// @route GET /api/v1/product/?id=product_id
export const getProduct = async ({ id }: IGetProduct) => {
	try {
		const response = await apiBase.get(`/product?id=${id}`)
		return response.data
	} catch (error: any) {
		toast.error(error.response.data.message)
	}
}

interface IUpdateProduct {
    id: string
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
    imagesToAdd: string[]
    imagesToDelete: string[]
}
// Update a product
// @route PUT /api/v1/product/?id=product_id
export const updateProduct = async ({ id, ...body }: IUpdateProduct) => {
	try {
		const response = await apiBase.put(`/product?id=${id}`, body)
		return response.data
	} catch (error: any) {
		toast.error(error.response.data.message)
	}
}


interface IDeleteProduct {
    id: string
}
// Delete a product
// @route DELETE /api/v1/product/?id=product_id
export const deleteProduct = async ({ id }: IDeleteProduct) => {
    try {
        const response = await apiBase.delete(`/product?id=${id}`)
        return response.data
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}
