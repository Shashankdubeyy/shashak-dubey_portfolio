import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import { Github, ExternalLink, Users, CheckSquare, Car, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Employee Management System",
    description:
      "Full-stack system to efficiently handle employee data with role-based authentication and secure access control.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Full CRUD operations for employee records",
      "Role-based authentication and authorization",
      "User-friendly interface with optimized endpoints",
      "Secure data management and access control",
    ],
    icon: Users,
    github: "https://github.com/shashankdubey",
    demo: "#",
    gradient: "from-violet-600 to-purple-600",
  },
  {
    title: "Online Task Management",
    description:
      "Dynamic task management application with real-time updates and priority-based task organization.",
    tech: ["React.js", "Firebase", "Tailwind CSS"],
    features: [
      "Real-time task updates and sync",
      "Priority-based task categorization",
      "Secure user authentication",
      "Responsive and intuitive interface",
    ],
    icon: CheckSquare,
    github: "https://github.com/shashankdubey",
    demo: "#",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "BankStact Pro",
    description:
      "BankStack Pro is a secure full-stack web application, enterprise-level reliability, built with scalable REST APIs, strong backend validation and best security pratices. ",
    tech: ["React.js", "Firebase", "Tailwind CSS","REST APIs"],
    features: [
      "Designed to handle end-to-end banking operation",
      "Perform essential banking task in a morden UI",
      "it features robust user authetication(signup/login)",
      "Responsive and intuitive interface",
    ],
    icon: PiggyBank,
    github: "https://github.com/shashankdubey",
    demo: "#",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "GetSET GO!",
    description:
      "GetSET Go! streamlined UI that lets user book rides in seconds with minimal friction.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Optimized Ride Booking Flow",
      "Live Trip Monitoring ",
      "Enterprise-Grade Authentication ",
      "End-to-End Payment Support",
    ],
    icon: Car,
    github: "https://github.com/shashankdubey",
    demo: "#",
    gradient: "from-violet-600 to-purple-600",
  },
];

export default function Projects() {
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

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: 0.2 * i,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    const tiltElements = cardsRef.current?.querySelectorAll(".tilt-card");
    tiltElements?.forEach((el) => {
      VanillaTilt.init(el as HTMLElement, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02,
      });
    });

    return () => {
      ctx.revert();
      tiltElements?.forEach((el) => {
        const tilt = el as HTMLElement & { vanillaTilt?: { destroy: () => void } };
        tilt.vanillaTilt?.destroy();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="projects-section"
    >
      <div className="absolute inset-0 bg-hero-gradient opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-purple block mb-2 transform rotate-1">
            Featured
          </span>
          My <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Projects</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <div key={project.title} className="project-card">
              <Card className="tilt-card group h-full p-0 overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/30 transition-all duration-500">
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-20`}>
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.open(project.github, "_blank")}
                        className="group/btn"
                        data-testid={`project-github-${i}`}
                      >
                        <Github className="h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-[360deg]" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.open(project.demo, "_blank")}
                        className="group/btn"
                        data-testid={`project-demo-${i}`}
                      >
                        <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                    {project.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-cyan mt-1.5 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.github, "_blank")}
                      className="flex-1 gap-2 group/btn"
                    >
                      <Github className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                      View Code
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demo, "_blank")}
                      className={`flex-1 gap-2 bg-gradient-to-r ${project.gradient} text-white`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
