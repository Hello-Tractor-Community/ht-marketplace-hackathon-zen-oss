import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { TractorFormData } from '@/types'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { TRACTOR_MODELS } from '@/constants/tractors'
import { UploadButton, UploadDropzone } from '@/lib/upload'
import { ChevronDown, TractorIcon, Upload, X } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface StepProps {
	formData: TractorFormData
	setFormData: (data: TractorFormData) => void
}

export const StepOne = ({ formData, setFormData }: StepProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Card className='flex flex-col gap-4 rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Basic Information
				</h2>
			</div>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger>
					<div className='flex w-fit items-center gap-1 rounded-full border border-gray-200 bg-slate-100 p-2 px-4 font-manrope'>
						<span className='text-xs capitalize'>
							{formData.model || 'Select tractor model'}
						</span>
						<ChevronDown className='h-4 w-4' />
					</div>
				</PopoverTrigger>
				<PopoverContent className='p-0' side='bottom' align='start'>
					<Command>
						<CommandInput placeholder='Change status...' />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{Object.keys(TRACTOR_MODELS).map(
									(tractor, i) => (
										<CommandItem
											key={'tractor-m' + i}
											value={tractor}
											onSelect={(value) => {
												formData.model = value
												setOpen(false)
											}}
											className='cursor-pointer'
										>
											<span>{tractor}</span>
										</CommandItem>
									)
								)}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			<div className='space-y-2'>
				<Label htmlFor='wheelDrive'>Wheel Drive</Label>
				<Select
					value={formData.wheelDrive}
					onValueChange={(value) =>
						setFormData({ ...formData, wheelDrive: value })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select wheel drive type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='2WD'>2WD</SelectItem>
						<SelectItem value='4WD'>4WD</SelectItem>
						<SelectItem value='AWD'>AWD</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label htmlFor='horsePower'>Horse Power</Label>
					<Input
						id='horsePower'
						type='number'
						value={formData.horsePower}
						onChange={(e) =>
							setFormData({
								...formData,
								horsePower: e.target.value
							})
						}
						placeholder='Enter horse power'
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='price'>Price</Label>
					<Input
						id='price'
						type='number'
						value={formData.price}
						onChange={(e) =>
							setFormData({
								...formData,
								price: e.target.value
							})
						}
						placeholder='Enter price'
					/>
				</div>
			</div>

			<RadioGroup
				defaultValue='new'
				onValueChange={(value: 'new' | 'used') => {
					setFormData({ ...formData, category: value })
				}}
				className='mt-2 flex'
			>
				<div className='flex items-center space-x-2'>
					<RadioGroupItem value='new' id='new' />
					<Label htmlFor='new'>New Tractor</Label>
				</div>
				<div className='flex items-center space-x-2'>
					<RadioGroupItem value='used' id='used' />
					<Label htmlFor='used'>Used Tractor</Label>
				</div>
			</RadioGroup>
		</Card>
	)
}

export const StepTwo = ({ formData, setFormData }: StepProps) => {
	return (
		<Card className='flex flex-col gap-4 rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='space-y-2'>
				<Label htmlFor='engineHours'>Engine Hours</Label>
				<Input
					id='engineHours'
					type='number'
					value={formData.engineHours}
					onChange={(e) =>
						setFormData({
							...formData,
							engineHours: e.target.value
						})
					}
					placeholder='Enter engine hours'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='cylinders'>Number of Cylinders</Label>
				<Input
					id='cylinders'
					type='number'
					value={formData.cylinders}
					onChange={(e) => {
						setFormData({
							...formData,
							cylinders: e.target.value
						})
					}}
					placeholder='Enter number of cylinders'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='engineRpm'>Engine RPM</Label>
				<Input
					id='engineRpm'
					type='number'
					value={formData.engineRpm}
					onChange={(e) => {
						setFormData({
							...formData,
							engineRpm: e.target.value
						})
					}}
					placeholder='Enter engine RPM'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='fuelTankCapacity'>Fuel Tank Capacity (L)</Label>
				<Input
					id='fuelTankCapacity'
					type='number'
					value={formData.fuelTankCapacity}
					onChange={(e) =>
						setFormData({
							...formData,
							fuelTankCapacity: e.target.value
						})
					}
					placeholder='Enter fuel tank capacity'
				/>
			</div>
		</Card>
	)
}

export const StepThree = ({ formData, setFormData }: StepProps) => {
	return (
		<Card className='flex flex-col gap-4 rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Mechanical Details
				</h2>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='transmissionType'>Transmission Type</Label>
				<Input
					id='transmissionType'
					value={formData.transmissionType}
					onChange={(e) =>
						setFormData({
							...formData,
							transmissionType: e.target.value
						})
					}
					placeholder='Enter transmission type'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='clutchType'>Clutch Type</Label>
				<Input
					id='clutchType'
					value={formData.clutchType}
					onChange={(e) => {
						setFormData({
							...formData,
							clutchType: e.target.value
						})
					}}
					placeholder='Enter clutch type'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='gearboxType'>Gearbox Type</Label>
				<Input
					id='gearboxType'
					value={formData.gearboxType}
					onChange={(e) =>
						setFormData({
							...formData,
							gearboxType: e.target.value
						})
					}
					placeholder='Enter gearbox type'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='brakesType'>Brakes Type</Label>
				<Input
					id='brakesType'
					value={formData.brakesType}
					onChange={(e) => {
						setFormData({
							...formData,
							brakesType: e.target.value
						})
					}}
					placeholder='Enter brakes type'
				/>
			</div>
		</Card>
	)
}

export const StepFour = ({ formData, setFormData }: StepProps) => {
	return (
		<Card className='flex flex-col gap-4 rounded-none border-4 border-gray-200 p-6 shadow-none'>
			<div className='flex items-center gap-2'>
				<TractorIcon className='h-6 w-6' />
				<h2 className='font-manrope text-2xl font-semibold'>
					Specifications
				</h2>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='steeringType'>Steering Type</Label>
				<Input
					id='steeringType'
					value={formData.steeringType}
					onChange={(e) =>
						setFormData({
							...formData,
							steeringType: e.target.value
						})
					}
					placeholder='Enter steering type'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='liftingCapacity'>Lifting Capacity (kg)</Label>
				<Input
					id='liftingCapacity'
					type='number'
					value={formData.liftingCapacity}
					onChange={(e) =>
						setFormData({
							...formData,
							liftingCapacity: e.target.value
						})
					}
					placeholder='Enter lifting capacity'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='frontWheelSize'>Front Wheel Size</Label>
				<Input
					id='frontWheelSize'
					value={formData.frontWheelSize}
					onChange={(e) =>
						setFormData({
							...formData,
							frontWheelSize: e.target.value
						})
					}
					placeholder='Enter front wheel size'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='rearWheelSize'>Rear Wheel Size</Label>
				<Input
					id='rearWheelSize'
					value={formData.rearWheelSize}
					onChange={(e) =>
						setFormData({
							...formData,
							rearWheelSize: e.target.value
						})
					}
					placeholder='Enter rear wheel size'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					id='description'
					value={formData.description}
					onChange={(e) =>
						setFormData({
							...formData,
							description: e.target.value
						})
					}
					placeholder='Enter detailed description'
					rows={4}
				/>
			</div>
		</Card>
	)
}

interface Step5Props {
	formData: TractorFormData
	setFormData: (data: TractorFormData) => void
	submit: () => void
}

export const StepFive = ({ formData, setFormData, submit }: Step5Props) => {
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

			<div className='hidden'>
				<UploadDropzone
					endpoint='tractorImageUploader'
					onClientUploadComplete={(res) => {
						// Do something with the response
						console.log('Files: ', res)
						alert('Upload Completed')
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`)
					}}
				/>
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

			<Button onClick={submit} size='lg' className='mt-6'>
				Submit
			</Button>
		</Card>
	)
}
