'use client'

import {
	Activity,
	ChartNetwork,
	DraftingCompass,
	Gem,
	UserPlus,
	UserRound
} from 'lucide-react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

type Props = {
	totalUsers: number
    todayUsers: number
	todayTransactions: number
	todayProfit: number
}
export const TodayStats = ({
	totalUsers = 0,
	todayTransactions = 0,
	todayProfit = 0,
	todayUsers = 0
}: Props) => {
	return (
		<Card className=''>
			<CardHeader>
				<CardTitle className='text-gray-800'>Analytics</CardTitle>
				<CardDescription className='text-gray-600'>
					Site analytics overview
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<StatsCard
						name='Total Users'
						number={totalUsers}
						iconBgColor='bg-orange-200 border-orange-300'
						description='Total all time accounts created'
						icon={
							<UserRound
								size={20}
								className='h-8 w-8 p-1 text-muted-foreground text-orange-600'
							/>
						}
					/>
					<StatsCard
						name='Users Today'
						number={todayUsers}
						iconBgColor='bg-yellow-100 border-yellow-300'
						description='Total accounts created today'
						icon={
							<UserPlus
								size={20}
								className='h-8 w-8 p-1  text-muted-foreground text-yellow-500'
							/>
						}
					/>
					<StatsCard
						name='Transactions Today'
						number={todayTransactions}
						iconBgColor='bg-green-200 border-green-200'
						description='Total Transaction perfomed today'
						icon={
							<Activity
								size={20}
								className='h-8 w-8 p-1  text-green-600'
							/>
						}
					/>
					<StatsCard
						name='Profit Today'
						number={todayProfit}
						iconBgColor='bg-purple-200 border-purple-300'
						description='Total profit made today'
						icon={
							<DraftingCompass
								size={20}
								className='h-8 w-8 p-1  text-muted-foreground text-purple-600'
							/>
						}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

interface TokenStatsProps {
	today: number
	month: number
}
export const TokenStats = ({ today, month }: TokenStatsProps) => {
	return (
		<Card className=''>
			<CardHeader>
				<CardTitle className='text-gray-800'>Token Stats</CardTitle>
				<CardDescription className='text-gray-600'>
					Token usage overview
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-4'>
					<StatsCard
						name='Tokens Today'
						number={today}
						iconBgColor='bg-green-100 border-green-200'
						description='Tokens spent today'
						icon={
							<Gem
								size={20}
								className='h-8 w-8 p-1  text-green-400 text-muted-foreground'
							/>
						}
					/>
					<StatsCard
						name='Tokens Monthly'
						number={month}
						iconBgColor='bg-purple-100 border-purple-300'
						description='Total spent this month'
						icon={
							<ChartNetwork
								size={20}
								className='h-8 w-8 p-1  text-muted-foreground text-purple-500'
							/>
						}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

interface IStatsCardProps {
	name: string
	number: number
	icon: React.ReactNode
	iconBgColor: string
	description: string
}

export const StatsCard = ({
	name,
	number,
	icon,
	iconBgColor,
	description
}: IStatsCardProps) => {
	return (
		<Card className='w-full flex-1'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
				<CardTitle className='text-lg font-medium text-gray-600'>
					{name}
				</CardTitle>
			</CardHeader>

			<CardContent className='flex items-center justify-between'>
				<div>
					<p className='text-5xl font-semibold text-gray-800'>
						{number}
					</p>
					<p className='mt-2 text-xs font-normal text-gray-500'>
						{description}
					</p>
				</div>

				<span className={`${iconBgColor} rounded-full border p-1`}>
					{icon}
				</span>
			</CardContent>
		</Card>
	)
}
