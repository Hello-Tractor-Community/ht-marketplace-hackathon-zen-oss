'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Page() {
	return (
		<section className='container mb-12 mt-4 h-fit lg:px-24'>
			<h2 className=''>
				Hello there,&nbsp;
				<span className='font-manrope font-semibold'>
					Branson &#128075;
				</span>
			</h2>

			<Tabs defaultValue='account' className='mt-2 w-full'>
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
	return <div className='mt-4'>Hello From Account</div>
}

const Wishlist = () => {
	return <div className='mt-4'>Hello From Wishlist</div>
}

const Chats = () => {
	return <div className='mt-4'>Hello From Chats</div>
}
