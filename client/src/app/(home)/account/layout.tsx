import SidebarAccount from '@/components/layout/account/profile'

export default async function layout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className='relative h-screen py-10'>
			<div className='container h-full w-full overflow-x-auto overflow-y-hidden'>
				<div className='relative flex'>
					<SidebarAccount />
					<div className='flex-1'>{children} </div>
				</div>
			</div>
		</section>
	)
}
