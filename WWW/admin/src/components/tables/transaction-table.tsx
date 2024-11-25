import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Copy, EllipsisVertical, Loader } from 'lucide-react'
import type { UserTransactionType } from '@/types'
import { getAvatarImg } from '@/lib/avatar'
import { Badge } from '../ui/badge'
import TransactionModal, { ConfirmTnxDelete } from '../modals/transaction-modal'
import { cn, copyToClipboard } from '@/lib/utils'

type UsersTableProps = {
	transactions: UserTransactionType[]
	isLoading: boolean
	refreshTnxs: () => void
}

export function TransactionTable({
	transactions,
	isLoading,
	refreshTnxs
}: UsersTableProps) {
	return (
		<Table>
			<TableHeader className=''>
				{isLoading ? (
					<TableRow className='col-span-5'></TableRow>
				) : (
					<TableRow className='divide-x'>
						<TableHead className='w-fit py-6'>User</TableHead>
						<TableHead>Tnx</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Amount USD</TableHead>
						<TableHead className=''>Rate</TableHead>
						<TableHead>Profit</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				)}
			</TableHeader>

			<TableBody className={'text-gray-800'}>
				{isLoading ? (
					<TableRow className='col-span-5'>
						<TableCell
							colSpan={5}
							className='flex items-center justify-center'
						>
							<Loader className='animate-spin' />
							&nbsp;Loading ...
						</TableCell>
					</TableRow>
				) : (
					transactions.map((tnx) => (
						<TableRow key={tnx._id} className='divide-x'>
							<TableCell className='flex gap-2.5'>
								<img
									src={getAvatarImg(tnx.user.name)}
									alt={tnx.user.name}
									width={32}
									height={32}
									className='h-10 w-10'
								/>
								<div className='flex flex-col gap-[1px]'>
									<span className='md:px-2'>
										{tnx.user.name}
									</span>
									<span className='w-fit rounded-xl bg-slate-50 px-2 text-xs text-gray-500'>
										{tnx.user.email}
									</span>
								</div>
							</TableCell>
							<TableCell>
								<span className='flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-gray-700'>
									{tnx._id.slice(0, 12)}...&nbsp;
									<Copy
										size={18}
										onClick={() => copyToClipboard(tnx._id)}
										className='cursor-pointer hover:opacity-80 active:opacity-100'
									/>
								</span>
							</TableCell>
							<TableCell className=''>
								<Badge
									variant={
										tnx.type == 'deposit'
											? 'outline'
											: 'secondary'
									}
								>
									{tnx.type}
								</Badge>
							</TableCell>
							<TableCell>
								<Badge
									variant='outline'
									className={cn(
										'border-yellow-500 bg-yellow-100 text-xs text-yellow-500',
										{
											'border-red-500 bg-red-100 text-red-500':
												tnx.status == 'failed'
										},
										{
											'border-emerald-500 bg-emerald-100 text-emerald-500':
												tnx.status == 'completed'
										}
									)}
								>
									{tnx.status}
								</Badge>
							</TableCell>
							<TableCell>{tnx.amount}</TableCell>
							<TableCell className=''>{tnx.rate}</TableCell>
							<TableCell className=''>{tnx.profit}</TableCell>
							<TableCell>
								<div className='flex h-full  items-center gap-2.5'>
									<ConfirmTnxDelete
										transactionId={tnx._id}
										refreshTnxs={refreshTnxs}
									/>
									<TransactionModal transaction={tnx}>
										<EllipsisVertical
											size={28}
											className='cursor-pointer rounded-full border p-1 hover:bg-slate-100 active:bg-white'
										/>
									</TransactionModal>
								</div>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
