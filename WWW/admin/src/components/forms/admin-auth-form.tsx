'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAdminStore } from '@/store/admin-store'
import { adminAuthSchema } from '@/lib/auth'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof adminAuthSchema>

export function AdminSignInAuthForm({ className, ...props }: UserAuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(adminAuthSchema)
	})
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const setDetails = useAdminStore((state) => state.setDetails)
	const router = useRouter()

	async function onSubmit(data: FormData) {
		setIsLoading(true)

	    let result :any //TODO

		setIsLoading(false)

		if (!result) return

		const { name, email, role} =
			result.data
		toast.success('Login successful')

		// Set global user state
		setDetails({
			name,
			email,
			role,
		})

		router.push('/')
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='Enter your email'
							type='email'
							className='focus-visible:ring-stone-200'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							{...register('email')}
						/>
						{errors?.email && (
							<p className='px-1 text-xs text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>

					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='password'>
							Password
						</Label>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							className='focus-visible:ring-stone-200'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							{...register('password')}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>

					<button
						className={cn(buttonVariants({ variant: 'outline' }))}
						disabled={isLoading}
					>
						{isLoading ? <p>Loading ....</p> : 'Login'}
					</button>
				</div>
			</form>
		</div>
	)
}
