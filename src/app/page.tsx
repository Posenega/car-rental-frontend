"use client";
import HeroSection from "../components/HeroSection/HeroSection";
import TopCars from "../components/TopCars/TopCars";
import CarCategory from "../components/CarCategory/CarCategory";
import Testimonials from "../components/Testimonials/Testimonials";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TopCars />
      <CarCategory />
      <Testimonials />
    </main>
  );
}
