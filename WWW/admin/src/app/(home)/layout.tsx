import SideBar from '@/components/layout/sidebar'
import TopNav from '@/components/layout/top-nav'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='max-w-screen min-h-screen flex bg-slate-100 antialiased '>
			<SideBar />
			<div className='flex min-full flex-1 flex-col md:pl-16 lg:pl-0  lg:ml-[280px]'>
				<TopNav />
				<div className='mx-2 mt-8 flex  md:mt-0 md:mx-0 lg:mx-4'>
					{children}
				</div>
			</div>
		</main>
	)
}

export default Layout
