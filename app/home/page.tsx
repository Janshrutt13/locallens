import { HomeHero } from "@/components/home-hero";
import { SimpleHeader } from "@/components/ui/simple-header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <HomeHero />
    </div>
  );
}
