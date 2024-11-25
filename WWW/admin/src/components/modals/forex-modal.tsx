import {
	Credenza,
	CredenzaBody,
	CredenzaContent,
	CredenzaDescription,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import { toast } from 'sonner'
import { useState } from 'react'
import type { SettingsType, TransactionType } from '@/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getAvatarImg } from '@/lib/avatar'
import { cn, dateDistance } from '@/lib/utils'
import {
	Send,
	LoaderCircle,
	Mail,
	UserRound,
	DollarSign,
	RotateCwSquare,
	Equal,
	Info,
	Plus,
	Clock
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { convertForexAmount } from '@/apis/tnxs'
import { Separator } from '../ui/separator'

type UserModalProps = {
	children: React.ReactNode
	settings: SettingsType
}

function ForexModal({ children, settings }: UserModalProps) {
	const [amount, setAmount] = useState<number>(0)
	const [profit, setProfit] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [type, setType] = useState<TransactionType>('withdrawal')
	const [convertedAmount, setConvertedAmount] = useState<number>(0)

	async function handleConvert() {
		if (amount <= 0) {
			toast.error('Amount must be greater than 0')
			return
		}

		setIsLoading(true)
		let response = await convertForexAmount({ amount, type })
		setIsLoading(false)
		if (!response) return

		toast.success(response.message)
		setProfit(response.data.profit)
		setConvertedAmount(response.data.amount)
	}

	return (
		<Credenza>
			<CredenzaTrigger>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>Exchange Rates</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						Upto date exchange rates used
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody className=''>
					<div className='flex flex-row items-center gap-2.5'>
						<div className='flex flex-1 flex-col rounded-md border px-4 py-2 text-sm'>
							<p className='text-gray-600'>Deposit</p>
							<span className='text-2xl font-semibold'>
								{settings.rate.deposit}
							</span>

							<p className='text-xs text-muted-foreground'>
								Rate used when depositing
							</p>
						</div>

						<div className='flex flex-1 flex-col rounded-md border px-4 py-2 text-sm'>
							<p className='text-gray-600'>Withdraw</p>
							<span className='text-2xl font-semibold'>
								{settings.rate.withdraw}
							</span>

							<p className='text-xs text-muted-foreground'>
								Rate used when withdrawing
							</p>
						</div>
					</div>

					<p className='flex mt-2 text-muted-foreground text-xs items-center gap-1'>
					<Clock size={14}/>Last updated {dateDistance(settings.rate.lastUpdate)}
					</p>

					<div className='mt-4'>
						<div className='mt-4 flex flex-row items-center rounded-md border'>
							<div className='h-full border-r p-2'>
								<DollarSign
									size={20}
									className='text-muted-foreground'
								/>
							</div>
							<Input
								type='number'
								value={amount}
								placeholder={'Enter amount'}
								onChange={(e) =>
									setAmount(parseInt(e.target.value))
								}
								className='rounded-l-none border-none bg-slate-50 ring-2 !ring-gray-200 ring-offset-2'
							/>
						</div>

						<RadioGroup
							defaultValue='withdrawal'
							className='mt-4 flex'
							onValueChange={(value: TransactionType) =>
								setType(value)
							}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='withdrawal'
									id='option-one'
								/>
								<Label
									htmlFor='option-one'
									className='text-sm font-normal text-muted-foreground'
								>
									Withdrawal
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='deposit'
									id='option-two'
								/>
								<Label
									htmlFor='option-two'
									className='text-sm font-normal text-muted-foreground'
								>
									Deposit
								</Label>
							</div>
						</RadioGroup>
						<div className='mt-4 flex items-center gap-2.5'>
							<Button
								onClick={handleConvert}
								className='flex items-center gap-1.5'
							>
								{isLoading ? (
									<LoaderCircle
										size={20}
										className='animate-spin'
									/>
								) : (
									<RotateCwSquare size={20} />
								)}
								Convert
							</Button>
							{convertedAmount > 0 && (
								<>
									<p className='flex items-center gap-1'>
										<Equal className='' />{' '}
										<span className='text-2xl font-medium text-gray-700'>
											KES&nbsp;{convertedAmount}
										</span>
									</p>

									<div className='h-8 w-[2px] bg-gray-600' />
								</>
							)}

							{convertedAmount > 0 && (
								<p className='flex items-center text-emerald-500'>
									<Plus />
									<span className='text-2xl font-medium'>
										KES&nbsp;{profit}
									</span>
								</p>
							)}
						</div>
					</div>
					<p className='mt-6 flex items-center text-xs text-muted-foreground'>
						<Info size={14} />
						&nbsp;The converted amount is the amount paid or
						received by user in each case.
					</p>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}

export default ForexModal
