import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Shield, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "GSAP / Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "REST APIs", level: 82 },
      { name: "JWT Authentication", level: 75 },
    ],
  },
  {
    title: "Database & DevOps",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "MongoDB", level: 75 },
      { name: "Firebase", level: 72 },
      { name: "Git & GitHub", level: 88 },
      { name: "Vercel / Netlify", level: 80 },
    ],
  },
  {
    title: "Security & Tools",
    icon: Shield,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Web Security (OWASP)", level: 70 },
      { name: "Penetration Testing", level: 65 },
      { name: "Postman / DevTools", level: 85 },
      { name: "Wireshark", level: 60 },
    ],
  },
  {
    title: "Languages",
    icon: Terminal,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "Python", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
];

export default function Skills() {
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

      const cards = cardsRef.current?.querySelectorAll(".skill-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
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

        const bars = card.querySelectorAll(".skill-bar-fill");
        bars.forEach((bar, j) => {
          const targetWidth = bar.getAttribute("data-level");
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${targetWidth}%`,
              duration: 1,
              delay: 0.3 + j * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="skills-section"
    >
      <div className="absolute inset-0 bg-card-gradient opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-cyan block mb-2 transform -rotate-1">
            What I know
          </span>
          My <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Skills</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, i) => (
            <Card
              key={category.title}
              className={`skill-card group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/30 transition-all duration-300 ${
                i === skillCategories.length - 1 && skillCategories.length % 3 !== 0
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-muted-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${category.color}`}
                        data-level={skill.level}
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
