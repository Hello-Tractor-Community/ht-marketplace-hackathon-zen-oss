/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
				port: ''
			},
			{
				protocol: 'https',
				hostname: 'hellotractor.com',
				port: ''
			}
		]
	}
}

export default nextConfig
