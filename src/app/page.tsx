"use client";

import AllProject from "@/views/HomePage/AllProject";
import Banner from "@/views/HomePage/Banner";
import FeaturedProject from "@/views/HomePage/FeaturedProject";

export default function Home() {
  return (
    <>
      <main className="bg-[url('/background.png')] bg-cover bg-no-repeat flex w-full h-full flex-col  sm:px-[77px]">
        <Banner />
        <FeaturedProject />
        <AllProject />
      </main>
    </>
  );
}
