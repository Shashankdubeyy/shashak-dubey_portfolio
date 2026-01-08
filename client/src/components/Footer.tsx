import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";


const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/shashankdubey",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/shashankdubey",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:shashankdub789@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-12 border-t border-border/50"
      data-testid="footer"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="group">
              <img
                src={logoImage}
                alt="SD Logo"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </a>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Building secure, scalable web applications.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open(social.href, "_blank")}
                  className="group"
                  data-testid={`footer-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Shashank_Dubey_Resume.pdf";
                link.click();
              }}
              className="gap-2 group border-gradient-purple/50 hover:border-gradient-purple"
              data-testid="footer-download-cv"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shashank Dubey. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Bhopal
          </p>
        </div>
      </div>
    </footer>
  );
}
