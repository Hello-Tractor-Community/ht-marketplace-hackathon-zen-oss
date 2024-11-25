'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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
	chats: {
		label: 'Chats',
		color: 'hsl(var(--chart-1))'
	}
} satisfies ChartConfig

type Props = {
	chartData: Record<string, number>[]
}
export default function MonthlyProfit({ chartData }: Props) {
	let thisMonth = chartData[chartData.length - 1]?.amount
	let lastMonth = chartData[chartData.length - 2]?.amount
	let userDiff = thisMonth - lastMonth
	let chatDiffPercentage =
		userDiff === 0 ? 0 : (userDiff / (lastMonth < 1 ? 1 : lastMonth)) * 100
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-gray-700'>MonthlyProfit</CardTitle>
				<CardDescription className='text-muted-foreground'>
					Last year
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={5}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' />}
						/>
						<Area
							dataKey='amount'
							type='natural'
							fill='var(--color-chats)'
							fillOpacity={0.4}
							stroke='var(--color-chats)'
							stackId='a'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						<div className='flex items-center gap-2 font-medium leading-none text-gray-700'>
							Trending up by {chatDiffPercentage.toFixed(2)}% this
							month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>
							Showing monthly profit for the last 12 months
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
