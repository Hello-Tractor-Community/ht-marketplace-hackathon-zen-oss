import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function BuyerAccountSettings() {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div>
			<h1 className='py-2 font-manrope text-2xl font-medium'>
				Account Settings
			</h1>
			<div className='mt-2 overflow-hidden rounded-xl border-4 border-gray-200 bg-white  py-8 sm:px-8'>
				<p className='py-2 font-manrope text-xl font-semibold'>
					Email Address
				</p>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
					<p className='font-sans text-gray-600'>
						Your email address is{' '}
						<strong>john.doe@company.com</strong>
					</p>
				</div>

				<Separator className='my-4' />

				<p className='font-manrope text-xl font-semibold'>Password</p>
				<div className='mt-4 flex'>
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
				<Button variant='outline' className='my-4'>
					Save Password
				</Button>
			</div>
		</div>
	)
}
