import AllProject from "@/components/AllProject";
import Banner from "@/components/Banner";
import FeaturedProject from "@/components/FeaturedProject";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="bg-[url('/background.png')] bg-cover bg-no-repeat flex w-full h-full flex-col  sm:px-[77px]">
      <Banner />
      <FeaturedProject />
      <AllProject />
    </main>
  );
}
