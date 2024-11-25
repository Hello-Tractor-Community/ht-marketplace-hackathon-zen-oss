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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { EmailType } from '@/types'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import { Textarea } from '@/components/ui/textarea'
import { EmailTable } from '@/components/tables/email-table'
import { getAllPaginatedEmails, searchEmail, sendEmail } from '@/apis/email'
import { LoaderCircle, Plus, Search, XCircle } from 'lucide-react'

function Page() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [emails, setEmails] = useState<EmailType[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)

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
			fetchEmails()
			return
		}

		if (search.length < 1) {
			return toast.error('Please enter a search query')
		}

		setIsLoading(true)
		let response = await searchEmail(search)
		setIsLoading(false)

		if (!response) return
		setEmails(response.data)

		setTotalPages(1)
		setPage(1)
	}

	async function fetchEmails() {
		setIsLoading(true)
		let result = await getAllPaginatedEmails({ page, limit: 10 })
		setIsLoading(false)

		if (!result) return

		setEmails(result.data.emails)
		setTotalPages(Math.ceil(result.data.count / 10))
	}

	useEffect(() => {
		fetchEmails()
	}, [page])
	return (
		<div className='flex-1 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
			<div className='bg-white p-6 border'>
				<div className='flex w-full flex-col'>
					<p className='text-xl font-semibold text-gray-700'>
						Manage Emails
					</p>
				</div>

				<div className='mt-4 flex items-center gap-2'>
					<div className='relative w-full'>
						<Input
							value={search}
							className='bg-slate-50 text-primary focus-visible:ring-gray-200'
							onChange={(e) => setSearch(e.target.value)}
							type={'text'}
							placeholder={'Enter search term ...'}
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

				<Button
					className='mt-4 gap-2'
					onClick={() => handleSearch('search')}
				>
					<Search size={17} />
					<span>Search emails</span>
				</Button>
			</div>

			<SendEmail refreshEmails={fetchEmails} />

			<div className='w-[350px] overflow-x-auto bg-white border md:w-full'>
				<EmailTable
					isLoading={isLoading}
					emails={emails}
					refreshEmails={fetchEmails}
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

const SendEmail = ({refreshEmails}:{refreshEmails:()=>void}) => {
	const [isSending, setIsSending] = useState(false)
	const [mailData, setMailData] = useState({
		subject: '',
		receiver: '',
		message: ''
	})

	async function handleSendMail() {
		if (!mailData.receiver || !mailData.subject || !mailData.message) {
			return toast.error('Please fill all fields')
		}

		setIsSending(true)
		let response = await sendEmail({
			to: mailData.receiver,
			subject: mailData.subject,
			message: mailData.message
		})
		setIsSending(false)

		if (!response) return

		toast.success(response.message)
        setMailData({
            subject: '',
            receiver: '',
            message: ''
        })
        refreshEmails()
	}

	return (
		<Dialog>
			<DialogTrigger>
				<div className='mb-2 mt-4 flex cursor-pointer items-center gap-1 border bg-white p-2 align-middle text-sm text-muted-foreground hover:text-primary hover:shadow active:shadow-none'>
					<Plus size={20} /> New Email
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl'>Emails</DialogTitle>
					<DialogDescription>Send a user an email</DialogDescription>
				</DialogHeader>

				<div className='mt-2'>
					<div className='flex-1'>
						<p className='text-sm font-medium'>Subject</p>
						<Input
							type='text'
							value={mailData.subject}
							placeholder='Enter subject'
							className='mt-1 bg-slate-50 focus-visible:ring-gray-200'
							onChange={(e) =>
								setMailData((state) => {
									return {
										...state,
										subject: e.target.value
									}
								})
							}
						/>
					</div>

					<div className='mt-2 flex-1'>
						<p className='text-sm font-medium'>Receiver</p>
						<Input
							type='email'
							value={mailData.receiver}
							placeholder='e.g receiver@fast.mail'
							className='mt-1 bg-slate-50 focus-visible:ring-gray-200'
							onChange={(e) =>
								setMailData((state) => {
									return {
										...state,
										receiver: e.target.value
									}
								})
							}
						/>
					</div>

					<div className='mt-2 flex-1'>
						<p className='text-sm font-medium'>Message</p>
						<Textarea
							value={mailData.message}
							placeholder='Type your message...'
							className='mt-1 bg-slate-50 focus-visible:ring-gray-200'
							onChange={(e) =>
								setMailData((state) => {
									return {
										...state,
										message: e.target.value
									}
								})
							}
						/>
					</div>

					<Button className='mt-4' onClick={handleSendMail}>
						{isSending ? (
							<span className='flex items-center gap-1.5'>
								<LoaderCircle
									size={18}
									className='animate-spin'
								/>
								Sending
							</span>
						) : (
							'Send Email'
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
