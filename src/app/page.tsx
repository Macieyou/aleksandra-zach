import HeroSection from "@/components/HeroSection";
import WishesSection from "@/components/WishesSection";
import CakeSection from "@/components/CakeSection";
import MemoriesSection from "@/components/MemoriesSection";
import BuildUpSection from "@/components/BuildUpSection";
import RevealSection from "@/components/RevealSection";
import EndingSection from "@/components/EndingSection";
import FullPageScroll from "@/components/FullPageScroll";

export default function Home() {
  return (
    <main className="bg-ivory">
      <FullPageScroll sectionCount={7}>
        <HeroSection />
        <WishesSection />
        <CakeSection />
        <MemoriesSection />
        <BuildUpSection />
        <RevealSection />
        <EndingSection />
      </FullPageScroll>
    </main>
  );
}
