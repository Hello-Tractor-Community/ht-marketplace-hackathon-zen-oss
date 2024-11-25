import { useState } from 'react'
import { toast } from 'sonner'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMediaQuery } from '@/hooks/use-media-query'
import { DEFAULT_SLIDES } from '@/components/home/banner'

type ListingModalProps = {
	listing: (typeof DEFAULT_SLIDES)[0]
	children: React.ReactNode
}
export function ListingModal({ listing, children }: ListingModalProps) {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	let title = 'Edit profile'
	let description =
		"Make changes to your profile here. Click save when you're done."

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='font-manrope font-semibold'>
							{title}
						</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<ProfileForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle className='font-manrope font-semibold'>
						{title}
					</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				<ProfileForm className='px-4' />
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
	return (
		<form className={cn('grid items-start gap-4', className)}>
			<div className='grid gap-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					id='email'
					defaultValue='shadcn@example.com'
				/>
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='username'>Username</Label>
				<Input id='username' defaultValue='@shadcn' />
			</div>
			<Button type='submit' variant='outline'>
				Save changes
			</Button>
		</form>
	)
}

type UserDeleteProps = {
	listingId: string
	refreshTnxs: () => void
}

export function ConfirmListingDelete({
	listingId,
	refreshTnxs
}: UserDeleteProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleDeleteEmail() {
		setIsLoading(true)
		let response: any
		setIsLoading(false)

		if (!response) return
		refreshTnxs()
		toast.success(response.message)
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive' size='sm' className=''>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='font-manrope font-semibold'>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						remove this record from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex items-center '>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteEmail}
						className={cn(
							buttonVariants({
								variant: 'destructive',
								size: 'sm'
							})
						)}
					>
						{isLoading ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Continue'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
