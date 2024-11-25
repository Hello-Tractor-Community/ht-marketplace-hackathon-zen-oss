import { apiBase } from '@/lib/config'
import { toast } from 'sonner'

// Get site settings
// @route GET /api/v1/settings
export const getSettings = async () => {
	try {
		const response = await apiBase.get('/settings')
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateSettings {
	allowSignup: boolean
	isMaintenance: boolean
    allowDeposits: boolean
    allowWithdrawals: boolean
    amountLimits: {
        depositLimit: number
        withdrawLimit: number
    }
    margins: number
}
// Update site settings
// @route PUT /api/v1/settings
export const updateSettings = async (settingsData: IUpdateSettings) => {
	try {
		const response = await apiBase.put('/settings', settingsData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface IUpdateNotifications {
	message: string
	link: string
}
// Update site notifications
// @route PUT /api/v1/settings/notification
export const updateNotifications = async (
	notificationsData: IUpdateNotifications
) => {
	try {
		const response = await apiBase.put(
			'/settings/notification',
			notificationsData
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

// Update site notification status
// @route PUT /api/v1/settings/notification/status/?status=active
export const updateNotificationStatus = async (
	status: 'active' | 'inactive'
) => {
	try {
		const response = await apiBase.put(
			`/settings/notification/status/?status=${status}`
		)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}

interface ISendEmail {
	to: string
	subject: string
	message: string
}
// Send email
// @route POST /api/v1/email/send
export const sendEmail = async (emailData: ISendEmail) => {
	try {
		const response = await apiBase.post('/email/send', emailData)
		return response.data
	} catch (err: any) {
		toast.error(err.response.data.message)
	}
}
