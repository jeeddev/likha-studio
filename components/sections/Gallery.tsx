import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const items = [
  { src: "/images/1.jpg", span: "md:row-span-2", tag: "Website", title: "Clinic Booking Site", desc: "Design + build, 3 weeks." },
  { src: "/images/2.jpg", span: "", tag: "Mobile App", title: "Delivery Tracker", desc: "Flutter, iOS & Android." },
  { src: "/images/3.jpg", span: "", tag: "System", title: "Inventory Dashboard", desc: "Custom admin platform." },
  { src: "/images/4.jpg", span: "md:row-span-2", tag: "Video", title: "Brand Launch Film", desc: "Edit + motion graphics." },
  { src: "/images/5.jpg", span: "", tag: "Website", title: "Restaurant Site", desc: "Menu + reservations." },
  { src: "/images/6.jpg", span: "", tag: "Video", title: "Event Highlights", desc: "Same-day edit." },
];

export default function Gallery() {
  return (
    <section id="work" className="px-6 py-24 md:px-10">
      <AnimatedTitle
        text="Selected Work"
        className="mb-12 font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
      />

      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08} className={`group relative overflow-hidden rounded-2xl bg-white/5 ${it.span}`}>
            <img
              src={it.src}
              alt={it.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" style={{ maskImage: "linear-gradient(to top, black 55%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)" }} />

            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5">
              <p className="translate-y-4 text-xs uppercase tracking-widest text-accent opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">{it.tag}</p>
              <h3 className="translate-y-4 font-display text-xl font-black uppercase text-white opacity-0 transition-all delay-75 duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:text-2xl">{it.title}</h3>
              <p className="translate-y-4 text-sm text-white/70 opacity-0 transition-all delay-150 duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}