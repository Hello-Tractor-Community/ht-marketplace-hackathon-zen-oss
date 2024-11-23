'use client'

import Banner, { DEFAULT_SLIDES } from '@/components/home/banner'
import CallToAction from '@/components/home/cta'
import FeaturesProducts from '@/components/home/featured'

export default function Home() {
	return (
		<div className='mb-36'>
			<Banner />
			<FeaturesProducts
				title='Your recently viewed tractors'
				link='/'
				products={DEFAULT_SLIDES}
                className='mt-24'
			/>

			<CallToAction />

			<FeaturesProducts
				title='Brand New tractors'
				link='/'
				products={DEFAULT_SLIDES}
                className='mt-24'
			/>

			<FeaturesProducts
				title='Used tractors'
				link='/'
				products={DEFAULT_SLIDES}
                className='mt-24'
			/>
		</div>
	)
}
