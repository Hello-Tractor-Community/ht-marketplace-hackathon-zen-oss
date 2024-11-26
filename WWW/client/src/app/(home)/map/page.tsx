'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import FeaturesProducts from '@/components/home/featured'
import { DEFAULT_SLIDES } from '@/components/home/banner'
const DealerMap = dynamic(() => import('../../../components/home/map'), { ssr: false })

export default function Page() {
	return (
		<section className='flex flex-col pb-24 pt-6 lg:container lg:px-24'>
			<div className='h-[500px] w-full overflow-hidden border-4 border-gray-200 bg-slate-100 lg:rounded-lg'>
				<DealerMap />
			</div>

			<FeaturesProducts
				title='Tractors near you'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-12 lg:mx-0'
			/>
		</section>
	)
}

