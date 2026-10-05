import HeroSection from "@/components/home/HeroSection";
import NearbyDoctors from "@/components/home/NearbyDoctors";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <NearbyDoctors />
    </main>
  );
}
