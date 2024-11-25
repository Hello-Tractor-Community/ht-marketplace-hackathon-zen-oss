import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
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
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { AdminRole, AdminType } from '@/types'
import { Button } from '@/components/ui/button'
import { ChevronDown, Copy, Loader } from 'lucide-react'
import { deleteAdmin, updateAdminRole } from '@/apis/auth'
import { copyToClipboard, dateDistance } from '@/lib/utils'

type UsersTableProps = {
	admins: AdminType[]
	isLoading: boolean
	refreshData: () => void
}

export function AdminTable({
	admins,
	isLoading,
	refreshData
}: UsersTableProps) {
	return (
		<Table className='rounded-lg border bg-white'>
			<TableHeader className=''>
				<TableRow className='divide-x'>
					<TableHead className='w-fit py-6'>User</TableHead>
					<TableHead className=''>Id</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Last Login</TableHead>
					<TableHead className='text-center'>Action</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody className={'text-gray-800'}>
				{isLoading ? (
					<TableRow>
						<TableCell
							colSpan={5}
							className='flex items-center justify-center'
						>
							<Loader className='animate-spin' />
							&nbsp;Loading ...
						</TableCell>
					</TableRow>
				) : (
					admins.map((user) => (
						<TableRow key={user._id} className='divide-x'>
							<TableCell className='flex flex-col gap-[1px] md:px-4'>
								<span className=''>{user.name}</span>
								<span className='text-xs text-gray-500'>
									{user.email}
								</span>
							</TableCell>
							<TableCell className=''>
								<span className='flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-gray-700'>
									{user._id}&nbsp;
									<Copy
										size={18}
										onClick={() =>
											copyToClipboard(user._id)
										}
										className='cursor-pointer hover:opacity-80 active:opacity-100'
									/>
								</span>
							</TableCell>
							<TableCell>
								<UpdateUserRole
									refreshData={refreshData}
									role={user.role}
									id={user._id}
								/>
							</TableCell>
							<TableCell className=''>
								{dateDistance(user.lastLogin)}
							</TableCell>
							<TableCell className='md:text-center'>
								<ConfirmDeleteAdmin
									name={user.name}
									id={user._id}
									refreshData={refreshData}
								/>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}

type AlertDialogProps = {
	name: string
	id: string
	refreshData: () => void
}
function ConfirmDeleteAdmin({ name, id, refreshData }: AlertDialogProps) {
	const handleDeleteAdmin = async () => {
		let response = await deleteAdmin(id)

		if (!response) return
		toast.success(response.message)
		refreshData()
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'> Delete </Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete {name}'s account and remove their data from our
						server
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteAdmin}
						className='bg-red-600 hover:bg-red-500 active:opacity-80'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

interface UpdateUserRoleProps {
	role: AdminRole
	id: string
	refreshData: () => void
}
export function UpdateUserRole({ role, id, refreshData }: UpdateUserRoleProps) {
	const [position, setPosition] = useState<AdminRole>(role)

	const handleValueChange = async (value: string) => {
		setPosition(value as AdminRole)

		let response = await updateAdminRole({
			id,
			role: value as AdminRole
		})

		if (!response) return

		toast.success(response.message)
		refreshData()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Badge
					variant='secondary'
					className='flex items-center gap-0.5 border border-transparent text-gray-600 hover:border-gray-300'
				>
					{role} <ChevronDown size={18} />
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Admin Role</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={position}
					onValueChange={handleValueChange}
				>
					<DropdownMenuRadioItem value='super'>
						super
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='admin'>
						admin
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
