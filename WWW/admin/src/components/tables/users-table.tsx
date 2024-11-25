import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { dateDistance } from '@/lib/utils'
import { UserType } from '@/types'
import { EllipsisVertical, Loader } from 'lucide-react'
import UserModal, { ConfirmUserDelete } from '../modals/user-modal'
import Image from 'next/image'
import { getAvatarImg } from '@/lib/avatar'

type UsersTableProps = {
	users: UserType[]
	isLoading: boolean
	refreshUsers: () => void
}

export function UsersTable({
	users,
	isLoading,
	refreshUsers
}: UsersTableProps) {
	return (
		<Table>
			<TableHeader className=''>
				{isLoading ? (
					<TableRow className='col-span-5'></TableRow>
				) : (
					<TableRow className='divide-x'>
						<TableHead className='w-fit py-6'>User</TableHead>
						<TableHead>Today Txs</TableHead>
						<TableHead className=''>All Txs</TableHead>
						<TableHead>Support</TableHead>
						<TableHead>Last Login</TableHead>
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
					users.map((user) => (
						<TableRow key={user._id} className='divide-x'>
							<TableCell className='flex gap-2.5'>
								<img
									src={getAvatarImg(user.name)}
									alt={user.name}
									width={32}
									height={32}
									className='h-10 w-10'
								/>
								<div className='flex flex-col gap-[1px]'>
									<span className='md:px-2'>{user.name}</span>
									<span className='w-fit rounded-xl bg-slate-50 px-2 text-xs text-gray-500'>
										{user.email}
									</span>
								</div>
							</TableCell>
							<TableCell>{user.todayTransactions}</TableCell>
							<TableCell className=''>
								{user.totalTransactions}
							</TableCell>
							<TableCell>{user.support.length}</TableCell>
							<TableCell className=''>
								{dateDistance(user.lastLogin)}
							</TableCell>
							<TableCell>
								<div className='flex h-full  items-center gap-2.5'>
									<ConfirmUserDelete
										userId={user._id}
										refreshUsers={refreshUsers}
									/>
									<UserModal
										user={user}
										refreshUsers={refreshUsers}
									>
										<EllipsisVertical
											size={28}
											className='cursor-pointer rounded-full border p-1 hover:bg-slate-100 active:bg-white'
										/>
									</UserModal>
								</div>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
