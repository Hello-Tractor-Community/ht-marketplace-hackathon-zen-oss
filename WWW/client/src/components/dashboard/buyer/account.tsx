import { useEffect, useState } from 'react'
import { Eye, EyeOff, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useUserStore } from '@/store/user-store'

export default function BuyerAccountSettings() {
	const [showPassword, setShowPassword] = useState(false)
	const { name, role, email, bio, location } = useUserStore((state) => state)
	const [isSeller, setIsSeller] = useState(false)
	const [formData, setFormData] = useState({
		name,
		email,
		location,
		bio,
		currentPassword: '',
		newPassword: '',
		profilePhoto:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	})

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData((prev) => ({
					...prev,
					profilePhoto: reader.result as string
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		if (role === 'seller') {
			setIsSeller(true)
		} else {
			setIsSeller(false)
		}
	}, [])

	return (
		<div>
			<h1 className='py-2 font-manrope text-2xl font-medium'>
				Account Settings
			</h1>
			<div className='mt-2 flex flex-col items-center overflow-hidden  rounded-xl border-4 border-gray-200 bg-white px-4 py-8  sm:px-8 md:items-start'>
				<div className='relative inline-block'>
					<img
						src={formData.profilePhoto}
						alt='Profile'
						className='h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg'
					/>
					<label className='group/pic absolute bottom-0 right-0 cursor-pointer rounded-full border border-transparent bg-white p-2 shadow-lg hover:border-gray-200'>
						<Pencil className='h-5 w-5 text-gray-600 group-hover/pic:text-htractor-hibiscus' />
						<input
							type='file'
							className='hidden'
							accept='image/*'
							onChange={handlePhotoChange}
						/>
					</label>
				</div>
				<p className='py-2 font-manrope text-xl font-semibold'>
					Email Address
				</p>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
					<p className='font-sans text-gray-600'>
						Your email address is{' '}
						<strong>john.doe@company.com</strong>
					</p>
				</div>

				{isSeller && (
					<div className=''>
						<Separator className='my-4' />
						<p className='font-manrope text-xl font-semibold'>
							Location
						</p>

						<div className='mt-4 flex'>
							<div className='flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0'>
								<Label htmlFor='login-password'>
									<span className='text-sm text-gray-500'>
										Seller Location
									</span>
									<Input
										type='text'
										value={formData.name}
										className='mt-1 w-[300px]'
									/>
								</Label>
							</div>
						</div>
					</div>
				)}

				<div className=''>
					<Separator className='my-4' />
					<p className='font-manrope text-xl font-semibold'>Name</p>

					<div className='mt-4 flex'>
						<div className='flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0'>
							<Label htmlFor='login-password'>
								<span className='text-sm text-gray-500'>
									First Name
								</span>
								<Input
									type='text'
									value={formData.name}
									className='mt-1 w-[300px]'
								/>
							</Label>
							<Label htmlFor='login-password'>
								<span className='text-sm text-gray-500'>
									Last Name
								</span>
								<Input
									type='text'
									value={formData.name}
									className='mt-1 w-[300px]'
								/>
							</Label>
						</div>
					</div>
				</div>

				{isSeller && (
					<div className=''>
						<Separator className='my-4' />

						<p className='font-manrope text-xl font-semibold'>
							Seller Bio
						</p>

						<div className='mt-4 flex'>
							<div className='flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0'>
								<Label htmlFor='login-password'>
									<span className='text-sm text-gray-500'>
										Bio
									</span>
									<Textarea
										value={formData.name}
										cols={80}
										rows={8}
										className='mt-1'
									/>
								</Label>
							</div>
						</div>
					</div>
				)}

				<Separator className='my-4' />

				<p className='w-full font-manrope text-xl font-semibold'>
					Password
				</p>

				<div className='mt-4 flex flex-col px-4 md:flex-row md:px-0'>
					<div className='flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0'>
						<Label htmlFor='login-password'>
							<span className='text-sm text-gray-500'>
								Current Password
							</span>
							<Input
								placeholder='***********'
								type={showPassword ? 'text' : 'password'}
								className='mt-1 w-[300px]'
							/>
						</Label>
						<Label htmlFor='login-password'>
							<span className='text-sm text-gray-500'>
								New Password
							</span>
							<Input
								placeholder='***********'
								type={showPassword ? 'text' : 'password'}
								className='mt-1 w-[300px]'
							/>
						</Label>
					</div>

					<div
						onClick={() => setShowPassword(!showPassword)}
						className='mb-2 ml-2 mt-auto h-full cursor-pointer hover:opacity-80 active:opacity-100'
					>
						{showPassword ? <EyeOff /> : <Eye />}
					</div>
				</div>
				<p className='mt-4'>
					Can't remember your current password.&nbsp;
					<Button
						variant='link'
						className='text-sm font-[500] text-blue-600 underline decoration-2'
					>
						Recover Account
					</Button>
				</p>
				<Button variant='outline' className='my-4 mr-auto'>
					Save Password
				</Button>
			</div>
		</div>
	)
}
