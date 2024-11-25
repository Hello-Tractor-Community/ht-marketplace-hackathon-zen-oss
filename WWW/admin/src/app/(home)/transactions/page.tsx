'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { cn, dateDistance, parseAccountBalance } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { AdminBalanceType, UserTransactionType } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChevronDown, RefreshCw, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TransactionTable } from '@/components/tables/transaction-table'
import {
	checkDerivBalance,
	checkMpesaBalance,
	getAllPaginatedTransactions,
	searchTransaction
} from '@/apis/tnxs'
import { TransactionStatus } from '@/components/modals/trnx-status-modal'

type TxStatusType = 'pending' | 'completed' | 'failed' | 'all'
type TxTypeType = 'deposit' | 'withdrawal' | 'all'

function Page() {
	const [transactions, setTransactions] = useState<UserTransactionType[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [searchType, setSearchType] = useState<'query' | 'id'>('id')
	const [txStatus, setTxStatus] = useState<TxStatusType>('all')
	const [txType, setTxType] = useState<TxTypeType>('all')
	const [balances, setBalances] = useState<AdminBalanceType | null>(null)
	const [refreshBalances, setRefreshBalances] = useState<boolean>(false)
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

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
			fetchTransactions()
			return
		}

		if (search.length < 1) {
			return toast.error('Please enter a search query')
		}

		setIsLoading(true)
		let response = await searchTransaction({
			type: searchType,
			term: search
		})
		setIsLoading(false)

		if (!response) return
		setTransactions([response.data])

		setTotalPages(1)
		setPage(1)
	}

	async function fetchTransactions() {
		setIsLoading(true)
		let result = await getAllPaginatedTransactions({
			page,
			limit: 10,
			type: txType,
			status: txStatus
		})
		setIsLoading(false)

		if (!result) return

		setTransactions(result.data.transactions)
		setTotalPages(Math.ceil(result.data.count / 10))
	}

	async function fetchMpesaBalance() {
		setIsRefreshing(true)
		const response = await checkMpesaBalance()

		if (!response) return

		let parsedBalances = parseAccountBalance(response.data.mpesa)

		setBalances({
			_id: response.data._id,
			mpesa: parsedBalances,
			deriv: response.data.deriv,
			createdAt: response.data.createdAt,
			updatedAt: response.data.updatedAt
		})
	}

	async function fetchDerivBalance() {
		const response = await checkDerivBalance()
		setIsRefreshing(false)

		if (!response) return

		let parsedBalances = parseAccountBalance(response.data.mpesa)

		setBalances({
			_id: response.data._id,
			mpesa: parsedBalances,
			deriv: response.data.deriv,
			createdAt: response.data.createdAt,
			updatedAt: response.data.updatedAt
		})
	}

	useEffect(() => {
		fetchTransactions()
	}, [page, txStatus, txType])

	useEffect(() => {
		fetchMpesaBalance()

		let timeout = setTimeout(() => {
			fetchDerivBalance()
		}, 5000)

		return () => {
			clearTimeout(timeout)
		}
	}, [refreshBalances])

	return (
		<div className='flex-1 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
			<section className='grid grid-cols-1 gap-2 md:grid-cols-5 '>
				<div className='col-span-3 border bg-white p-6'>
					<div className='flex w-full flex-col'>
						<p className='text-xl font-semibold text-gray-700'>
							Manage Transactions
						</p>
					</div>

					<div className='mt-4 flex items-center gap-2'>
						<div className='relative w-full'>
							<Input
								value={search}
								className='bg-slate-50 text-primary focus-visible:ring-gray-200'
								onChange={(e) => setSearch(e.target.value)}
								type={'text'}
								placeholder={
									searchType === 'query'
										? 'Search by email or name ...'
										: 'Search by tnx id ...'
								}
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
									Id Search
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='query' id='option-one' />
								<Label
									htmlFor='option-one'
									className='text-sm font-normal text-muted-foreground'
								>
									User's Name | Email Search
								</Label>
							</div>
						</RadioGroup>

						<Button
							size='sm'
							className='mt-4 gap-2'
							onClick={() => handleSearch('search')}
						>
							<Search size={17} />
							<span>Search user</span>
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 gap-2 md:col-span-2 md:grid-cols-2'>
					<Card className='w-full flex-1 rounded-none shadow-none'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
							<CardTitle className='text-lg font-medium text-gray-600'>
								Mpesa Balance
							</CardTitle>
						</CardHeader>

						<CardContent className='flex items-center justify-between'>
							<div className='mt-1'>
								<p className='flex items-center gap-2 text-xl font-normal tracking-tighter text-gray-700'>
									KES
									<button
										disabled={isRefreshing}
										className='hover:text-emerald-500 disabled:cursor-not-allowed'
										onClick={() =>
											setRefreshBalances(!refreshBalances)
										}
									>
										<RefreshCw
											size={16}
											className={cn({
												'animate-spin': isRefreshing
											})}
										/>
									</button>
								</p>
								<p className='-mt-1 text-3xl font-semibold text-gray-800'>
									{
										balances?.mpesa['Utility Account']
											.availableFunds
									}
								</p>
								<p className='mt-4 text-xs font-normal text-gray-500'>
									Last checked&nbsp;
									{balances?.updatedAt &&
										dateDistance(balances?.updatedAt)}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className='w-full flex-1 rounded-none shadow-none'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
							<CardTitle className='text-lg font-medium text-gray-600'>
								Deriv Balance
							</CardTitle>
						</CardHeader>

						<CardContent className='flex items-center justify-between'>
							<div className='mt-1'>
								<p className='flex items-center gap-2 text-xl font-normal tracking-tighter text-gray-700'>
									USD
									<button
										disabled={isRefreshing}
										className='hover:text-emerald-500 disabled:cursor-not-allowed'
										onClick={() =>
											setRefreshBalances(!refreshBalances)
										}
									>
										<RefreshCw
											size={16}
											className={cn({
												'animate-spin': isRefreshing
											})}
										/>
									</button>
								</p>
								<p className='text-3xl font-semibold text-gray-800'>
									{balances?.deriv.balance}
								</p>
								<p className='mt-4 text-xs font-normal text-gray-500'>
									Last checked&nbsp;
									{balances?.updatedAt &&
										dateDistance(balances?.updatedAt)}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<div className='mt-8 flex flex-col justify-between gap-2 md:flex-row md:items-center'>
				<div className='flex flex-col gap-4 md:flex-row md:items-center'>
					<DropdownMenu>
						<div className='flex items-center gap-2'>
							<p className='text-lg font-semibold text-gray-700'>
								Filter by Status
							</p>
							<DropdownMenuTrigger className='focus:outline-none'>
								<div className='flex select-none items-center gap-1 border bg-white px-4 py-1 text-sm capitalize'>
									{txStatus}
									<ChevronDown
										size={20}
										className='text-gray-700'
									/>
								</div>
							</DropdownMenuTrigger>
						</div>
						<DropdownMenuContent className='w-44'>
							<DropdownMenuLabel>
								Transaction Status
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={txStatus}
								onValueChange={(value) =>
									setTxStatus(value as TxStatusType)
								}
							>
								<DropdownMenuRadioItem value='pending'>
									Pending
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='completed'>
									Completed
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='failed'>
									Failed
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='all'>
									All
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<div className='flex items-center gap-2'>
							<p className='text-lg font-semibold text-gray-700'>
								Filter by Type
							</p>
							<DropdownMenuTrigger className='focus:outline-none'>
								<div className='flex select-none items-center gap-1 border bg-white px-4 py-1 text-sm capitalize focus:outline-none'>
									{txType}
									<ChevronDown
										size={20}
										className='text-gray-700'
									/>
								</div>
							</DropdownMenuTrigger>
						</div>
						<DropdownMenuContent className='w-44'>
							<DropdownMenuLabel>
								Transaction type
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={txType}
								onValueChange={(value) =>
									setTxType(value as TxTypeType)
								}
							>
								<DropdownMenuRadioItem value='deposit'>
									Deposit
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='withdrawal'>
									Withdrawal
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='all'>
									All
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<TransactionStatus />
			</div>

			<div className='mt-8 w-[350px] overflow-x-auto border bg-white md:w-full'>
				<TransactionTable
					isLoading={isLoading}
					transactions={transactions}
					refreshTnxs={fetchTransactions}
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
