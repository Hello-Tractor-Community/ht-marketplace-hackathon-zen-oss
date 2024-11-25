import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Badge } from '../ui/badge'
import type { EmailType } from '@/types'
import { formatDate } from '@/lib/utils'
import { getAvatarImg } from '@/lib/avatar'
import { EllipsisVertical, Loader } from 'lucide-react'
import { ConfirmUserDelete } from '../modals/user-modal'
import EmailModal, { ConfirmEmailDelete } from '../modals/email-modal'

type UsersTableProps = {
	emails: EmailType[]
	isLoading: boolean
	refreshEmails: () => void
}

export function EmailTable({
	emails,
	isLoading,
	refreshEmails
}: UsersTableProps) {
	return (
		<Table>
			<TableHeader className=''>
				{isLoading ? (
					<TableRow className='col-span-5'></TableRow>
				) : (
					<TableRow className='divide-x'>
						<TableHead className='w-fit py-6'>Sender</TableHead>
						<TableHead>Recipient</TableHead>
						<TableHead>isUser</TableHead>
						<TableHead>Subject</TableHead>
						<TableHead className=''>Date</TableHead>
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
					emails.map((email) => (
						<TableRow key={email._id} className='divide-x'>
							<TableCell className='flex gap-2.5'>
								<img
									src={getAvatarImg(email.sender.name)}
									alt={email.sender.name}
									width={32}
									height={32}
									className='h-10 w-10'
								/>
								<div className='flex flex-col gap-[1px]'>
									<span className='md:px-2'>
										{email.sender.name}
									</span>
									<span className='w-fit rounded-xl bg-slate-50 px-2 text-xs text-gray-500'>
										{email.sender.email}
									</span>
								</div>
							</TableCell>
							<TableCell>{email.recepient}</TableCell>
							<TableCell className=''>
								<Badge
									variant={
										email.isUser ? 'outline' : 'secondary'
									}
								>
									{email.isUser ? 'user' : 'non-user'}
								</Badge>
							</TableCell>
							<TableCell>
								{email.subject.substring(0, 20)}...
							</TableCell>
							<TableCell className=''>
								{formatDate(email.createdAt)}
							</TableCell>
							<TableCell>
								<div className='flex h-full  items-center gap-2.5'>
									<ConfirmEmailDelete
										emailId={email._id}
										refreshEmails={refreshEmails}
									/>
									<EmailModal email={email}>
										<EllipsisVertical
											size={28}
											className='cursor-pointer rounded-full border p-1 hover:bg-slate-100 active:bg-white'
										/>
									</EmailModal>
								</div>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
