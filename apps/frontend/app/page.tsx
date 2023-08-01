import { HomeScreen } from "@/src/Home/Screens/HomeScreen";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl py-32 lg:max-w-none">
      <FadeIn>
        <div className="mx-auto text-center">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            🤖 2CSV 🤖
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Convert your receipts to CSV
          </p>
        </div>
        <HomeScreen />
      </FadeIn>
    </div>
  );
}
