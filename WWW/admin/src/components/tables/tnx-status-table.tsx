import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Badge } from '../ui/badge'
import { Copy, Loader } from 'lucide-react'
import type { TnxStatusCheck } from '@/types'
import { cn, copyToClipboard, dateDistance } from '@/lib/utils'
import { deleteTransactionStatus } from '@/apis/tnxs'
import { toast } from 'sonner'
import { Button } from '../ui/button'

type UsersTableProps = {
	transactions: TnxStatusCheck[]
	isLoading: boolean
	refreshTnxs: () => void
}

export function TransactionStatusTable({
	transactions,
	isLoading,
	refreshTnxs
}: UsersTableProps) {
	if (isLoading) {
		return (
			<div className='flex items-center justify-center'>
				<Loader className='animate-spin' />
				&nbsp;Loading ...
			</div>
		)
	}

	async function deleteTnx(id: string) {
		const response = await deleteTransactionStatus(id)

		if (!response) return
		toast.success('Transaction status deleted successfully')

		refreshTnxs()
	}

	return (
		<Table>
			<TableHeader className=''>
				<TableRow className='divide-x'>
					<TableHead className='w-fit py-6'>Type</TableHead>
					<TableHead>Mpesa ID</TableHead>
					<TableHead>Tnx Status</TableHead>
					<TableHead>Mpesa Response</TableHead>
					<TableHead>Checked At</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody className={'text-gray-800'}>
				{transactions.map((tnx) => (
					<TableRow key={tnx._id} className='divide-x'>
						<TableCell className=''>
							<Badge variant='outline'>{tnx.type}</Badge>
						</TableCell>
						<TableCell>
							<span className='flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-gray-700'>
								{tnx.tnxId}&nbsp;
								<Copy
									size={18}
									onClick={() => copyToClipboard(tnx.tnxId)}
									className='cursor-pointer hover:opacity-80 active:opacity-100'
								/>
							</span>
						</TableCell>
						<TableCell className=''>
							<Badge
								variant='secondary'
								className={cn(
									{
										'bg-red-100 text-red-500':
											tnx.status == 'failed'
									},
									{
										'bg-green-100 text-green-500':
											tnx.status == 'completed'
									}
								)}
							>
								{tnx.status}
							</Badge>
						</TableCell>
						<TableCell>
							{tnx.processed ? 'Received' : 'Pending'}
						</TableCell>
						<TableCell className=''>
							{dateDistance(tnx.updatedAt)}
						</TableCell>
						<TableCell>
							<Button
								variant='destructive'
								onClick={() => deleteTnx(tnx._id)}
							>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
