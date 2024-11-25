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
import { toast } from 'sonner'
import { AdminType } from '@/types'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import { Plus, Search, XCircle } from 'lucide-react'
import NewAdmin from '@/components/modals/new-admin'
import { AdminTable } from '@/components/tables/admin-table'
import { getAllAdmins, searchAdmin, updateAdminPassword } from '@/apis/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Page() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [admins, setAdmins] = useState<AdminType[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [tabValue, setTabValue] = useState<'admin' | 'account'>('admin')

	async function handleSearch(type: 'clear' | 'search') {
		setTabValue('admin')

		if (type === 'clear') {
			setSearch('')
			fetchAccounts()
			return
		}

		setIsLoading(true)
		let response = await searchAdmin(search)
		setIsLoading(false)

		if (!response) return
		setAdmins([response.data])
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
		let result = await getAllAdmins({page,limit: 1})
		setIsLoading(false)

		if (!result) return

		setAdmins(result.data.admins)
        setTotalPages(result.data.count)
	}

	useEffect(() => {
		fetchAccounts()
	}, [])
	return (
		<div className='flex-1 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
			<div className='rounded border bg-white p-6'>
				<div className='flex w-full flex-col'>
					<p className=''>Manage admins in the system</p>
				</div>

				<div className='mt-4 flex items-center gap-2'>
					<div className='relative w-full'>
						<Input
							type='email'
							value={search}
							placeholder={'Search admin ...'}
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
					<span>Search Admin</span>
				</Button>
			</div>

			<Tabs defaultValue='admin' value={tabValue} className='w-full'>
				<TabsList className='my-4 w-full'>
					<div className='flex w-full items-center justify-between rounded-lg'>
						<div className='rounded-lg bg-slate-50 p-0.5'>
							<TabsTrigger
								value='admin'
								onClick={() => setTabValue('admin')}
							>
								Admins
							</TabsTrigger>
							<TabsTrigger
								value='account'
								onClick={() => setTabValue('account')}
							>
								Account
							</TabsTrigger>
						</div>

						<NewAdmin refetchData={() => fetchAccounts()}>
							<Button
								variant='outline'
								className='hover:bg-white hover:text-gray-600 active:opacity-70'
							>
								<Plus /> New Admin
							</Button>
						</NewAdmin>
					</div>
				</TabsList>
				<TabsContent value='account'>
					<Account />
				</TabsContent>
				<TabsContent value='admin'>
					<div className='w-[350px] overflow-x-auto bg-white md:w-full'>
						<AdminTable
							admins={admins}
							isLoading={isLoading}
							refreshData={() => fetchAccounts()}
						/>

						<div className='bg-white border-x border-b py-2'>
							<Pagination>
								<PaginationContent className='p-1'>
									<PaginationItem>
										<PaginationPrevious
											className='cursor-pointer'
											onClick={() =>
												handlePageChange('back')
											}
										/>
									</PaginationItem>
									<PaginationItem>{page}</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										{totalPages || 0}
									</PaginationItem>
									<PaginationItem>
										<PaginationNext
											className='cursor-pointer'
											onClick={() =>
												handlePageChange('next')
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}

const Account = () => {
	const [passwordData, setPasswordData] = useState({
		password: '',
		confirmNewPassword: '',
		newPassword: ''
	})

	async function handleUpdatePassword() {
		if (passwordData.newPassword !== passwordData.confirmNewPassword) {
			return toast.error('Passwords do not match')
		}

		if (passwordData.newPassword.length < 8) {
			return toast.error('Password must be at least 8 characters long')
		}

		let response = await updateAdminPassword({
			password: passwordData.password,
			newPassword: passwordData.newPassword
		})

		if (!response) return

		toast.success(response.message)
	}
	return (
		<div className='rounded-xl bg-white p-6 shadow'>
			<h1 className='text-xl font-semibold'>Account</h1>
			<p className='text-gray-700'>Settings for your account</p>

			<form className='mt-6'>
				<p className='text-gray-700'>Update password</p>
				<div className='mt-2 flex max-w-2xl flex-col gap-4'>
					<div>
						<Label htmlFor='password' className='text-gray-700'>
							Password
						</Label>
						<Input
							placeholder={'Password'}
							id='password'
							onChange={(e) =>
								setPasswordData((state) => {
									return {
										...state,
										password: e.target.value
									}
								})
							}
							className='bg-gray-50 focus-visible:ring-gray-200'
						/>
					</div>

					<div>
						<Label
							htmlFor='confirmPassword'
							className='text-gray-700'
						>
							Confirm Password{' '}
						</Label>
						<Input
							placeholder={'Confirm Password'}
							id='confirmPassword'
							onChange={(e) =>
								setPasswordData((state) => {
									return {
										...state,
										confirmNewPassword: e.target.value
									}
								})
							}
							className='bg-gray-50 focus-visible:ring-gray-200'
						/>
					</div>

					<div>
						<Label
							htmlFor='currentPassword'
							className='text-gray-700'
						>
							Current Password
						</Label>
						<Input
							placeholder={'Current Password'}
							onChange={(e) =>
								setPasswordData((state) => {
									return {
										...state,
										newPassword: e.target.value
									}
								})
							}
							className='bg-gray-50 focus-visible:ring-gray-200'
						/>
					</div>
				</div>
				<Button
					type='button'
					onClick={handleUpdatePassword}
					className='mt-4 px-12'
					variant='outline'
				>
					Update
				</Button>
			</form>
		</div>
	)
}

//export default withAdminAuthRequired(Page)
export default Page
