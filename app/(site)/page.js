import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import TrustedOwners from "@/components/home/TrustedOwners";
import Reviews from "@/components/home/Reviews";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <RecentlyAdded />
      <TrustedOwners />
      <Reviews />
      <CallToAction />
    </>
  );
}
