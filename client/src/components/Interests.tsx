import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Shield, BookOpen, Music, Camera, Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  {
    title: "Competitive Coding",
    description: "Algorithm practice and problem solving",
    icon: Code,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Cybersecurity CTFs",
    description: "Hands-on security challenges",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Tech Blogs",
    description: "Reading and writing about tech",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Music",
    description: "Creative outlet and relaxation",
    icon: Music,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Photography",
    description: "Capturing moments and perspectives",
    icon: Camera,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Side Projects",
    description: "Building and experimenting",
    icon: Gamepad2,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Interests() {
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

      const cards = cardsRef.current?.querySelectorAll(".interest-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.08 * i,
            ease: "back.out(1.7)",
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
      id="interests"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="interests-section"
    >
      <div className="absolute inset-0 bg-card-gradient opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-purple block mb-2 transform rotate-1">
            Beyond coding
          </span>
          Interests & <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Hobbies</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {interests.map((interest, i) => (
            <Card
              key={interest.title}
              className="interest-card group p-5 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/30 transition-all duration-300 text-center"
            >
              <div className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <interest.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold font-display text-foreground mb-1">
                {interest.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {interest.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
