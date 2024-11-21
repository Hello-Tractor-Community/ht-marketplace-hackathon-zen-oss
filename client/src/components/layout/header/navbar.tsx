import Advert from './advert'
import Main from './main'
import Menus from './menus'

export default function Header() {
	return (
		<header>
			<div className='flex h-full w-full flex-col gap-y-2'>
				<Advert />
				<Main />
				<Menus />
			</div>
		</header>
	)
}
