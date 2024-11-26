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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { TRACTOR_MODELS } from '@/constants/tractors'
import { ArrowDownNarrowWide, ChevronDown, Cog, Map } from 'lucide-react'
import { QueryKeys } from '@/types'
import { useUserStore } from '@/store/user-store'

interface FilterProps {
	className?: string
}

export default function Filters({ className }: FilterProps) {
	const router = useRouter()
	const { setQueryParams, queryParams } = useUserStore((state) => state)

	// Creates a new URLSearchParams and redirects to the new URL
	function goToSearch() {
		if (typeof window == 'undefined') return

		const searchParams = new URLSearchParams()
		for (const key in queryParams) {
			if (!queryParams[key as QueryKeys]) continue
			searchParams.set(key, queryParams[key as QueryKeys])
		}

		let newUrl =
			window.location.origin + '/search/' + '?' + searchParams.toString()

		router.push(newUrl)
	}

	useEffect(() => {
		if (typeof window == 'undefined') return

		const searchParams = new URLSearchParams(window.location.search)
		const newQueryParams = {} as Record<QueryKeys, string>

		for (const key in queryParams) {
			const value = searchParams.get(key)
			if (value) newQueryParams[key as QueryKeys] = value
		}

		setQueryParams(newQueryParams)
	}, [])

	return (
		<div
			className={cn(
				'-mt-4 flex flex-col gap-4 overflow-x-auto px-4 2xl:container',
				className
			)}
		>
			<div className='flex items-center gap-2 md:gap-4 2xl:gap-12'>
				<div className='flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-slate-100 p-1'>
					<p
						onClick={() => {
							setQueryParams({ ...queryParams, type: 'all' })
						}}
						className={cn(
							'cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200',
							{
								'bg-gray-500 text-white ':
									queryParams?.type == 'all'
							}
						)}
					>
						All
					</p>
					<p
						onClick={() => {
							setQueryParams({ ...queryParams, type: 'new' })
						}}
						className={cn(
							'cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200',
							{
								'bg-gray-500 text-white ':
									queryParams?.type == 'new'
							}
						)}
					>
						New
					</p>

					<p
						onClick={() => {
							setQueryParams({ ...queryParams, type: 'used' })
						}}
						className={cn(
							'cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200',
							{
								'bg-gray-500 text-white ':
									queryParams?.type == 'used'
							}
						)}
					>
						Used
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<SelectDropdown
						type='Brand'
						icon={<ChevronDown size={16} />}
						selectedItem={queryParams.brand}
						setSelectedItem={(item) => {
							if (item !== null) {
								setQueryParams({ ...queryParams, brand: item })
							}
						}}
						listItems={Object.keys(TRACTOR_MODELS)}
					/>

					<SelectDropdown
						type='Horse Power'
						icon={<ChevronDown size={16} />}
						selectedItem={queryParams.horsepower}
						setSelectedItem={(item) => {
							if (item !== null) {
								setQueryParams({
									...queryParams,
									horsepower: item
								})
							}
						}}
						listItems={[
							'0-50hp',
							'50-100hp',
							'100-200hp',
							'200+hp'
						]}
					/>

					<SelectDropdown
						type='Year'
						icon={<ChevronDown size={16} />}
						selectedItem={queryParams.year}
						setSelectedItem={(item) => {
							if (item !== null) {
								setQueryParams({ ...queryParams, year: item })
							}
						}}
						listItems={[
							'2009',
							'2010',
							'2011',
							'2012',
							'2013',
							'2014',
							'2015',
							'2016',
							'2017',
							'2019',
							'2020',
							'2021',
							'2022'
						]}
					/>
				</div>

				<div className='flex items-center gap-2'>
					<SelectDropdown
						type='Engine Hours'
						icon={<Cog size={16} />}
						selectedItem={queryParams.enginehours}
						setSelectedItem={(item) => {
							if (item !== null) {
								setQueryParams({
									...queryParams,
									enginehours: item
								})
							}
						}}
						listItems={[
							'0-500hrs',
							'500-1000hrs',
							'1000-2000hrs',
							'2000+hrs'
						]}
					/>

					<SelectDropdown
						type='Price'
						icon={<ArrowDownNarrowWide size={16} />}
						selectedItem={queryParams.price}
						setSelectedItem={(item) => {
							if (item !== null) {
								setQueryParams({
									...queryParams,
									price: item
								})
							}
						}}
						listItems={['500k-1.5m', '2m-3m', '4m-5m', '5m+']}
					/>

					<button
						onClick={goToSearch}
						className='cursor-pointer items-center gap-2 text-sm text-htractor underline underline-offset-2 hover:text-htractor-hibiscus hover:opacity-70 active:opacity-100 lg:flex'
					>
						Find tractor
					</button>
				</div>

				<Link
					href='/map'
					className='ml-auto hidden items-center gap-2 text-sm underline-offset-2 hover:text-htractor-sage hover:underline lg:flex'
				>
					<Map className='h-5 w-5' />
					<span className=''>See our dealers near you.</span>
				</Link>
			</div>
			<div className='mb-2' />

			<p className='hidden font-manrope'>
				Result: <span className='font-semibold'>124</span> tractors
				found for <span className='font-semibold'>Case Ih jx</span>
			</p>
		</div>
	)
}

interface SelectDropdownProps {
	type: string
	icon: React.ReactNode
	listItems: string[]
	selectedItem: string
	setSelectedItem: (item: string | null) => void
}

export const SelectDropdown = ({
	type,
	icon,
	listItems,
	selectedItem,
	setSelectedItem
}: SelectDropdownProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<div className='flex items-center gap-1 rounded-full border border-gray-200 bg-slate-100 p-2 px-4 font-manrope'>
					<span className='text-xs capitalize'>
						{selectedItem || type}
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
							{listItems.map((item, i) => (
								<CommandItem
									key={'brand-type-' + i}
									value={item}
									onSelect={(value) => {
										setSelectedItem(
											listItems.find(
												(priority) => priority === value
											) || null
										)
										setOpen(false)
									}}
									className='cursor-pointer'
								>
									<span>{item}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
