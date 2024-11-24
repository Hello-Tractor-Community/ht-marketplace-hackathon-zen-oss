'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Page() {
	return (
		<section className='container mb-12 mt-6 h-fit lg:px-24'>
			<h2 className=''>
				Hello there,&nbsp;
				<span className='font-manrope font-semibold'>
					Branson &#128075;
				</span>
			</h2>

			<Tabs defaultValue='account' className='mt-4 w-full'>
				<TabsList className='gap-4'>
					<TabsTrigger value='account' className='text-base'>
						Account
					</TabsTrigger>
					<TabsTrigger value='wishlist' className='text-base'>
						Wishlist
					</TabsTrigger>
					<TabsTrigger value='chats' className='text-base'>
						Chats
					</TabsTrigger>
				</TabsList>

				<TabsContent value='account'>
					<Account />
				</TabsContent>
				<TabsContent value='wishlist'>
					<Wishlist />
				</TabsContent>
				<TabsContent value='chats'>
					<Chats />
				</TabsContent>
			</Tabs>
		</section>
	)
}

const Account = () => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className='mt-4 overflow-hidden rounded-xl border-2 border-gray-200  bg-white sm:px-8'>
			<div className='pt-4'>
				<h1 className='py-2 font-manrope text-2xl font-semibold'>
					Account settings
				</h1>
			</div>

			<Separator className='my-4' />

			<p className='py-2 font-manrope text-xl font-semibold'>
				Email Address
			</p>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
				<p className='font-sans text-gray-600'>
					Your email address is <strong>john.doe@company.com</strong>
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
			<Button variant='outline' className='mb-8 mt-4'>
				Save Password
			</Button>
		</div>
	)
}

const Wishlist = () => {
	return <div className='mt-4'>Hello From Wishlist</div>
}

const Chats = () => {
	return <div className='mt-4'>Hello From Chats</div>
}
