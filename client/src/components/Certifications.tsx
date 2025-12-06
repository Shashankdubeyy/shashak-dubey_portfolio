import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Front-End Web Development",
    issuer: "Sheryians Coding School",
    year: "2024",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "React.js Development",
    issuer: "Sheryians Coding School",
    year: "2024",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Back-End Web Development",
    issuer: "Sheryians Coding School",
    year: "2024",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Sheryians Coding School",
    year: "2024",
    color: "from-orange-500 to-red-500",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".cert-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="certifications-section"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-cyan block mb-2 transform -rotate-1">
            Achievements
          </span>
          <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Certifications</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {certifications.map((cert, i) => (
            <Card
              key={cert.title}
              className="cert-card group p-5 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${cert.color} flex-shrink-0`}>
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold font-display text-foreground truncate">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{cert.issuer}</span>
                    <span className="text-border">•</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
