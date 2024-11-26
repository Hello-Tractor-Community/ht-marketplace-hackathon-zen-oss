import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { TractorIcon, Upload, X } from 'lucide-react'
import { TractorFormData } from '@/types'

interface StepProps {
	formData: TractorFormData
	setFormData: (data: TractorFormData) => void
}

export const StepOne = ({ formData, setFormData }: StepProps) => {
	const formSchema = z.object({
		model: z.string().min(2, 'Model must be at least 2 characters'),
		wheelDrive: z.string().min(1, 'Wheel drive is required'),
		horsePower: z.string().min(1, 'Horse power is required'),
		price: z.string().min(1, 'Price is required'),
		category: z.enum(['new', 'used'])
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			model: formData.model,
			wheelDrive: formData.wheelDrive,
			horsePower: formData.horsePower,
			price: formData.price,
			category: formData.category as 'new' | 'used'
		}
	})

	return (
		<Card className='rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='mb-6 flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Basic Information
				</h2>
			</div>

			<Form {...form}>
				<form className='space-y-6'>
					<FormField
						control={form.control}
						name='model'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tractor Model</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter tractor model'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='wheelDrive'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Wheel Drive</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select wheel drive type' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='2WD'>2WD</SelectItem>
										<SelectItem value='4WD'>4WD</SelectItem>
										<SelectItem value='AWD'>AWD</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='horsePower'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Horse Power</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='HP'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter price'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='new'>New</SelectItem>
										<SelectItem value='used'>
											Used
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</Card>
	)
}

export const StepTwo = ({ formData, setFormData }: StepProps) => {
	const formSchema = z.object({
		engineHours: z.string().min(1, 'Engine hours is required'),
		cylinders: z.string().min(1, 'Number of cylinders is required'),
		engineRpm: z.string().min(1, 'Engine RPM is required')
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			engineHours: formData.engineHours,
			cylinders: formData.cylinders,
			engineRpm: formData.engineRpm
		}
	})

	return (
		<Card className='rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='mb-6 flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Engine Details
				</h2>
			</div>

			<Form {...form}>
				<form className='space-y-6'>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='engineHours'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Engine Hours</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter engine hours'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='cylinders'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of Cylinders</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter number of cylinders'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='engineRpm'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Engine RPM</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Enter engine RPM'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</Card>
	)
}

export const StepThree = ({ formData, setFormData }: StepProps) => {
	const formSchema = z.object({
		transmissionType: z.string().min(1, 'Transmission type is required'),
		clutchType: z.string().min(1, 'Clutch type is required'),
		gearboxType: z.string().min(1, 'Gearbox type is required'),
		brakesType: z.string().min(1, 'Brakes type is required'),
		steeringType: z.string().min(1, 'Steering type is required')
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			transmissionType: formData.transmissionType,
			clutchType: formData.clutchType,
			gearboxType: formData.gearboxType,
			brakesType: formData.brakesType,
			steeringType: formData.steeringType
		}
	})

	return (
		<Card className='rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='mb-6 flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Mechanical Details
				</h2>
			</div>

			<Form {...form}>
				<form className='space-y-6'>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='transmissionType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transmission Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select transmission type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='manual'>
												Manual
											</SelectItem>
											<SelectItem value='automatic'>
												Automatic
											</SelectItem>
											<SelectItem value='powerShift'>
												Power Shift
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='clutchType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Clutch Type</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter clutch type'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='gearboxType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gearbox Type</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter gearbox type'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='brakesType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Brakes Type</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter brakes type'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='steeringType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Steering Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select steering type' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='power'>
											Power
										</SelectItem>
										<SelectItem value='hydraulic'>
											Hydraulic
										</SelectItem>
										<SelectItem value='manual'>
											Manual
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</Card>
	)
}

export const StepFour = ({ formData, setFormData }: StepProps) => {
	const formSchema = z.object({
		fuelTankCapacity: z.string().min(1, 'Fuel tank capacity is required'),
		liftingCapacity: z.string().min(1, 'Lifting capacity is required'),
		frontWheelSize: z.string().min(1, 'Front wheel size is required'),
		rearWheelSize: z.string().min(1, 'Rear wheel size is required'),
		description: z
			.string()
			.min(10, 'Description must be at least 10 characters')
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fuelTankCapacity: formData.fuelTankCapacity,
			liftingCapacity: formData.liftingCapacity,
			frontWheelSize: formData.frontWheelSize,
			rearWheelSize: formData.rearWheelSize,
			description: formData.description
		}
	})

	return (
		<Card className='rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='mb-6 flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Specifications
				</h2>
			</div>

			<Form {...form}>
				<form className='space-y-6'>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='fuelTankCapacity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Fuel Tank Capacity (L)
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter fuel tank capacity'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='liftingCapacity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lifting Capacity (kg)</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter lifting capacity'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='frontWheelSize'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Front Wheel Size</FormLabel>
									<FormControl>
										<Input
											placeholder='e.g., 6.00-16'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='rearWheelSize'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rear Wheel Size</FormLabel>
									<FormControl>
										<Input
											placeholder='e.g., 13.6-28'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter detailed description of the tractor'
										className='min-h-[100px]'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</Card>
	)
}

export const StepFive = ({ formData, setFormData }: StepProps) => {
	const [previewUrls, setPreviewUrls] = useState<string[]>([])
	const [files, setFiles] = useState<File[]>([])

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files || [])
		const totalFiles = [...files, ...newFiles]

		if (totalFiles.length > 5) {
			alert('You can only upload up to 5 images')
			return
		}

		const newUrls = newFiles.map((file) => URL.createObjectURL(file))
		setFiles(totalFiles)
		setPreviewUrls([...previewUrls, ...newUrls])
		setFormData({ ...formData, images: totalFiles })
	}

	const removeImage = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index)
		const newUrls = previewUrls.filter((_, i) => i !== index)

		URL.revokeObjectURL(previewUrls[index])

		setFiles(newFiles)
		setPreviewUrls(newUrls)
		setFormData({ ...formData, images: newFiles })
	}

	useEffect(() => {
		return () => {
			previewUrls.forEach((url) => URL.revokeObjectURL(url))
		}
	}, [])

	return (
		<Card className='rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='mb-6 flex items-center gap-2'>
				<Upload className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Upload Images
				</h2>
			</div>

			<div className='space-y-4'>
				<div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
					<input
						type='file'
						multiple
						accept='image/*'
						onChange={handleImageUpload}
						className='hidden'
						id='image-upload'
						max='5'
					/>
					<label
						htmlFor='image-upload'
						className='flex cursor-pointer flex-col items-center'
					>
						<Upload className='mb-2 h-12 w-12 text-gray-400' />
						<p className='text-sm text-gray-600'>
							Click to upload images (max 5)
						</p>
						<p className='mt-1 text-xs text-gray-500'>
							{files.length}/5 images uploaded
						</p>
					</label>
				</div>

				{previewUrls.length > 0 && (
					<div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-3'>
						{previewUrls.map((url, index) => (
							<div key={index} className='group relative'>
								<div className='aspect-square overflow-hidden rounded-lg'>
									<img
										src={url}
										alt={`Preview ${index + 1}`}
										className='h-full w-full object-cover transition-transform group-hover:scale-105'
									/>
								</div>
								<button
									onClick={() => removeImage(index)}
									className='absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100'
									type='button'
								>
									<X className='h-4 w-4' />
								</button>
								<div className='absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white'>
									{(
										files[index].size /
										(1024 * 1024)
									).toFixed(1)}{' '}
									MB
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Card>
	)
}
