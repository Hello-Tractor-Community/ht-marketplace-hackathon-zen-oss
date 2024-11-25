import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { EllipsisVertical, Loader } from 'lucide-react'
import { DEFAULT_SLIDES } from '@/components/home/banner'
import { ConfirmListingDelete, ListingModal } from './listings-modal'

type UsersTableProps = {
	listings: typeof DEFAULT_SLIDES
	isLoading: boolean
	refreshTnxs: () => void
}

export function ListingsTable({
	listings,
	isLoading,
	refreshTnxs
}: UsersTableProps) {
	return (
		<Table className='border-gray-200 font-manrope'>
			<TableHeader className=''>
				{isLoading ? (
					<TableRow className='col-span-5'></TableRow>
				) : (
					<TableRow className='divide-x'>
						<TableHead className='w-fit px-4 py-5'>User</TableHead>
						<TableHead className='px-4'>Model</TableHead>
						<TableHead className='text-center'>Type</TableHead>
						<TableHead className='text-center'>Status</TableHead>
						<TableHead className='px-4'>Action</TableHead>
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
					listings.map((listing, i) => (
						<TableRow key={'listing' + i} className='divide-x'>
							<TableCell className='flex gap-2.5 px-4'>
								<img
									src={''}
									alt={listing.model}
									width={32}
									height={32}
									className='h-10 w-10'
								/>
								<div className='flex flex-col gap-[1px]'>
									<span className='md:px-2'>John Doe</span>
									<span className='w-fit rounded-xl bg-slate-50 px-2 text-xs text-gray-500'>
										john.doe@mails.com
									</span>
								</div>
							</TableCell>
							<TableCell className='px-4 capitalize'>
								{listing.model}
							</TableCell>
							<TableCell className='text-center'>New</TableCell>
							<TableCell className='text-center'>
								<Badge
									variant='outline'
									className={cn(
										'border-yellow-500 bg-yellow-100 text-xs text-yellow-500',
										{
											'border-red-500 bg-red-100 text-red-500':
												false
										},
										{
											'border-emerald-500 bg-emerald-100 text-emerald-500':
												true
										}
									)}
								>
									Approved
								</Badge>
							</TableCell>
							<TableCell>
								<div className='flex h-full items-center justify-between gap-2.5 px-4'>
									<ConfirmListingDelete
										listingId=''
										refreshTnxs={refreshTnxs}
									/>
									<ListingModal listing={listing}>
										<EllipsisVertical
											size={28}
											className='cursor-pointer rounded-full border p-1 hover:bg-slate-100 active:bg-white'
										/>
									</ListingModal>
								</div>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
