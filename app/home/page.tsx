import { HomeHero } from "@/components/home-hero";
import { SimpleHeader } from "@/components/ui/simple-header";
import ChatBox from '../../components/ChatBot'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <HomeHero />
      <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to LocalLens 👋</h1>
      <ChatBox />
      </main>
    </div>
    
  );
}
