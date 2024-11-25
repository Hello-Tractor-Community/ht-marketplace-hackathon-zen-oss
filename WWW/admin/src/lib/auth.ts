import { z } from 'zod'

export const adminAuthSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})
