import { apiBase } from '@/lib/config'
import { TransactionStatus, TransactionType } from '@/types'
import { toast } from 'sonner'

// Search for transaction
// @route GET /api/v1/transaction/search/?term=<search-term>&type=<query|id>
export const searchTransaction = async ({
	type,
	term
}: {
	type: 'query' | 'id'
	term: string
}) => {
	try {
		const response = await apiBase.get('/transaction/search', {
			params: {
				type,
				term
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Check deriv balance
// @route GET /api/v1/pay/balance/deriv
export const checkDerivBalance = async () => {
    try {
        const response = await apiBase.get('/pay/balance/deriv')
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}

// Check mpesa balance
// @route GET /api/v1/pay/balance/mpesa
export const checkMpesaBalance = async () => {
    try {
        const response = await apiBase.get('/pay/balance/mpesa')
        return response.data
    } catch (err: any) {
        toast.error(err.response.data.message)
    }
}

//  Retry a failed transaction
// @route GET /api/v1/transaction/retry/?id=<transactionId>
export const retryTransaction = async (id: string) => {
	try {
		const response = await apiBase.get(`/transaction/retry/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Request transaction status
// GET /api/v1/transaction/status/?code=<tnx-code>&type=<mpesa>
export const requestTransactionStatus = async ({
	code,
	type
}: {
	code: string
	type: 'mpesa'
}) => {
	try {
		const response = await apiBase.get('/transaction/status', {
			params: {
				code,
				type
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Fetch all transaction status
// @route GET /api/v1/transaction/status/all
export const fetchAllTransactionStatus = async () => {
	try {
		const response = await apiBase.get('/transaction/status/all')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete transaction status
// @route DELETE /api/v1/transaction/status/?id=<transactionId>
export const deleteTransactionStatus = async (id: string) => {
	try {
		const response = await apiBase.delete(`/transaction/status/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Fetch user transactions
// @route GET /api/v1/transaction/user/?page=1&limit=10&type=deposit&status=completed
export const fetchUserTransactions = async ({
	page,
	limit,
	type,
	status
}: {
	page: number
	limit: number
	type: TransactionType | 'all'
	status: TransactionStatus | 'all'
}) => {
	try {
		const response = await apiBase.get('/transaction/user', {
			params: {
				page,
				limit,
				type,
				status
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Fetch user transactions
// @route GET /api/v1/transaction/all/?page=1&limit=10&type=deposit&status=completed
export const getAllPaginatedTransactions = async ({
	page,
	limit,
	type,
	status
}: {
	page: number
	limit: number
	type: TransactionType | 'all'
	status: TransactionStatus | 'all'
}) => {
	try {
		const response = await apiBase.get('/transaction/all', {
			params: {
				page,
				limit,
				type,
				status
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Update transaction status
// @route PUT /api/v1/transaction
export const updateTransactionStatus = async ({
	id,
	status
}: {
	id: string
	status: TransactionStatus
}) => {
	try {
		const response = await apiBase.put('/transaction', { id, status })
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Delete transaction
// @route DELETE /api/v1/transaction/?id=<transactionId>
export const deleteTransaction = async (id: string) => {
	try {
		const response = await apiBase.delete(`/transaction/?id=${id}`)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Convert forex amount
// @route GET /api/v1/forex/convert/?amount=<amount>&type=<deposit|withdraw>
export const convertForexAmount = async ({
	amount,
	type
}: {
	amount: number
	type: TransactionType
}) => {
	try {
		const response = await apiBase.get('/forex/convert', {
			params: {
				amount,
				type
			}
		})
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
