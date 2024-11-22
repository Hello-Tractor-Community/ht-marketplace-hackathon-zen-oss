"use client"

import Banner from "@/components/home/banner";
import CallToAction from "@/components/home/cta";
import FeaturesProducts from "@/components/home/featured";

export default function Home() {
  return (
      <div className="mb-36">
        <Banner/>
        <CallToAction/>
        <FeaturesProducts/>
      </div>
  )
}
