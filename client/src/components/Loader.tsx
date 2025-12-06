import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import logoImage from "@assets/Asset_4@4x-8_1765023975945.png";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
    );

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          
          gsap.to(progressTextRef.current, {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          });

          setTimeout(() => {
            gsap.to(loaderRef.current, {
              scale: 1.5,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
              onComplete: onComplete,
            });
          }, 400);
        }
        
        return newProgress;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      data-testid="loader-screen"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-purple/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-cyan/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div
        ref={logoRef}
        className="relative flex flex-col items-center gap-8"
      >
        <div className="relative">
          <img
            src={logoImage}
            alt="SD Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain animate-float"
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-gradient-purple to-gradient-cyan rounded-full opacity-20 blur-2xl" />
        </div>

        <div className="w-64 h-1 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-gradient-purple to-gradient-cyan rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      <span
        ref={progressTextRef}
        className="fixed left-4 bottom-4 md:left-8 md:bottom-8 text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent"
        data-testid="loader-progress"
      >
        {Math.round(progress)}%
      </span>

      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-gradient-purple to-gradient-cyan rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
