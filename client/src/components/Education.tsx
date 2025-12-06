import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "B.Tech - Computer Science & Engineering",
    specialization: "Cybersecurity",
    institution: "Oriental College of Technology",
    location: "Bhopal, MP",
    period: "2022 - 2026 (Pursuing)",
    highlights: [
      "Proficient in network security protocols and cryptography",
      "Hands-on experience with penetration testing tools",
      "Strong understanding of firewalls and IDS",
      "Conducted security audits and secure coding practices",
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="education-section"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-purple block mb-2 transform rotate-1">
            My Academic
          </span>
          <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Education</span>
        </h2>

        <div ref={cardRef}>
          {educationData.map((edu, i) => (
            <Card
              key={i}
              className="relative p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gradient-purple to-gradient-cyan" />
              
              <div className="absolute top-4 right-4 p-3 rounded-full bg-gradient-to-br from-gradient-purple/20 to-gradient-cyan/20">
                <GraduationCap className="h-6 w-6 text-gradient-cyan" />
              </div>

              <div className="ml-4">
                <h3 className="text-xl md:text-2xl font-bold font-display text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-gradient-purple font-semibold mt-1">
                  {edu.specialization}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    {edu.institution}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {edu.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-2">
                  {edu.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-cyan mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
