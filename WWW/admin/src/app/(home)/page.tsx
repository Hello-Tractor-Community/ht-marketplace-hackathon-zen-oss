'use client'

import { useEffect, useState } from 'react'
import { getWebsiteStats } from '@/apis/stats'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import UserStats from '@/components/charts/user-stats'
import DailyProfit from '@/components/charts/daily-profit'
import { TodayStats } from '@/components/charts/today-stats'
import MonthlyProfit from '@/components/charts/monthly-profit'

type StatsType = {
	todayProfit: number
	todayTransactions: number
	totalUsers: number
	todayUsers: number
	newUsersSixMonths: Record<string, number>[]
	profitStats: {
		today: number
		month: number
		monthlyProfit: Record<string, number>[]
		dailyProfit: Record<string, number>[]
	}
}

let defaultStats: StatsType = {
	todayProfit: 0,
	todayTransactions: 0,
	totalUsers: 0,
	todayUsers: 0,
	newUsersSixMonths: [],
	profitStats: {
		today: 0,
		month: 0,
		monthlyProfit: [],
		dailyProfit: []
	}
}

function Home() {
	const [stats, setStats] = useState<StatsType>(defaultStats)

	async function fetchStats() {
		let response = await getWebsiteStats()

		if (!response) return

		setStats(response.data)
	}

	useEffect(() => {
		fetchStats()
	}, [])

	return (
		<div className='flex-1 overflow-y-auto py-12 md:py-4'>
			<div className='flex w-full items-center justify-between px-6 md:hidden'>
				<h1 className='text-2xl font-bold text-gray-700'>Dashboard</h1>
			</div>
			<section className='flex flex-col space-y-[2rem] p-4 md:p-6'>
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
					<div className='lg:col-span-2'>
						<TodayStats
							totalUsers={stats.totalUsers}
							todayProfit={stats.todayProfit}
							todayTransactions={stats.todayTransactions}
							todayUsers={stats.todayUsers}
						/>
					</div>
					<UserStats chartData={stats.newUsersSixMonths} />
				</div>

				<div className=''>
					<div className='grid grid-cols-1 gap-4 md:flex-1 lg:grid-cols-2'>
						<DailyProfit chartData={stats.profitStats.dailyProfit} />
						<MonthlyProfit chartData={stats.profitStats.monthlyProfit} />
					</div>
				</div>
			</section>
		</div>
	)
}

//export default withAdminAuthRequired(Home)
export default Home
