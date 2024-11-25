import { create } from 'zustand'

interface UserStore {
	name: string
	email: string
	image: string
	balance: number
	isLoggedIn: boolean
	powerMode: boolean
	pdfSize: number
	showPowerMode: boolean
	chargeTokens: boolean
	membership: TMembership
	refreshSideBarItems: number
	inviteCode: string
	setDetails: (data: UpdateType) => void
	updateBalance: (balance: number) => void
	setPowerMode: (mode: boolean) => void
	logOut: () => void
}

type UpdateType = {
	name: string
	image: string
	balance: number
	email: string
	membership: TMembership
	showPowerMode: boolean
	chargeTokens: boolean
	inviteCode: string
	pdfSize: number
}

export type TRole = 'super' | 'accounts' | 'support'
export type TMembership = 'free' | 'pro' | 'premium'

export const useUserStore = create<UserStore>((set) => ({
	name: '',
	email: '',
	image: '',
	balance: 0,
	membership: 'free',
	pdfSize: 2,
	isLoggedIn: false,
	powerMode: false,
	chargeTokens: false,
	showPowerMode: false,
	refreshSideBarItems: 1,
	inviteCode: '',
	setRefreshSideBarItems: (item: number) =>
		set({ refreshSideBarItems: item }),
	setDetails: (data: UpdateType) =>
		set({
			name: data.name,
			email: data.email,
			image: data.image,
			membership: data.membership,
			inviteCode: data.inviteCode,
			balance: data.balance,
			showPowerMode: data.showPowerMode,
			chargeTokens: data.chargeTokens,
			isLoggedIn: true,
			pdfSize: data.pdfSize
		}),
	updateBalance: (balance: number) => set({ balance }),
	setPowerMode: (mode: boolean) => set({ powerMode: mode }),
	logOut: () => set({ isLoggedIn: false })
}))
