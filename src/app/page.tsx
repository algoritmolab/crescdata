import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesSummary } from "@/components/home/ServicesSummary";
import { Clients } from "@/components/home/Clients";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <ServicesSummary />
      <Clients />
      <FinalCta />
    </>
  );
}
