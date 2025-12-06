import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  { icon: MapPin, label: "Location", value: "Bhopal, Madhya Pradesh" },
  { icon: Mail, label: "Email", value: "shashankdub789@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8349159401" },
  { icon: Briefcase, label: "Status", value: "Seeking Opportunities" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".info-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
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
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="about-section"
    >
      <div className="absolute inset-0 bg-card-gradient opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-4"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-cyan block mb-2 transform -rotate-1">
            Get to know
          </span>
          About <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Me</span>
        </h2>

        <div ref={contentRef} className="mt-12 md:mt-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I'm a final-year <span className="text-foreground font-medium">B.Tech student</span> in 
              Computer Science (specializing in Cybersecurity) at Oriental College of Technology, Bhopal. 
              I'm passionate about building <span className="text-gradient-purple font-medium">secure, scalable web applications</span> and 
              learning practical defensive and offensive security techniques.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-4">
              I enjoy turning ideas into working products — from frontend UI to backend services — and 
              I actively contribute to projects that prioritize <span className="text-gradient-cyan font-medium">performance, accessibility, and robustness</span>.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {infoItems.map((item, i) => (
              <Card
                key={item.label}
                className="info-card group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gradient-purple/20 to-gradient-cyan/20 group-hover:from-gradient-purple/30 group-hover:to-gradient-cyan/30 transition-colors">
                    <item.icon className="h-5 w-5 text-gradient-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium mt-1 break-all">{item.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
