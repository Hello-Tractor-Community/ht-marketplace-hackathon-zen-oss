import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Search, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DEFAULT_SLIDES } from '@/components/home/banner'
import { ListingsTable } from '../seller/listings-table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Listings() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchType, setSearchType] = useState<'query' | 'id'>('id')

	const handlePageChange = (type: 'next' | 'back') => {
		if (type === 'next') {
			if (page === totalPages) return
			setPage(page + 1)
		} else {
			if (page === 1) return
			setPage(page - 1)
		}
	}

	async function handleSearch(type: 'clear' | 'search') {
		if (type === 'clear') {
			setSearch('')
			// TODO: CAll fetch listings
			return
		}

		if (search.length < 1) {
			return toast.error('Please enter a search query')
		}

		setIsLoading(true)
		let response: any
		setIsLoading(false)

		if (!response) return
		// UPdate state

		setTotalPages(1)
		setPage(1)
	}

	return (
		<div className='mb-36'>
			<div className='col-span-3 border-4 border-gray-200  bg-white p-6'>
				<h1 className='py-2 font-manrope text-2xl font-medium'>
					Your Listings
				</h1>

				<div className='mt-4 flex items-center gap-2'>
					<div className='relative w-full'>
						<Input
							value={search}
							className='bg-slate-50 text-primary focus-visible:ring-gray-200'
							onChange={(e) => setSearch(e.target.value)}
							type={'text'}
							placeholder="Search by dealers' name or email"
						/>
						<XCircle
							size={17}
							className={cn(
								'absolute right-2 top-3 cursor-pointer bg-white text-muted-foreground hover:opacity-80 active:opacity-60',
								{ hidden: search.length < 1 }
							)}
							onClick={() => handleSearch('clear')}
						/>
					</div>
				</div>

				<div className='flex flex-col justify-between md:flex-row md:items-center'>
					<RadioGroup
						defaultValue='id'
						className='mt-4 flex'
						onValueChange={(value: 'query' | 'id') =>
							setSearchType(value)
						}
					>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='id' id='option-two' />
							<Label
								htmlFor='option-two'
								className='text-sm font-normal text-muted-foreground'
							>
								Approved
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='query' id='option-one' />
							<Label
								htmlFor='option-one'
								className='text-sm font-normal text-muted-foreground'
							>
								Pending
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='query' id='option-one' />
							<Label
								htmlFor='option-one'
								className='text-sm font-normal text-muted-foreground'
							>
								Declined
							</Label>
						</div>
					</RadioGroup>

					<Button
						size='lg'
                        variant={'outline'}
						className='mt-4 gap-2'
						onClick={() => handleSearch('search')}
					>
						<Search size={17} />
						<span>Search Listings</span>
					</Button>
				</div>
			</div>

			<div className='mt-4 border-4 border-gray-200 bg-white'>
				<ListingsTable
					listings={DEFAULT_SLIDES}
					isLoading={false}
					refreshTnxs={() => {}}
				/>

				<div className='border-t bg-white py-2'>
					<Pagination>
						<PaginationContent className='p-1'>
							<PaginationItem>
								<PaginationPrevious
									className='cursor-pointer text-gray-800'
									onClick={() => handlePageChange('back')}
								/>
							</PaginationItem>
							<PaginationItem className='text-gray-800'>
								{page}
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>{totalPages || 0}</PaginationItem>
							<PaginationItem>
								<PaginationNext
									className='cursor-pointer text-gray-800'
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
