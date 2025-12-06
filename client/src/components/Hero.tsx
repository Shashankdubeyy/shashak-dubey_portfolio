import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Github, Download, Code2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursiveRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      cursiveRef.current,
      { x: -100, opacity: 0, rotate: -5 },
      { x: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        nameRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

    const particles = particlesRef.current?.querySelectorAll(".particle");
    particles?.forEach((particle, i) => {
      gsap.to(particle, {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(particlesRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-purple/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-cyan/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gradient-purple/20 to-gradient-cyan/20 rounded-full blur-3xl" />
      </div>

      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? "rgba(139, 92, 246, 0.4)" 
                : "rgba(34, 211, 238, 0.4)",
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="particle absolute w-1 h-1 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "white",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
        <div className="relative inline-block mb-2">
          <span
            ref={cursiveRef}
            className="font-cursive text-3xl md:text-5xl lg:text-6xl text-gradient-cyan block transform -rotate-2 mb-[-0.5rem] md:mb-[-1rem]"
            style={{ 
              textShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
            }}
          >
            Hi, I'm
          </span>
        </div>

        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Shashank
          </span>
          <br />
          <span className="bg-gradient-to-r from-gradient-purple via-gradient-cyan to-gradient-purple bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
            Dubey
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          <span className="inline-flex items-center gap-2">
            <Code2 className="h-5 w-5 text-gradient-purple" />
            Full-Stack Developer
          </span>
          <span className="mx-3 text-border">|</span>
          <span className="inline-flex items-center gap-2">
            <Shield className="h-5 w-5 text-gradient-cyan" />
            Cybersecurity Enthusiast
          </span>
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="group relative overflow-hidden bg-gradient-to-r from-gradient-purple to-gradient-cyan text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-gradient-purple/25 hover:shadow-xl hover:shadow-gradient-purple/30 transition-all duration-300"
            data-testid="view-projects-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gradient-cyan to-gradient-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://github.com/shashankdubey", "_blank")}
              className="group relative overflow-hidden border-2 border-gradient-purple/50 hover:border-gradient-purple px-6 py-6"
              data-testid="hero-github-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Github className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                GitHub
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-purple/10 to-gradient-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Shashank_Dubey_Resume.pdf";
                link.click();
              }}
              className="group relative overflow-hidden border-2 border-gradient-cyan/50 hover:border-gradient-cyan px-6 py-6"
              data-testid="hero-cv-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-cyan/10 to-gradient-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="p-2 rounded-full border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          data-testid="scroll-down-button"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
