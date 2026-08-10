import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesSummary } from "@/components/home/ServicesSummary";
import { Proof } from "@/components/home/Proof";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <ServicesSummary />
      <Proof />
      <FinalCta />
    </>
  );
}
