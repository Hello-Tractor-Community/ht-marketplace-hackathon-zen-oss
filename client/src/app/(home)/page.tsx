"use client"

import Banner from "@/components/home/banner";
import FeaturesProducts from "@/components/home/featured";
import Payments from "@/components/home/payments";
import TopCategories from "@/components/home/top-categories";

export default function Home() {
  return (
      <>
        <Banner/>
        <Payments/>
        <TopCategories/>
        <FeaturesProducts/>
      </>
  )
}
