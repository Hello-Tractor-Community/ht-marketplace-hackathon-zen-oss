import { useState } from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { ArrowDownNarrowWide, ChevronDown, Cog, Map } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const statuses = [
	{
		value: 'backlog',
		label: 'Backlog'
	},
	{
		value: 'todo',
		label: 'Todo'
	},
	{
		value: 'in progress',
		label: 'In Progress'
	},
	{
		value: 'done',
		label: 'Done'
	},
	{
		value: 'canceled',
		label: 'Canceled'
	}
]

interface FilterProps {
	className?: string
}

export default function Filters({ className }: FilterProps) {
	const [selectedStatus, setSelectedStatus] = useState<
		(typeof statuses)[0] | null
	>(null)
	return (
		<div className={cn('container -mt-4 flex flex-col gap-4', className)}>
			<div className='flex items-center gap-12'>
				<div className='flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-slate-100 p-1'>
					<p className='cursor-pointer rounded-full bg-gray-500 px-3 py-1 font-manrope text-xs text-white hover:bg-slate-200'>
						All
					</p>
					<p className='cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200 '>
						Used
					</p>
					<p className='cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200 '>
						New
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<SelectDropdown
						type='Brand'
						icon={<ChevronDown size={16} />}
						selectedItem={selectedStatus}
						setSelectedItem={setSelectedStatus}
					/>

					<SelectDropdown
						type='Horse Power'
						icon={<ChevronDown size={16} />}
						selectedItem={selectedStatus}
						setSelectedItem={setSelectedStatus}
					/>

					<SelectDropdown
						type='Year'
						icon={<ChevronDown size={16} />}
						selectedItem={selectedStatus}
						setSelectedItem={setSelectedStatus}
					/>
				</div>

				<div className='flex items-center gap-2'>
					<SelectDropdown
						type='Engine Hours'
						icon={<Cog size={16} />}
						selectedItem={selectedStatus}
						setSelectedItem={setSelectedStatus}
					/>

					<SelectDropdown
						type='Price'
						icon={<ArrowDownNarrowWide size={16} />}
						selectedItem={selectedStatus}
						setSelectedItem={setSelectedStatus}
					/>
				</div>

				<Link
					href='/'
					className='ml-auto flex items-center gap-2 text-sm underline-offset-2 hover:text-htractor-sage hover:underline'
				>
					<Map size={20} />
					<span>See our dealers near you.</span>
				</Link>
			</div>

			<p className='font-manrope'>
				Result: <span className='font-semibold'>124</span> tractors
				found for <span className='font-semibold'>Case Ih jx</span>
			</p>
		</div>
	)
}

interface SelectDropdownProps {
	type: string
	icon: React.ReactNode
	selectedItem: (typeof statuses)[0] | null
	setSelectedItem: React.Dispatch<
		React.SetStateAction<(typeof statuses)[0] | null>
	>
}

const SelectDropdown = ({
	type,
	icon,
	selectedItem,
	setSelectedItem
}: SelectDropdownProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<div className='flex items-center gap-1 rounded-full border border-gray-200 bg-slate-100 p-2 px-4 font-manrope'>
					<span className='text-xs capitalize'>
						{selectedItem?.label || type}
					</span>
					{icon}
				</div>
			</PopoverTrigger>
			<PopoverContent className='p-0' side='bottom' align='start'>
				<Command>
					<CommandInput placeholder='Change status...' />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{statuses.map((status) => (
								<CommandItem
									key={status.value}
									value={status.value}
									onSelect={(value) => {
										setSelectedItem(
											statuses.find(
												(priority) =>
													priority.value === value
											) || null
										)
										setOpen(false)
									}}
									className='cursor-pointer'
								>
									<span>{status.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
