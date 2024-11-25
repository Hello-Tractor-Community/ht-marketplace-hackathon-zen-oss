'use client'
import { DEFAULT_SLIDES } from '@/components/home/banner'
import FeaturesProducts from '@/components/home/featured'
import { TractorGallery } from '@/components/product/image-gallery'
import { TractorInfo } from '@/components/product/product-info'
import { ProductSpecifications } from '@/components/product/product-specs'
import React, { useState } from 'react'

let IMAGES = [
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-35-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/Case_IH_JX90.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/6095B-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-75-removebg-preview.png',
	'https://ht-mobileassets.s3.amazonaws.com/tractorModels/JD_6XXXB_OOS.png'
]

export const DEF_SPECS = [
	{
		title: 'Mahindra 275 DI HT TU SP Plus Engine',
		specs: {
			'No. Of Cylinder': 3,
			'HP Category': '39 HP',
			'Capacity CC': '2234 CC',
			'Engine Rated RPM': '2200 RPM',
			'Air Filter': 'Wet Type',
			'PTO HP': 34,
			Torque: '145 NM'
		}
	},
	{
		title: 'Mahindra 275 DI HT TU SP Plus Transmission',
		specs: {
			'Clutch Type': 'Dual Clutch',
			'Gearbox Type': '8 Forward + 2 Reverse',
			'Main Gear Shift': 'Constant Mesh',
			'PTO Drive': 'Independent'
		}
	},
	{
		title: 'Mahindra 275 DI HT TU SP Plus Brakes',
		specs: {
			'Service Brake': 'Oil Immersed Brakes',
			'Parking Brake': 'Mechanical, Hand Operated',
			'Brake Type': 'Disc Brake'
		}
	},
	{
		title: 'Mahindra 275 DI HT TU SP Plus Steering',
		specs: {
			'Steering Type': 'Power Steering',
			'Turning Radius': '3.8m',
			'Steering Column': 'Adjustable'
		}
	},
	{
		title: 'Mahindra 275 DI HT TU SP Plus Hydraulics',
		specs: {
			'Hydraulic Pump': 'Dual Pump',
			'Lifting Capacity': '1600 kg',
			'Position Control': 'Standard'
		}
	},
	{
		title: 'Mahindra 275 DI HT TU SP Plus Wheels And Tyres',
		specs: {
			'Front Tyre': '6.00-16',
			'Rear Tyre': '13.6-28',
			'Wheel Drive': '2WD'
		}
	}
]

export default function Page() {
	return (
		<section className='mb-40 md:mb-24 mt-10 h-full w-full lg:px-32'>
			<div className='px-4 md:px-6 lg:container flex flex-col lg:flex-row items-start gap-8'>
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
				<h2 className='font-manrope text-2xl mb-4 font-bold capitalize'>
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
