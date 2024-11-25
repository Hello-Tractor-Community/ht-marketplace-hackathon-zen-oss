'use client'

import { getSettings, updateSettings } from '@/apis/settings'
import { SettingsType } from '@/types'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Construction,
	DollarSign,
	Euro,
	Landmark,
	LoaderCircle,
	UsersRound
} from 'lucide-react'
import { toast } from 'sonner'
import Loader from '@/components/loader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ForexModal from '@/components/modals/forex-modal'

function Page() {
	const [settings, setSettings] = useState<SettingsType>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchSettings = async () => {
		setIsLoading(true)
		let response = await getSettings()
		setIsLoading(false)

		if (!response) return

		setSettings(response.data)
	}

	useEffect(() => {
		fetchSettings()
	}, [])
	return (
		<div className='flex flex-1 flex-col gap-4 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
			{isLoading ? (
				<Loader />
			) : (
				settings && (
					<>
						<SignUps
							settings={settings}
							refreshData={() => fetchSettings()}
						/>
						<Transactions
							settings={settings}
							refreshData={() => fetchSettings()}
						/>
						<AmountLimits
							settings={settings}
							refreshData={() => fetchSettings()}
						/>
						<Maintenance
							settings={settings}
							refreshData={() => fetchSettings()}
						/>
					</>
				)
			)}
		</div>
	)
}

type SectionProps = {
	settings: SettingsType
	refreshData: () => void
}
function SignUps({ settings, refreshData }: SectionProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [allowSignUps, setAllowSignUps] = useState<boolean>(
		settings.allowSignup
	)

	const handleSaveSettings = async () => {
		setIsLoading(true)
		let response = await updateSettings({
			allowSignup: allowSignUps,
			allowDeposits: settings.allowDeposits,
			allowWithdrawals: settings.allowWithdrawals,
			isMaintenance: settings.isMaintenance,
            amountLimits: settings.amountLimits,
			margins: settings.margins
		})
		setIsLoading(false)

		if (!response) return

		refreshData()
		toast.success(response.message)
	}
	return (
		<Card className='rounded-none shadow-none'>
			<CardHeader>
				<CardTitle className='flex items-center gap-1 font-medium'>
					<UsersRound
						size={30}
						className='rounded-lg border p-1 text-primary'
					/>
					New Users
				</CardTitle>
				<CardDescription>
					Allow new users to sign up to the platform
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex items-center gap-2.5'>
					<Checkbox
						checked={allowSignUps}
						onCheckedChange={() => setAllowSignUps(!allowSignUps)}
					/>
					<p className='text-gray-800'>
						{allowSignUps
							? 'A User can sign up'
							: 'Users not allowed to sign up'}
					</p>
				</div>
			</CardContent>
			<CardFooter className='border-t px-6 py-4'>
				<Button onClick={handleSaveSettings}>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Save'
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}

function Transactions({ settings, refreshData }: SectionProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [margin, setMargin] = useState<number>(settings.margins)
	const [trnxData, setTrnxData] = useState({
		deposit: settings.allowDeposits,
		withdraw: settings.allowWithdrawals
	})

	const handleSaveSettings = async () => {
		setIsLoading(true)
		let response = await updateSettings({
			allowSignup: settings.allowSignup,
			allowDeposits: trnxData.deposit,
			allowWithdrawals: trnxData.withdraw,
			isMaintenance: settings.isMaintenance,
            amountLimits: settings.amountLimits,
			margins: margin
		})
		setIsLoading(false)

		if (!response) return

		refreshData()
		toast.success(response.message)
	}
	return (
		<Card className='rounded-none shadow-none'>
			<CardHeader>
				<div className='flex flex-row items-center justify-between'>
					<CardTitle className='flex items-center gap-1 font-medium'>
						<Landmark
							size={30}
							className='rounded-lg border p-1 text-primary'
						/>
						Transactions
					</CardTitle>

					<ForexModal settings={settings}>
						<div className='flex items-center gap-1 rounded-lg border px-2 py-1 text-sm text-primary shadow hover:shadow-none active:opacity-80'>
							<Euro size={18} className='' />
							<span>Rates</span>
						</div>
					</ForexModal>
				</div>
				<CardDescription>
					Allow user transactions on the platform
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='space-y-1'>
					<Label className='font-normal text-gray-700'>
						Margins (Ksh)
					</Label>
					<Input
						type='number'
						placeholder='Enter margin e.g 3'
						min={0}
						max={5}
						value={margin}
						onChange={(e) => setMargin(parseInt(e.target.value))}
					/>
				</div>

				<div className='flex flex-col items-center gap-2.5 pt-4 md:flex-row md:gap-4'>
					<div className='flex items-center gap-2'>
						<Checkbox
							checked={trnxData.deposit}
							onCheckedChange={() =>
								setTrnxData({
									...trnxData,
									deposit: !trnxData.deposit
								})
							}
						/>
						<p className='text-sm text-gray-800'>
							{trnxData.deposit
								? 'A User can deposit'
								: 'Deposits not allowed'}
						</p>
					</div>

					<div className='flex items-center gap-2'>
						<Checkbox
							checked={trnxData.withdraw}
							onCheckedChange={() =>
								setTrnxData({
									...trnxData,
									withdraw: !trnxData.withdraw
								})
							}
						/>
						<p className='text-sm text-gray-800'>
							{trnxData.withdraw
								? 'A User can withdraw'
								: 'Withdrawals not allowed'}
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className='border-t px-6 py-4'>
				<Button onClick={handleSaveSettings}>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Save'
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}

function AmountLimits({ settings, refreshData }: SectionProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [limitData, setLimitData] = useState({
		deposit: settings.amountLimits.depositLimit,
		withdraw: settings.amountLimits.withdrawLimit
	})

	const handleSaveSettings = async () => {
		setIsLoading(true)
		let response = await updateSettings({
			allowSignup: settings.allowSignup,
			allowDeposits: settings.allowDeposits,
			allowWithdrawals: settings.allowWithdrawals,
			isMaintenance: settings.isMaintenance,
            amountLimits: {
                depositLimit: limitData.deposit,
                withdrawLimit: limitData.withdraw
            },
			margins: settings.margins
		})
		setIsLoading(false)

		if (!response) return

		refreshData()
		toast.success(response.message)
	}
	return (
		<Card className='rounded-none shadow-none'>
			<CardHeader>
				<CardTitle className='flex items-center gap-1 font-medium'>
					<DollarSign
						size={30}
						className='rounded-lg border p-1 text-primary'
					/>
					Transaction Limits
				</CardTitle>
				<CardDescription>
					Set the amount limits for deposits and withdrawals
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='space-y-1'>
					<Label className='font-normal text-gray-700'>
						Deposit (USD)
					</Label>
					<Input
						type='number'
						placeholder='Enter limit e.g 30'
						min={5}
						value={limitData.deposit}
						onChange={(e) =>
							setLimitData({
								...limitData,
								deposit: parseInt(e.target.value)
							})
						}
					/>
				</div>

				<div className='space-y-1'>
					<Label className='font-normal text-gray-700'>
						Withdrawals (USD)
					</Label>
					<Input
						type='number'
						placeholder='Enter limit e.g 3'
						min={5}
						value={limitData.withdraw}
						onChange={(e) =>
							setLimitData({
								...limitData,
								withdraw: parseInt(e.target.value)
							})
						}
					/>
				</div>
			</CardContent>
			<CardFooter className='border-t px-6 py-4'>
				<Button onClick={handleSaveSettings}>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Save'
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}

function Maintenance({ settings, refreshData }: SectionProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMaintenance, setIsMaintenance] = useState<boolean>(
		settings.isMaintenance
	)

	const handleSaveSettings = async () => {
		setIsLoading(true)
		let response = await updateSettings({
			allowSignup: settings.allowSignup,
			allowDeposits: settings.allowDeposits,
			allowWithdrawals: settings.allowWithdrawals,
			margins: settings.margins,
            amountLimits: settings.amountLimits,
			isMaintenance
		})
		setIsLoading(false)

		if (!response) return

		refreshData()
		toast.success(response.message)
	}
	return (
		<Card className='rounded-none border-red-500 bg-red-50 shadow-none'>
			<CardHeader>
				<CardTitle className='flex items-center gap-1.5 font-medium text-red-500'>
					<Construction
						size={30}
						className='rounded-lg border border-red-500 p-1'
					/>
					Site Live Status
				</CardTitle>
				<CardDescription>
					Set the site to maintenance mode or live mode
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex items-center gap-2.5'>
					<Checkbox
						checked={!isMaintenance}
						onCheckedChange={() => setIsMaintenance(!isMaintenance)}
					/>
					<p className='text-gray-800'>
						{isMaintenance
							? 'The site is under maintenance'
							: 'The site is live'}
					</p>
				</div>
			</CardContent>
			<CardFooter className='border-t px-6 py-4'>
				<Button onClick={handleSaveSettings} variant='destructive'>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Update'
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}

//export default withAdminAuthRequired(Page)
export default Page
