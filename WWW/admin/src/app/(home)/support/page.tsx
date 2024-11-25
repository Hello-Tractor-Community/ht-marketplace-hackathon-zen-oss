'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, XCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import type { SupportStatus, SupportTicketType } from '@/types'
import { SupportTable } from '@/components/tables/support-table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getAllSupportTickets, searchSupportTicket } from '@/apis/support'

function Page() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [tickets, setTickets] = useState<SupportTicketType[]>([])
	const [filter, setFilter] = useState<'all' | SupportStatus>('all')

	async function handleSearch(type: 'clear' | 'search') {
		if (type === 'clear') {
			setSearch('')
			fetchAccounts()
			return
		}

		setIsLoading(true)
		let response = await searchSupportTicket(search)
		setIsLoading(false)

		if (!response) return
		setTickets(response.data)
	}

	const handlePageChange = (type: 'next' | 'back') => {
		if (type === 'next') {
			if (page === totalPages) return
			setPage(page + 1)
		} else {
			if (page === 1) return
			setPage(page - 1)
		}
	}

	async function fetchAccounts() {
		setIsLoading(true)
		let result = await getAllSupportTickets({
			page,
			limit: 10,
			status: filter
		})
		setIsLoading(false)

		if (!result) return

		setTickets(result.data.supportTickets)
		setTotalPages(result.data.count)
	}

	useEffect(() => {
		fetchAccounts()
	}, [filter])
	return (
		<div className='flex-1 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
			<div className='rounded border bg-white p-6'>
				<div className='flex w-full flex-col'>
					<p className=''>Handle user support queries</p>
				</div>

				<div className='mt-4 flex items-center gap-2'>
					<div className='relative w-full'>
						<Input
							type='text'
							value={search}
							placeholder={'Search by email or name ...'}
							onChange={(e) => setSearch(e.target.value)}
							className='bg-slate-50 text-primary focus-visible:ring-gray-200'
						/>
						<XCircle
							size={17}
							className={cn(
								'absolute right-2 top-3 cursor-pointer bg-white hover:opacity-80 active:opacity-60',
								{ hidden: search.length < 1 }
							)}
							onClick={() => handleSearch('clear')}
						/>
					</div>
				</div>

				<Button
					className='mt-4 gap-1.5 px-8'
					onClick={() => handleSearch('search')}
				>
					<Search size={16} />
					<span>Search Ticket</span>
				</Button>
			</div>

			<div className='my-4 border bg-white p-4'>
				<p className='text-sm text-muted-foreground'>
					Select filter below:
				</p>
				<RadioGroup
					defaultValue='name'
					className='mt-4 flex'
					onValueChange={(value: 'all' | 'pending' | 'resolved') =>
						setFilter(value)
					}
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='all' id='option-one' />
						<Label
							htmlFor='option-one'
							className='text-sm text-muted-foreground'
						>
							All
						</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='pending' id='option-two' />
						<Label
							htmlFor='option-two'
							className='text-sm text-muted-foreground'
						>
							Pending
						</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='resolved' id='option-two' />
						<Label
							htmlFor='option-two'
							className='text-sm text-muted-foreground'
						>
							Resolved
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div className='w-[350px] overflow-x-auto border bg-white md:w-full'>
				<SupportTable
					tickets={tickets}
					isLoading={isLoading}
					refreshData={() => fetchAccounts()}
				/>

				<div className='border-t bg-white py-2'>
					<Pagination>
						<PaginationContent className='p-1'>
							<PaginationItem>
								<PaginationPrevious
									className='cursor-pointer'
									onClick={() => handlePageChange('back')}
								/>
							</PaginationItem>
							<PaginationItem>{page}</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>{totalPages || 0}</PaginationItem>
							<PaginationItem>
								<PaginationNext
									className='cursor-pointer'
									onClick={() => handlePageChange('next')}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

//export default withAdminAuthRequired(Page)
export default Page
