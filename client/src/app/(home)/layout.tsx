import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header/navbar'
import MobileBottom from '@/components/layout/mobile-bottom'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<MobileBottom />
			{children}
			<Footer />
		</>
	)
}
