export type AdminRole = 'super' | 'admin'
export type SupportStatus = 'pending' | 'resolved'
export type TransactionType = 'deposit' | 'withdrawal'
export type TransactionStatus = 'pending' | 'completed' | 'failed'

export type UserType = {
	_id: string
	createdAt: string
	updatedAt: string
	lastLogin: string
	name: string
	image: string
	email: string
	todayTransactions: number
	totalTransactions: number
	notifications: string[]
	support: string[]
	balance: number
}

export type SettingsType = {
	_id: string
	allowSignup: boolean
	isMaintenance: boolean
	allowDeposits: boolean
	allowWithdrawals: boolean
	margins: number
	amountLimits: {
		depositLimit: number
		withdrawLimit: number
	}
	rate: {
		withdraw: number
		deposit: number
		lastUpdate: string
	}
}

export type AdminType = {
	_id: string
	email: string
	name: string
	role: AdminRole
	createdAt: string
	lastLogin: string
}

export type SupportTicketType = {
	_id: string
	name: string
	email: string
	phone: string
	message: string
	isUser: boolean
	status: SupportStatus
	createdAt: string
	updatedAt: string
}

export type UserTransactionType = {
	mpesaInit: {
		MerchantRequestID: string
		CheckoutRequestID: string
		ResponseCode: string
		ResponseDescription: string
		CustomerMessage: string
		DerivAccount: string
		PhoneNumber: string
	}
	_id: string
	amount: number
	margin: number
	profit: number
	rate: number
	type: 'deposit' | 'withdrawal'
	initiator: string
	status: 'pending' | 'completed' | 'failed'
	pointOfFailure: string
	user: {
		_id: string
		name: string
		email: string
	}
	mpesaCode: string
	derivCode: string
	createdAt: string
	updatedAt: string
}

export type TnxStatusCheck = {
	_id: string
	type: string
	tnxId: string
	status: 'pending' | 'completed' | 'failed'
	processed: boolean
	OriginatorConversationID: string
	createdAt: string
	updatedAt: string
}

export type EmailType = {
	_id: string
	sender: {
		name: string
		email: string
	}
	notification: string
	recepient: string
	subject: string
	message: string
	isUser: boolean
	createdAt: string
	updatedAt: string
}

// Cash account balances
export type AccountBalanceTypes =
	| 'Working Account'
	| 'Utility Account'
	| 'Merchant Account'

export interface AccountBalance {
	currency: string
	availableFunds: number
	unclearedFunds: number
	reservedFunds: number
}
export type AdminBalanceType = {
	_id: string
	mpesa: Record<AccountBalanceTypes, AccountBalance>
	deriv: { account: string; currency: string; balance: number }
	createdAt: string
	updatedAt: string
}
