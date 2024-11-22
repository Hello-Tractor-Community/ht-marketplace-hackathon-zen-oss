import './globals.css'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import { Manrope, Merriweather } from 'next/font/google'


const avenir = localFont({
	src: [
		{
			path: '../../public/fonts/avenir_ff/AvenirLTStd-Book.otf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/avenir_ff/AvenirLTStd-Roman.otf',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../public/fonts/avenir_ff/AvenirLTStd-Black.otf',
			weight: '900',
			style: 'normal'
		}
	],
	variable: '--font-avenir',
	display: 'swap'
})

const manrope = Manrope({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-manrope',
	weight: ['200', '300', '400', '500', '600', '700', '800']
})
const merriweather = Merriweather({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-merriweather',
	weight: ['300', '400', '700', '900']
})

export const metadata: Metadata = {
	title: 'Hello Tractor | Commerce',
	description:
		'Hello Tractor is an agricultural technology company that connects tractor owners to farmers in need of tractor services.',
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	category: 'Agriculture Farming Farm Equipment'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					avenir.className,
					manrope.variable,
					merriweather.variable
				)}
			>
				{children}
			</body>
		</html>
	)
}
