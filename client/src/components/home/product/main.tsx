import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import TopBar from './topbar';
import ProductList from './product-list';

export default function MainProduct({
	minPrice,
	maxPrice,
	loading,
	setLoading,
	setMinPrice,
	setMaxPrice,
	slug
}: {
	minPrice: number
	maxPrice: number
	loading: boolean
	setLoading: (value: boolean) => void
	setMinPrice: (value: number) => void
	setMaxPrice: (value: number) => void
	slug?: string
}) {
	return (
		<div className='flex w-full flex-col gap-4'>
			<HeaderImage slug={slug} />
			<ShopProducts
				loading={loading}
				setLoading={setLoading}
				slug={slug}
				minPrice={minPrice}
				maxPrice={maxPrice}
				setMinPrice={setMinPrice}
				setMaxPrice={setMaxPrice}
			/>
		</div>
	)
}

function HeaderImage({ slug }: { slug?: string }) {
	const [loading, setLoading] = useState(false)

	return (
		<>
			{!loading ? (
				<div>
					<div
						className='flex h-[350px] w-full items-center justify-center rounded-lg bg-cover'
						style={{
							backgroundImage: `url('')`,
							height: '350px'
						}}
					>
						<h1
							className={cn(
								'backdrop text-xl font-extrabold uppercase tracking-wider text-black lg:text-4xl'
							)}
						>
							Something goes here
						</h1>
					</div>
				</div>
			) : (
				<Skeleton className={cn('h-[325] w-full rounded-xl')} />
			)}
		</>
	)
}



function ShopProducts({
  loading,
  setLoading,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  slug,
}: {
  loading: boolean;
  slug?: string;
  setLoading: (value: boolean) => void;
  setMaxPrice: (value: number) => void;
  setMinPrice: (value: number) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const [products, setProducts] = useState([]);
  const [perpage, setPerPages] = useState(10);
  const [filter, setFilter] = useState("latest");

  const [page, setPage] = useState(1);

  const count = Math.ceil(products.length / perpage);



  return (
    <div>
      <TopBar
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        loading={loading}
        slug={slug}
        perpage={perpage}
        filter={filter}
        setPerPages={setPerPages}
        setFilter={setFilter}
      />
      <ProductList loading={loading}/>

      <div className="flex mt-10 justify-between">

        <div className="flex ms-auto">
          Showing 8 of{" "}
          12 results
        </div>
      </div>
    </div>
  );
}
