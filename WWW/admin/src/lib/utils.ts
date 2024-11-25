import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { format, formatDistanceToNow } from 'date-fns'
import { AccountBalance, AccountBalanceTypes } from '@/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Copy to clipboard
export function copyToClipboard(text: string): void {
	if (navigator.clipboard && window.isSecureContext) {
		// navigator.clipboard is available
		navigator.clipboard.writeText(text).then(
			() => {
				toast.success('Text copied to clipboard successfully!')
			},
			(err) => {
				console.error('Failed to copy text to clipboard:', err)
				toast.error('Failed to copy text to clipboard')
			}
		)
	} else {
		// fallback method for older browsers
		const textArea = document.createElement('textarea')
		textArea.value = text

		// Avoid scrolling to bottom
		textArea.style.top = '0'
		textArea.style.left = '0'
		textArea.style.position = 'fixed'

		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()

		try {
			const successful = document.execCommand('copy')
			const msg = successful
				? 'Text copied to clipboard successfully!'
				: 'Failed to copy text to clipboard'
			toast[successful ? 'success' : 'error'](msg)
		} catch (err) {
			console.error('Failed to copy text to clipboard:', err)
			toast.error('Failed to copy text to clipboard')
		}

		document.body.removeChild(textArea)
	}
}

export function formatDate(
	date: string,
	formatLayout: string = "MMMM dd, yyyy 'at' hh:mm a"
) {
	const createdAtDate = new Date(date)

	if (isNaN(createdAtDate.getTime())) {
		return '----'
	}

	return format(createdAtDate, formatLayout)
}

export function dateDistance(date: string) {
	const createdAtDate = new Date(date)

	const result = formatDistanceToNow(createdAtDate, { addSuffix: true })

	// Check if it says 2023 years ago
	if (result.includes('over 2023 years ago')) {
		return 'Never'
	}

	return result
}

export function daysToMonths(days: number) {
	if (days < 30) {
		return days + ' days'
	}

	const months = Math.floor(days / 30)
	const remainingDays = days % 30

	return `${months} months ${remainingDays} days`
}

export function parseAccountBalance(
	value: string
): Record<AccountBalanceTypes, AccountBalance> {
	const parsedBalances = {} as Record<AccountBalanceTypes, AccountBalance>

	value.split('&').forEach((account) => {
		const [
			accountName,
			currency,
			availableFunds,
			unclearedFunds,
			reservedFunds
		] = account.split('|') as [
			AccountBalanceTypes,
			string,
			string,
			string,
			string
		]

		parsedBalances[accountName] = {
			currency,
			availableFunds: parseFloat(availableFunds),
			unclearedFunds: parseFloat(unclearedFunds),
			reservedFunds: parseFloat(reservedFunds)
		}
	})

	return parsedBalances
}
