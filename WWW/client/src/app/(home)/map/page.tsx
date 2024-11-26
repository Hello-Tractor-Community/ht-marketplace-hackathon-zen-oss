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
import { LatLngExpression } from 'leaflet'
import { Icon, divIcon, point } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FeaturesProducts from '@/components/home/featured'
import { DEFAULT_SLIDES } from '@/components/home/banner'

export default function Page() {
	return (
		<section className='flex flex-col pb-24 pt-6 lg:container lg:px-24'>
			<div className='h-[500px] w-full overflow-hidden border-4 border-gray-200 bg-slate-100 lg:rounded-lg'>
				<DealerMap />
			</div>

			<FeaturesProducts
				title='Tractors near you'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-12 lg:mx-0'
			/>
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
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Lusaka Rd, Nairobi\nPhone: +254722843433'
	},
	{
		geocode: {
			lng: 36.052040497088704,
			lat: -0.28999981551338344
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Nakuru Kisumu Rd, Nakuru\nPhone: +254722316821'
	},
	{
		geocode: {
			lng: 37.07599918327432,
			lat: 0.01150204498553343
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Sagana Rd, Nanyuki/Meru\nPhone: +254727443226'
	},
	{
		geocode: {
			lng: 35.27480168090905,
			lat: 0.5105841554000572
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Eldoret Kisumu Rd, Eldoret/Kitale\nPhone: +254723256074'
	},
	{
		geocode: {
			lng: 34.75068968085394,
			lat: -0.09681999772493884
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Obote Rd, Kisumu\nPhone: +254722540558'
	},
	{
		geocode: {
			lng: 39.65766547222288,
			lat: -4.061735215174758
		} as LatLngExpression,
		popUp: 'CMC (New Holland Dealer) - Archbishop Makarios Rd, Mombasa\nPhone: +254720935034'
	},
	{
		geocode: {
			lng: 35.27127864671338,
			lat: 0.5189855951750221
		} as LatLngExpression,
		popUp: 'Mascor (John Deere) - Uganda Rd, Eldoret \nPhone: 254 207 602 298'
	},
	{
		geocode: {
			lng: 34.76797144085695,
			lat: -0.09168150828103418
		} as LatLngExpression,
		popUp: 'Mascor (John Deere) - Obote Rd, Kisumu \nPhone: 254 207 602 294'
	},
	{
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'Mascor (John Deere) - Old Nairobi Road,  Nakuru\nPhone: 254 207 602 288'
	},
	{
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'Mascor (John Deere) - Narok\nPhone: 254 720 935 034'
	},
	{
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'CFAO Motors (Authorises Case Hl Dealer) - Town East, George Morara Rd, Nakuru\nPhone: 207604121'
	},
	{
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'CFAO Motors (Authorises Case Hl Dealer) - Kisumu\nPhone: +254719029707'
	},
	{
		geocode: {
			lng: 36.82933094675188,
			lat: -1.3029392707690939
		} as LatLngExpression,
		popUp: 'CFAO Motors (Authorises Case Hl Dealer) - Kenyatta Rd, Nanyuki\nPhone: 0719 029462'
	},
	{
		geocode: {
			lng: 35.2904014066872,
			lat: -0.3662408583545941
		} as LatLngExpression,
		popUp: 'CADS Motors (Kericho Toyota) - Moi Highway, Kericho\nPhone: 0708 698899'
	},
	{
		geocode: {
			lng: 36.842509871697004,
			lat: -1.3068142614866365
		} as LatLngExpression,
		popUp: 'Sichey Automotive EA Ltd - Pembe Plaza, Ground Floor Homa Bay Road/ Enterprise Road Junction Industrial Area, Nairobi \nPhone: 254 735 500 500, +254 768 989 407, +254 757 487 425'
	},
	{
		geocode: {
			lng: 34.55598633648814,
			lat: 0.5931351188176409
		} as LatLngExpression,
		popUp: 'Terranova Automotive - Webuye Malaba Road – Kandunyi, Bungoma\nPhone: +254 777 222 239'
	},
	{
		geocode: {
			lng: 36.05977507512129,
			lat: -0.28793810992389746
		} as LatLngExpression,
		popUp: 'Uni- Truck World Ltd  - George Morara Avenue Next To Bhogals Toyota, Nakuru\nPhone: 254 727 228 811, +254 734 228 811, +254 512216045 '
	},
	{
		geocode: {
			lng: 36.06089558491588,
			lat: -0.2867164409933456
		} as LatLngExpression,
		popUp: 'FMD  -  Town East, Biashara George Morara Ave Nakuru, Kiambu, Nakuru\nPhone: +254722205538'
	},
	{
		geocode: {
			lng: 36.06090437511119,
			lat: -0.2867387710106743
		} as LatLngExpression,
		popUp: 'FMD  - Lima Hse Kapseret, Kipkenyo, Kenyatta ave, Nakuru\nPhone: +254727509018'
	}
]

type MapType = 'satellite' | 'default'
function DealerMap() {
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
