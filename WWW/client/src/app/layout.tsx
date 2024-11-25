import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import { Manrope, Merriweather } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
	title: 'Hello Tractor | Growing Together',
	description:
		'Technology for smarter, better maintained and more profitable tractors.',
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
    keywords:['Hello Tractor', 'Tractor', 'Agriculture', 'Farm Equipment', 'Farming'],
	category: 'Agriculture Farming Farm Equipment'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

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
					merriweather.variable,
					'bg-gray-50'
				)}
			>
				<GoogleOAuthProvider clientId={googleClientId}>
					{children}
				</GoogleOAuthProvider>
				<Toaster richColors />
			</body>
		</html>
	)
}
