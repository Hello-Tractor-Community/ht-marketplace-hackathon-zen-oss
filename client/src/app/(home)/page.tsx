"use client"

import Banner from "@/components/home/banner";
import FeaturesProducts from "@/components/home/featured";
import TopCategories from "@/components/home/top-categories";

export default function Home() {
  return (
      <div className="mb-36">
        <Banner/>
        <TopCategories/>
        <FeaturesProducts/>
      </div>
  )
}
