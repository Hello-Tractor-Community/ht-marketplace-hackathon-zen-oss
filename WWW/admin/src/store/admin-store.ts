import { create } from 'zustand'

interface AdminStore {
	name: string
	email: string
	isLoggedIn: boolean
	role: TRole
	setDetails: (data: UpdateType) => void
	logOut: () => void
}

type UpdateType = {
	name: string
	email: string
	role: TRole
}

export type TRole = 'super' | 'support'

export const useAdminStore = create<AdminStore>((set) => ({
	name: '',
	email: '',
	role: 'support',
	isLoggedIn: false,
	setDetails: (data: UpdateType) =>
		set({
			name: data.name,
			email: data.email,
			role: data.role,
			isLoggedIn: true
		}),
	logOut: () => set({ isLoggedIn: false })
}))
