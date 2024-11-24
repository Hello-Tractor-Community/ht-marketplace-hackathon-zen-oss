import { Metadata } from 'next'

export default async function Layout({
	children
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}

export const metadata: Metadata = {
	title: 'Hello Tractor | Account',
	description:
		'Hello Tractor - Your one-stop shop for all your tractor needs',
}
