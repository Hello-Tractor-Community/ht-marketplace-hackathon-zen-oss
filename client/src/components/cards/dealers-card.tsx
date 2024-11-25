import { BadgeCheck } from 'lucide-react'

export default function DealersCard() {
	return (
		<div className='rounded border hover:bg-white p-2 border-gray-200'>
        <div className='flex items-center justify-between'>
			<p className='font-medium'>John Does</p>
			<p className='flex items-center gap-1 text-xs text-blue-600'>
				<BadgeCheck className='h-4 w-4' />
				Verified
			</p>
            </div>

            <p className='text-xs text-gray-500'>Kasarani,Nairobi</p>
		</div>
	)
}
