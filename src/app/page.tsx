"use client";
import HeroSection from "../components/HeroSection/HeroSection";
import TopCars from "../components/TopCars/TopCars";
import CarCategory from "../components/CarCategory/CarCategory";
import Testimonials from "../components/Testimonials/Testimonials";
import NewSection from "@/components/NewSection/NewSection";



export default function Home() {  return (
    <main>
      <HeroSection />
      <NewSection />
      <TopCars />
      <CarCategory />
      <Testimonials />
    </main>
  );
}
