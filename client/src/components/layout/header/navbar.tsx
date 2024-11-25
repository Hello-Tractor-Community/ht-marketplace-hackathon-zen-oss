import Main from './main'
import TopNav from './top-nav'

export default function Header() {
	return (
		<header className='border-b'>
			<div className='flex h-full w-full flex-col gap-y-2'>
				<TopNav />
				<Main />
			</div>
		</header>
	)
}
