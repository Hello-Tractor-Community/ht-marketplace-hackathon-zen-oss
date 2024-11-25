'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {
	calls: {
		label: 'Api calls',
		color: 'hsl(var(--chart-1))'
	}
} satisfies ChartConfig

type Props = {
	chartData: Record<string, number>[]
}
export default function UserStats({ chartData }: Props) {
	let thisMonth = chartData[chartData.length - 1]?.users
	let lastMonth = chartData[chartData.length - 2]?.users
	let userDiff = thisMonth - lastMonth
	let usageDiffPercentage =
		userDiff === 0 ? 0 : (userDiff / (lastMonth < 1 ? 1 : lastMonth)) * 100
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-gray-800'>Users</CardTitle>
				<CardDescription className='text-gray-600'>Last 6 months</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey='users'
							fill='var(--color-calls)'
							radius={8}
						>
							<LabelList
								position='top'
								offset={12}
								className='fill-foreground'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 text-gray-700 font-medium leading-none'>
					Trending up by {usageDiffPercentage.toFixed(2)}% this month{' '}
					<TrendingUp className='h-4 w-4' />
				</div>
				<div className='leading-none text-gray-500'>
					Showing new users for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}
