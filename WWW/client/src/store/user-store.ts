import { QueryKeys } from '@/types'
import { create } from 'zustand'

interface UserStore {
	name: string
	email: string
	image: string
    phone: string
    role: "seller" | "buyer"
	isLoggedIn: boolean
	queryParams: Record<QueryKeys, string>
	setQueryParams: (params: Record<QueryKeys, string>) => void
	setDetails: (data: UpdateType) => void
	logOut: () => void
}

type UpdateType = {
	name: string
	image: string
    role: "seller" | "buyer"
	email: string
    phone: string
}

export type TRole = 'super' | 'accounts' | 'support'
export type TMembership = 'free' | 'pro' | 'premium'

export const useUserStore = create<UserStore>((set) => ({
	name: '',
	email: '',
	image: '',
    phone: '',
	isLoggedIn: false,
    role: "buyer",
	queryParams: {
		type: 'all',
		brand: '',
		horsepower: '',
		year: '',
		enginehours: '',
		price: '',
		userQuery: ''
	},

	setQueryParams: (params: Record<QueryKeys, string>) => {
		set({ queryParams: params })
	},
	setDetails: (data: UpdateType) =>
		set({
			name: data.name,
			email: data.email,
			image: data.image,
            role: data.role,
            phone: data.phone,
			isLoggedIn: true
		}),
	logOut: () => set({ isLoggedIn: false })
}))
