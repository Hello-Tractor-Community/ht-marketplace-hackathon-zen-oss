import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer'
import {
	fetchAllTransactionStatus,
	requestTransactionStatus
} from '@/apis/tnxs'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { TnxStatusCheck } from '@/types'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { TransactionStatusTable } from '../tables/tnx-status-table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function TransactionStatus() {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant='outline' className='rounded-none'>
						Check Txn Status
					</Button>
				</DialogTrigger>
				<DialogContent className='max-w-5xl'>
					<DialogHeader>
						<DialogTitle className='text-xl'>
							Transaction Status
						</DialogTitle>
						<DialogDescription>
							Check the status of transactions from M-PESA using
							the transaction ID.
						</DialogDescription>
					</DialogHeader>
					<TnxComponent />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='outline'>Check Txn Status</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle className='text-xl'>
						Transaction Status
					</DrawerTitle>
					<DrawerDescription>
						Check the status of transactions from M-PESA using the
						transaction ID.
					</DrawerDescription>
				</DrawerHeader>
				<TnxComponent className='mx-4 px-4' />
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function TnxComponent(props: React.HTMLProps<HTMLDivElement>) {
	const [code, setCode] = useState<string>('')
	const [isChecking, setIsChecking] = useState<boolean>(false)
	const [codeType, setCodeType] = useState<'mpesa' | 'deriv'>('mpesa')
	const [transactions, setTransactions] = useState<TnxStatusCheck[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [timeToRefresh, setTimeToRefresh] = useState<number>(60)

	async function handleRequest(type: 'clear' | 'code') {
		if (type === 'clear') {
			setCode('')
			return
		}

		if (code.length < 1) {
			return toast.error('Please enter a code query')
		}

		setIsChecking(true)
		const response = await requestTransactionStatus({
			code: code.toUpperCase(),
			type: 'mpesa'
		})
		setIsChecking(false)

		if (!response) return
		fetchTransactions()
		setCode('')

		toast.success('Transaction found')
	}

	async function fetchTransactions() {
		setIsLoading(true)
		let result = await fetchAllTransactionStatus()
		setIsLoading(false)

		if (!result) return

		setTransactions(result.data.transactions)
	}

	useEffect(() => {
		fetchTransactions()

		const interval = setInterval(() => {
			setTimeToRefresh((prevTime) => {
				if (prevTime === 1) {
					fetchTransactions()
					return 60
				}
				return prevTime - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div {...props}>
			<div className='mt-4 flex items-center gap-2'>
				<div className='relative w-full'>
					<Input
						value={code}
						className='bg-slate-50 uppercase text-primary focus-visible:ring-gray-200'
						onChange={(e) => setCode(e.target.value)}
						type={'text'}
						placeholder={
							codeType === 'mpesa'
								? 'Enter mpesa tnx ID ...'
								: 'Enter Deriv tnx ID ...'
						}
					/>
					<XCircle
						size={17}
						className={cn(
							'absolute right-2 top-3 cursor-pointer bg-white text-muted-foreground hover:opacity-80 active:opacity-60',
							{ hidden: code.length < 1 }
						)}
						onClick={() => handleRequest('clear')}
					/>
				</div>
			</div>

			<RadioGroup
				defaultValue='mpesa'
				className='mt-4 flex'
				onValueChange={(value: 'mpesa' | 'deriv') => setCodeType(value)}
			>
				<div className='flex items-center space-x-2'>
					<RadioGroupItem value='mpesa' id='option-two' />
					<Label
						htmlFor='option-two'
						className='text-sm font-normal text-muted-foreground'
					>
						Mpesa Status
					</Label>
				</div>
			</RadioGroup>

			<Button
				className='mt-4'
				disabled={isChecking}
				onClick={() => handleRequest('code')}
			>
				{isChecking ? (
					<p className='flex items-center gap-1'>
						<Loader size={20} className='animate-spin' />
						Checking
					</p>
				) : (
					'Request Verification'
				)}
			</Button>

			<p className='my-3 text-muted-foreground'>
				Refreshes in {timeToRefresh}s
			</p>

			<div className='flex max-h-[500px] flex-col items-center justify-between overflow-y-auto border'>
				<TransactionStatusTable
					transactions={transactions}
					isLoading={isLoading}
					refreshTnxs={fetchTransactions}
				/>
				{transactions.length === 0 && (
					<div className='flex w-full items-center justify-center p-4'>
						<p className='text-gray-700'>No transactions found</p>
					</div>
				)}
			</div>
		</div>
	)
}
