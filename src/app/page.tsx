import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import CrisisSection from "@/components/CrisisSection";
import DonateSection from "@/components/DonateSection";
import StoriesSection from "@/components/StoriesSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <NavBar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <CrisisSection />
        <DonateSection />
        <StoriesSection />
        <ResourcesSection />
      </main>
      <Footer />
    </>
  );
}
