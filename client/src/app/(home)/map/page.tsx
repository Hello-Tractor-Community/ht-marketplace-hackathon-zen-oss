'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { LatLngExpression } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { Icon, divIcon, point } from 'leaflet'
import DealersCard from '@/components/cards/dealers-card'
import { Layers } from 'lucide-react'

export default function Page() {
	const [position, setPosition] = useState<LatLngExpression>({
		lat: 51.505,
		lng: -0.09
	})

	return (
		<section className='container flex flex-col pb-16 pt-6 lg:px-24'>
			<div className='flex flex-row gap-4'>
				<div className='h-[500px] w-full overflow-hidden border border-gray-200 bg-slate-100'>
					<DealerMap />
				</div>
				<div className='w-[300px]'>
					<p className='font-[500]'>Nearest dealers</p>

					<div className='flex flex-col gap-1'>
						{Array.from({ length: 5 }).map((_, i) => {
							return <DealersCard key={'dealer' + i} />
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

// create custom icon
const customIcon = new Icon({
	iconUrl: 'https://img.icons8.com/isometric/50/marker.png',
	iconSize: [38, 38]
})

// custom cluster icon
const createClusterCustomIcon = function (cluster: any) {
	// @ts-ignore
	return new divIcon({
		html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
		className: 'custom-marker-cluster',
		iconSize: point(33, 33, true)
	})
}

// markers
const markers = [
	{
		geocode: { lat: -1.2921, lng: 36.8219 } as LatLngExpression,
		popUp: 'Jayson Mureithi Dealers'
	},
	{
		geocode: { lat: -1.2832, lng: 36.8214 } as LatLngExpression,
		popUp: 'Mark Morphis Dealers'
	},
	{
		geocode: { lat: -1.295, lng: 36.8412 } as LatLngExpression,
		popUp: 'Elegante Beunio Dealers'
	}
]

type MapType = 'satellite' | 'default'
export function DealerMap() {
	const [mapType, setMapType] = useState<MapType>('default')

	const tileLayerUrls = {
		default:
			'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
		satellite:
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
	}
	return (
		<MapContainer center={[-1.2921, 36.8219]} zoom={13} className='h-full'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url={tileLayerUrls[mapType]}
			/>

			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={createClusterCustomIcon}
				disableClusteringAtZoom={0}
			>
				{/* Mapping through the markers */}
				{markers.map((marker) => (
					<Marker position={marker.geocode} icon={customIcon}>
						<Popup>{marker.popUp}</Popup>
					</Marker>
				))}
			</MarkerClusterGroup>

			<div className='absolute right-2 top-2 z-[1000] '>
				<DropdownMenu>
					<DropdownMenuTrigger className='focus-visible:outline-none'>
						<div className='cursor-pointer rounded-full border border-gray-200 bg-white p-2 hover:opacity-80 active:opacity-100'>
							<Layers />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='z-[1000]'>
						<DropdownMenuLabel className='font-[500]'>
							Map Type
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => setMapType('default')}
							className='cursor-pointer'
						>
							Default
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setMapType('satellite')}
							className='cursor-pointer'
						>
							Satellite
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</MapContainer>
	)
}
