"use client"

import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import FeaturesProducts from "@/components/home/featured";
import Payments from "@/components/home/payments";
import TopCategories from "@/components/home/top-categories";
import BrandList from "@/components/home/tractor-brands";

export default function Home() {
  return (
      <>
        <Banner/>
        <Payments/>
        <TopCategories/>
        <FeaturesProducts/>
        <Cta/>
        <BrandList/>
      </>
  )
}
