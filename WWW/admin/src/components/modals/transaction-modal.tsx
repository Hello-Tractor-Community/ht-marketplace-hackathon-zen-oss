import {
	Credenza,
	CredenzaBody,
	CredenzaContent,
	CredenzaDescription,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { getAvatarImg } from '@/lib/avatar'
import type { UserTransactionType } from '@/types'
import { cn, copyToClipboard, formatDate } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { deleteTransaction, retryTransaction } from '@/apis/tnxs'
import {
	ArrowBigDown,
	ArrowBigUp,
	Copy,
	Loader,
	LoaderCircle,
	RotateCw
} from 'lucide-react'

type UserModalProps = {
	children: React.ReactNode
	transaction: UserTransactionType
}

function TransactionModal({ children, transaction }: UserModalProps) {
	const [isRetrying, setIsRetrying] = useState<boolean>(false)

	let statusColor =
		transaction.status == 'completed'
			? 'text-emerald-500'
			: transaction.status == 'failed'
				? 'text-red-500'
				: 'text-yellow-600'

	let isRetryable =
		transaction.status == 'failed' &&
		((transaction.type == 'deposit' &&
			transaction.pointOfFailure == 'deriv') ||
			(transaction.type == 'withdrawal' &&
				transaction.pointOfFailure == 'mpesa'))

	async function retryFailedTransaction() {
		if (!isRetryable) return toast.error('Transaction is not retryable')

		setIsRetrying(true)
		const response = await retryTransaction(transaction._id)
		setIsRetrying(false)

		if (!response) return
		toast.success(response.message)
	}

	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>
						Transaction Details
					</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						More details about the transaction
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<div>
						<div className='flex flex-row items-center rounded-md border p-2'>
							<div className='flex flex-1 flex-col'>
								<div className='flex flex-row gap-2.5'>
									<img
										src={getAvatarImg(
											transaction.user.name
										)}
										alt='Recipient transaction'
										width={32}
										height={32}
										className='h-10 w-10'
									/>
									<div>
										<p className=''>
											{transaction.user.name}
										</p>
										<p className='text-xs text-gray-600'>
											{transaction.user.email}
										</p>
									</div>
								</div>

								<p className='mt-4 px-2 text-xs text-muted-foreground'>
									{formatDate(transaction.createdAt)}
								</p>

								<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
									{transaction._id}&nbsp;
									<Copy
										size={18}
										onClick={() =>
											copyToClipboard(transaction._id)
										}
										className='cursor-pointer hover:opacity-80 active:opacity-100'
									/>
								</p>
								<p className='mt-1 px-3 text-xs text-gray-700'>
									Status:{' '}
									<span
										className={cn('uppercase', statusColor)}
									>
										{transaction.status}
									</span>
								</p>
							</div>

							<div className='flex flex-col items-center gap-2'>
								<div className='flex flex-col items-center justify-center rounded-xl border p-2'>
									{transaction.type == 'withdrawal' ? (
										<ArrowBigUp className='text-red-500' />
									) : (
										<ArrowBigDown className='text-green-500' />
									)}

									<p className='text-sm capitalize'>
										{transaction.type}
									</p>
								</div>
								{isRetryable && (
									<Button
										size='sm'
										disabled={isRetrying}
										onClick={retryFailedTransaction}
									>
										{isRetrying ? (
											<p className='flex items-center gap-1'>
												<Loader
													size={20}
													className='animate-spin'
												/>
												Retrying
											</p>
										) : (
											<p className='flex items-center gap-1'>
												<RotateCw size={18} />
												Retry
											</p>
										)}
									</Button>
								)}
							</div>
						</div>
					</div>

					<div className='my-2'>
						<div className='mt-4 grid grid-cols-2 gap-4'>
							<div className='flex flex-col rounded-md border px-4 py-2 text-sm'>
								<p className='text-gray-600'>Amount(USD)</p>
								<span className='text-2xl font-semibold'>
									{transaction.amount}
								</span>

								<p className='text-xs text-muted-foreground'>
									Amount user&nbsp;
									{transaction.type == 'deposit'
										? 'deposited'
										: 'withdrew'}
								</p>
							</div>

							<div className='flex flex-col rounded-md border px-4 py-2 text-sm'>
								<p className='text-gray-600'>KES/USD</p>
								<span className='text-2xl font-semibold'>
									{transaction.rate}
								</span>

								<p className='text-xs text-muted-foreground'>
									Exchange rate
								</p>
							</div>

							<div className='flex flex-col rounded-md border px-4 py-2 text-sm'>
								<p className='text-gray-600'>Margin(KES)</p>
								<span className='text-2xl font-semibold'>
									{transaction.margin}
								</span>

								<p className='text-xs text-muted-foreground'>
									Profit margin
								</p>
							</div>

							<div className='flex flex-col rounded-md border px-4 py-2 text-sm'>
								<p className='text-gray-600'>Profit(KES)</p>
								<span className='text-2xl font-semibold'>
									{transaction.profit}
								</span>

								<p className='text-xs text-muted-foreground'>
									Total profit made.
								</p>
							</div>
						</div>
					</div>

					<TransactionDetails transaction={transaction} />
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}

export default TransactionModal

type UserDeleteProps = {
	transactionId: string
	refreshTnxs: () => void
}

export function ConfirmTnxDelete({
	transactionId,
	refreshTnxs
}: UserDeleteProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleDeleteEmail() {
		setIsLoading(true)
		const response = await deleteTransaction(transactionId)
		setIsLoading(false)

		if (!response) return
		refreshTnxs()
		toast.success(response.message)
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive' size='sm' className=''>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						remove this record from our servers. Note: Transaction
						records are important for auditing purposes.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex items-center '>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteEmail}
						className={cn(
							buttonVariants({
								variant: 'destructive',
								size: 'sm'
							})
						)}
					>
						{isLoading ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Continue'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

const TransactionDetails = ({
	transaction
}: {
	transaction: UserTransactionType
}) => {
	return (
		<section>
			<p className='mt-4 rounded-lg border p-1 px-3 text-sm text-gray-500'>
				Mpesa Desc:&nbsp;
				<span className='font-normal text-gray-700'>
					{transaction.mpesaInit.ResponseDescription}
				</span>
			</p>

			<div className='mt-4 grid grid-cols-1 gap-1 md:grid-cols-2'>
				<p className='px-3 text-sm text-gray-700'>
					Point of failure:&nbsp;
					<Badge
						variant='secondary'
						className={cn('font-normal capitalize')}
					>
						{transaction.pointOfFailure}
					</Badge>
				</p>

				<p className='px-3 text-sm text-gray-700'>
					Initiator:&nbsp;
					<Badge
						variant='secondary'
						className={cn('font-normal capitalize')}
					>
						{transaction.initiator}
					</Badge>
				</p>

				<div className='flex items-center px-3 text-sm text-gray-700'>
					<p> Mpesa Code: </p>
					<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
						{transaction.mpesaCode.slice(0,8)}...&nbsp;
						<Copy
							size={16}
							onClick={() =>
								copyToClipboard(transaction.mpesaCode)
							}
							className='cursor-pointer hover:opacity-80 active:opacity-100'
						/>
					</p>
				</div>

				<div className='flex items-center px-3 text-sm text-gray-700'>
					<p> Deriv Code: </p>
					<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
						{transaction.derivCode.slice(0,14)}...&nbsp;
						<Copy
							size={16}
							onClick={() =>
								copyToClipboard(transaction.derivCode)
							}
							className='cursor-pointer hover:opacity-80 active:opacity-100'
						/>
					</p>
				</div>

				<div className='flex items-center px-3 text-sm text-gray-700'>
					<p> Deriv Acct: </p>
					<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
						{transaction.mpesaInit.DerivAccount}&nbsp;
						<Copy
							size={16}
							onClick={() =>
								copyToClipboard(
									transaction.mpesaInit.DerivAccount
								)
							}
							className='cursor-pointer hover:opacity-80 active:opacity-100'
						/>
					</p>
				</div>

				<div className='flex items-center px-3 text-sm text-gray-700'>
					<p> Phone No: </p>
					<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
						{transaction.mpesaInit.PhoneNumber}&nbsp;
						<Copy
							size={16}
							onClick={() =>
								copyToClipboard(
									transaction.mpesaInit.PhoneNumber
								)
							}
							className='cursor-pointer hover:opacity-80 active:opacity-100'
						/>
					</p>
				</div>
			</div>
		</section>
	)
}
