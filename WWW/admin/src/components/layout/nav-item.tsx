import { logoutAdmin } from '@/apis/auth'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type NavItemProps = {
	link: string
	name: string
	icon: React.ReactNode
	className?: string
	isSelect?: boolean
}

const NavItem = ({
	link,
	name,
	icon,
	className,
	isSelect = false
}: NavItemProps) => {
	return (
		<Link
			href={link}
			className={cn(
				'flex items-center gap-3 rounded-md p-3 text-sm text-gray-600 hover:bg-slate-50 hover:text-primary/80 md:justify-center lg:justify-start lg:px-4 lg:py-2.5',
				className,
				{ 'bg-primary/5 text-primary': isSelect }
			)}
		>
			{icon}
			<span className='tracking-tight md:hidden lg:block'>{name}</span>
		</Link>
	)
}

export default NavItem

export const NavLogoutItem = () => {
    const router = useRouter()
	async function handleLogout() {

		let response = await logoutAdmin()

		if (!response) return

		toast.success(response.message)
		router.push('/admin/login')
	}
	return (
		<button
			onClick={handleLogout}
			className={cn(
				'flex items-center gap-3 rounded-md p-3 text-sm text-gray-600 hover:bg-slate-50 hover:text-gray-800 md:justify-center lg:justify-start lg:px-4 lg:py-2.5'
			)}
		>
			<LogOut size={20} />
			<span className='tracking-tight md:hidden lg:block'>Logout</span>
		</button>
	)
}

export const NavSeparator = ({
	text,
	className
}: {
	text: string
	className?: string
}) => {
	return (
		<div
			className={cn(
				'my-2.5 w-full md:my-0 md:border-b lg:my-2.5 lg:border-none',
				className
			)}
		>
			<p className='px-4 text-sm font-semibold text-gray-900 md:hidden lg:block'>
				{text}
			</p>
		</div>
	)
}
