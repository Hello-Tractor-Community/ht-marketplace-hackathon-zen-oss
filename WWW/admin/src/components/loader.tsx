import { LoaderCircle } from 'lucide-react'

function Loader() {
	return (
		<div className='flex flex-col items-center justify-center gap-2.5 rounded-md bg-white p-8 text-muted-foreground '>
			<LoaderCircle className='h-5 w-5 animate-spin' />
			<p className='text-sm'>Loading...</p>
		</div>
	)
}

export default Loader
