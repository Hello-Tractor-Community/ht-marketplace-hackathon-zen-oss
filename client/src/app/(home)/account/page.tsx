'use client'

import Chats from '@/components/dashboard/buyer/chats'
import Wishlist from '@/components/dashboard/buyer/wishlist'
import BuyerAccountSettings from '@/components/dashboard/buyer/account'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
					<BuyerAccountSettings />
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
