import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EllipsisVertical, Search, Send } from 'lucide-react'

const dummyData = {
	contacts: [
		{
			id: 1,
			name: 'John Doe',
			message: 'Hey there!',
			avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
			isOnline: true
		},
		{
			id: 2,
			name: 'Jane Smith',
			message: 'How are you?',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
			isOnline: false
		},
		{
			id: 3,
			name: 'Morne Taylor',
			message: 'Bye, Good night',
			avatar: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
			isOnline: false
		},
		{
			id: 4,
			name: 'Natasha Engineer',
			message: "Let's catch up ",
			avatar: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
			isOnline: false
		},
		{
			id: 5,
			name: 'Meloni Victor',
			message: 'Completed.',
			avatar: 'https://images.unsplash.com/photo-1520295187453-cd239786490c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
			isOnline: false
		}
	],
	chats: [
		{
			id: 1,
			message: 'Hello!',
			timestamp: '10:00 AM',
			type: 'received'
		},
		{
			id: 2,
			message: 'Hi, how are you?',
			timestamp: '10:02 AM',
			type: 'sent'
		},
		{
			id: 3,
			message: "I'm fine. What about you?",
			timestamp: '10:03 AM',
			type: 'received'
		},
		{
			id: 4,
			message: "I'm also fine",
			timestamp: '10:04 AM',
			type: 'sent'
		},
		{
			id: 5,
			message: "I'm getting error in my code",
			timestamp: '10:05 AM',
			type: 'received'
		},
		{
			id: 6,
			message: 'Send me the code, I will look it into it',
			timestamp: '10:02 AM',
			type: 'sent'
		}
	]
}

export default function Chats() {
	return (
		<div className=''>
			<h1 className='py-2 font-manrope text-2xl font-medium'>
				Your Chats
			</h1>

			<div className='flex mt-4 rounded-lg border-4 bg-white border-gray-200'>
				<div className='w-1/4 flex flex-col overflow-auto rounded-l-lg border-r border-gray-200'>
					<div className='m-4 flex items-center gap-2 rounded-md'>
						<Search />
						<Input
							placeholder='Search dealers...'
							className='h-[50px]  border-gray-200'
						/>
					</div>
					<div className='divide-y flex-1 overflow-y-auto divide-gray-200'>
						{dummyData.contacts.map((contact) => (
							<div
								key={contact.id}
								className='flex cursor-pointer items-center p-4 hover:bg-slate-100'
							>
								<img
									className='h-10 w-10 rounded-full object-cover'
									src={contact.avatar}
									alt={`Profile picture of ${contact.name}`}
								/>
								<div className='ml-4'>
									<p>{contact.name}</p>
									<p className='text-sm text-gray-400'>
										{contact.message}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-1 flex-col'>
					<div className='flex items-center border-b border-gray-300 p-4'>
						<img
							className='h-10 w-10 rounded-full object-cover'
							src={
								'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww'
							}
							alt={`Profile picture of john doe`}
						/>

						<span className='ml-4'>Chat with John Doe</span>
						<EllipsisVertical className='ml-auto' />
					</div>
					<div className='flex-1 overflow-auto p-4'>
						{dummyData.chats.map((chat) => (
							<div
								key={chat.id}
								className={`flex ${chat.type === 'sent' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`rounded-lg px-6 py-2 ${chat.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200'} my-1`}
								>
									<p>{chat.message}</p>
									<span className='text-[12px]'>
										{' '}
										{chat.timestamp}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className='flex gap-4 p-4'>
						<Input
							placeholder='Enter your message...'
							className='h-[50px]  border-gray-200'
						/>
						<Button
							variant='outline'
							size='icon'
							className='h-full w-[50px]'
						>
							<Send size={24} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
