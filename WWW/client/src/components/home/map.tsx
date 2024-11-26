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
import { Layers } from 'lucide-react'
import { Icon, divIcon, point } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MARKERS } from '@/constants/tractors'

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


type MapType = 'satellite' | 'default'
export default function DealerMap() {
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
				{MARKERS.map((marker) => (
					<Marker position={marker.geocode} icon={customIcon}>
						<Popup>{marker.popUp}</Popup>
					</Marker>
				))}
			</MarkerClusterGroup>

			<div className='absolute right-2 top-2 z-[400] '>
				<DropdownMenu>
					<DropdownMenuTrigger className='focus-visible:outline-none'>
						<div className='cursor-pointer rounded-full border border-gray-200 bg-white p-2 hover:opacity-80 active:opacity-100'>
							<Layers />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='z-[1000] mr-4 lg:mr-0'>
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
