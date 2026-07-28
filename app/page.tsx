import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Collection from "@/components/sections/Collection";
import Testimonial from "@/components/sections/Testimonial";
import Stats from "@/components/sections/Stats";
import Marquee from "@/components/sections/Marquee";
import EditorialBreak from "@/components/sections/EditorialBreak";
import WhyUs from "@/components/sections/WhyUs";
import Showcase from "@/components/sections/Showcase";
import Pricing from "@/components/sections/Pricing";
import Industries from "@/components/sections/Industries";
import Statement from "@/components/sections/Statement";
import Film from "@/components/sections/Film";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import Configurator from "@/components/sections/Configurator";
import ParticleLogos from "@/components/sections/ParticleLogos";
import Footer from "@/components/sections/Footer";
import CurtainSection from "@/components/ui/CurtainSection";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <Collection />
      <Testimonial />
      <Stats />
      <Marquee />
      <EditorialBreak />
      <WhyUs />
      <Showcase />
      <CurtainSection>
        <Pricing />
      </CurtainSection>
      <CurtainSection>
        <Industries />
      </CurtainSection>
      <Statement />
      <Film />
      <Gallery />
      <About />
      <Configurator />
      <ParticleLogos />
      <Contact />
      <Footer />
    </main>
  );
}