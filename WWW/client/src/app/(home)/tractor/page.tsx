'use client'
import { DEFAULT_SLIDES } from '@/components/home/banner'
import FeaturesProducts from '@/components/home/featured'
import { TractorGallery } from '@/components/product/image-gallery'
import { TractorInfo } from '@/components/product/product-info'
import { ProductSpecifications } from '@/components/product/product-specs'
import { DEF_SPECS } from '@/constants/tractors'
import React, { useState } from 'react'

let IMAGES = [
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-35-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/Case_IH_JX90.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/6095B-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-75-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/JD_6XXXB_OOS.png'
]

export default function Page() {
	return (
		<section className='mb-40 mt-10 h-full w-full md:mb-24 lg:px-32'>
			<div className='flex flex-col items-start gap-8 px-4 lg:container md:px-6 lg:flex-row'>
				<TractorGallery images={IMAGES} />
				<TractorInfo
					title='Sonalika DI-35'
					price={400}
					condition='Brand New'
					seller={{
						name: 'John Doe',
						rating: 100,
						totalRatings: 100,
						avatar: ''
					}}
				/>
			</div>

			<FeaturesProducts
				title='Similar Tractors'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-24 lg:mx-0'
			/>

			<div className='mt-24'>
				<h2 className='mb-4 font-manrope text-2xl font-bold capitalize'>
					Product Specifications
				</h2>

				<ProductSpecifications sections={DEF_SPECS} />
			</div>

			<FeaturesProducts
				title='Recently Viewed Tractors'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-24 lg:mx-0'
			/>
		</section>
	)
}
