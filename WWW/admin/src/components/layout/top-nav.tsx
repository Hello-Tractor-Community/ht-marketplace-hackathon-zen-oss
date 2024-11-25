'use client'

import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'

function TopNav() {
	return (
		<div className='hidden w-full items-center justify-between border-b bg-white p-[12.5px] px-8 md:flex lg:p-[9.5px] lg:pr-14'>
			<div className='flex items-center gap-2'>
				<img
					src={
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
					}
					alt='Profile'
					className='h-[50px] w-[50px] rounded-full border-4 border-white object-cover shadow-lg'
				/>
				<div className='flex flex-col'>
					<p className='font-[500]'>Jane Doe</p>
					<p className='-mt-1.5 text-sm text-muted-foreground'>
						jane@mails.com
					</p>
				</div>
			</div>
			<div className='flex items-center gap-2 text-muted-foreground'>
				<CalendarDays size={24} />
				{format(new Date(), 'dd MMMM yyyy')}
			</div>
		</div>
	)
}

export default TopNav
