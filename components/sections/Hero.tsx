import SpotlightBg from "@/components/SpotlightBg";
import IntroReveal from "@/components/ui/IntroReveal";

export default function Hero() {
  return (
    <section id="hero" className="h-screen w-full p-3 md:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10">
        <SpotlightBg />

        <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-14 md:p-14 md:pb-20">
          <IntroReveal delay={0}>
            <p className="mb-4 max-w-md text-sm text-white/60 md:text-base">
              Websites · Mobile Apps · Systems · Video
            </p>
          </IntroReveal>

          <IntroReveal delay={0.15}>
            <h1 className="font-display text-[11vw] font-black uppercase leading-[0.82] tracking-tighter md:text-[8vw]">
              We Build
              <br />
              <span className="text-accent">Digital</span>
            </h1>
          </IntroReveal>

          <IntroReveal delay={0.3}>
            <p className="mt-6 max-w-lg text-white/70">
              A design and engineering studio crafting fast websites, mobile apps,
              custom systems, and cinematic video — from the Philippines.
            </p>
          </IntroReveal>

          <IntroReveal delay={0.45} className="pointer-events-auto">
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#services" data-cursor="hover" className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85">Our Services</a>
              <a href="#work" data-cursor="hover" className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10">See Our Work</a>
            </div>
          </IntroReveal>
        </div>

        <span className="absolute bottom-8 right-8 z-10 text-xs uppercase tracking-widest text-white/50 md:right-14">Scroll ↓</span>
      </div>
    </section>
  );
}