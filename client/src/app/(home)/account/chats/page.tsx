import { Metadata } from 'next'
import React from 'react'

export default async function Page() {
	return (
		<div className='h-screen p-4'>
			<div className='border-gray rounded-lg border-2 border-dashed p-4'>
				<div className='mb-4 flex justify-center rounded bg-gray-50'>
                Where a see thier chat history
				</div>
			</div>
		</div>
	)
}

export const metadata: Metadata = {
	title: 'Chats',
	description: 'Become a full stack Nextjs with this project',
	icons: {
		icon: '/assets/images/logo.svg'
	}
}
