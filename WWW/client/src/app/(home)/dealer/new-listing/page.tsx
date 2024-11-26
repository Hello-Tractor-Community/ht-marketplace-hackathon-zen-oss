'use client'

import React, { useState } from 'react'
import MultiStep from 'react-multistep'
import {
	StepOne,
	StepTwo,
	StepThree,
	StepFour,
	StepFive
} from '@/components/dashboard/buyer/listing-steps'
import { TractorFormData } from '@/types'

const styles = {
	btn: {
		background: 'white',
		padding: '8px 16px',
		borderRadius: '6px',
		fontSize: '14px',
		color: 'black',
		border: '1px solid #ff461e',
		cursor: 'pointer',
		margin: '30px 4px',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			background: '#ff461e',
			color: 'white'
		}
	}
}

export default function Page() {
	const [formData, setFormData] = useState<TractorFormData>({
		model: '',
		wheelDrive: '',
		horsePower: '',
		price: '',
		engineHours: '',
		description: '',
		category: 'new',
		cylinders: '',
		engineRpm: '',
		transmissionType: '',
		clutchType: '',
		gearboxType: '',
		brakesType: '',
		steeringType: '',
		fuelTankCapacity: '',
		liftingCapacity: '',
		frontWheelSize: '',
		rearWheelSize: '',
		images: []
	})

	const steps = [
		{
			title: 'Basic Info',
			component: <StepOne formData={formData} setFormData={setFormData} />
		},
		{
			title: 'Engine Details',
			component: <StepTwo formData={formData} setFormData={setFormData} />
		},
		{
			title: 'Mechanical',
			component: (
				<StepThree formData={formData} setFormData={setFormData} />
			)
		},
		{
			title: 'Specifications',
			component: (
				<StepFour formData={formData} setFormData={setFormData} />
			)
		},
		{
			title: 'Images',
			component: (
				<StepFive formData={formData} setFormData={setFormData} submit={handleSubmit} />
			)
		}
	]

    async function handleSubmit() {
        console.log(formData)
    }

	return (
		<section className='mb-32 mt-6 h-fit px-4 lg:container md:px-6 lg:mb-12 lg:px-24'>
			<h1 className='font-manrope text-2xl font-bold'>
				List Your Tractor
			</h1>
			<MultiStep
				activeStep={0}
				showNavigation={true}
				prevButton={{ title: 'Back', style: styles.btn }}
				nextButton={{
					title: 'Next',
					style: styles.btn
				}}
                stepCustomStyle={{
                    width: '100%',
                }}
				steps={steps}
			/>
		</section>
	)
}
