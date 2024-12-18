import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { Heart, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const tractors = [
	{
		model: 'Sonalika DI-35',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-35-removebg-preview.png'
	},
	{
		model: 'Case IH JX90',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/Case_IH_JX90.png'
	},
	{
		model: 'John Deere 6095B',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/6095B-removebg-preview.png'
	},
	{
		model: 'Sonalika DI-75',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-75-removebg-preview.png'
	},
	{
		model: 'John Deere 6XXXB OOS',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/JD_6XXXB_OOS.png'
	}
]

export function UserWishlist() {
	const [isOpened, setIsOpened] = useState(false)
	const [wishlist, setWishlist] = useState(tractors)
	const router = useRouter()

	async function removeFromWishlist(index: number, name: string) {
		const updatedWishlist = wishlist.filter((_, i) => i !== index)
		setWishlist(updatedWishlist)
		toast.success(`${name} has been removed from your wishlist`)
	}

	function handleOpenProduct() {
		router.push('/tractor')

		setIsOpened(false)
	}

	return (
		<Sheet open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
			<SheetTrigger>
				<div className='hidden 2xl:flex cursor-pointer flex-col items-center hover:opacity-80'>
					<Heart />
					<p className='text-sm'>Wishlist</p>
				</div>
			</SheetTrigger>
			<SheetContent className='flex flex-col bg-white'>
				<SheetHeader className='font-manrope'>
					<SheetTitle>Your Wishlist</SheetTitle>
					<SheetDescription>
						Find all your favorite tractors here
					</SheetDescription>
				</SheetHeader>

				<div className='mt-6 flex flex-1 flex-col gap-3 overflow-y-auto'>
					{wishlist.map((tractor, index) => (
						<div
							key={index}
							className='flex items-center justify-between rounded-md border p-2 hover:bg-slate-50'
						>
							<div className='flex items-center gap-2'>
								<Image
									width={90}
									height={90}
									src={tractor.tractor_model_logo_url}
									alt={tractor.model}
								/>
							</div>

							<div className='flex max-w-[50%] flex-col'>
								<p
									onClick={handleOpenProduct}
									className='line-clamp-3 cursor-pointer text-sm underline-offset-2 hover:underline'
								>
									{tractor.model}
								</p>
								<p className='line-clamp-2 text-xs text-muted-foreground'>
									The tractor you've been looking for a long
									time has a description here
								</p>
							</div>

							<Button
								variant='outline'
								size='sm'
								onClick={() =>
									removeFromWishlist(index, tractor.model)
								}
							>
								<Trash />
							</Button>
						</div>
					))}
				</div>
				<SheetFooter>
					<p className='w-full text-center text-xs text-muted-foreground'>
						Hello Tractor &copy; 2024. All rights reserved.
					</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
