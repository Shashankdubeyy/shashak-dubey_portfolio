import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Download, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";


const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const githubBtnRef = useRef<HTMLButtonElement>(null);
  const cvBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );

    const buttons = [githubBtnRef.current, cvBtnRef.current];
    buttons.forEach((btn, i) => {
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.8 + i * 0.1 }
        );
      }
    });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a
            href="#"
            className="relative group flex-shrink-0"
            data-testid="logo-link"
          >
            <img
              ref={logoRef}
              src={logoImage}
              alt="SD Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-gradient-purple to-gradient-cyan opacity-0 group-hover:opacity-20 rounded-lg blur-lg transition-opacity duration-300" />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gradient-purple to-gradient-cyan group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="relative overflow-visible"
              data-testid="theme-toggle"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gradient-cyan transition-transform duration-300 hover:rotate-180" />
              ) : (
                <Moon className="h-5 w-5 text-gradient-purple transition-transform duration-300 hover:-rotate-12" />
              )}
            </Button>

            <Button
              ref={githubBtnRef}
              variant="outline"
              size="default"
              className="hidden sm:flex items-center gap-2 group relative overflow-hidden border-gradient-purple/50 hover:border-gradient-purple"
              onClick={() => window.open("https://github.com/shashankdubey", "_blank")}
              data-testid="github-button"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[360deg]" />
              <span className="hidden lg:inline">GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-purple/10 to-gradient-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              ref={cvBtnRef}
              size="default"
              className="hidden sm:flex items-center gap-2 group relative overflow-hidden bg-gradient-to-r from-gradient-purple to-gradient-cyan hover:shadow-lg hover:shadow-gradient-purple/25"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Shashank_Dubey_Resume.pdf";
                link.click();
              }}
              data-testid="cv-download-button"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>CV</span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => window.open("https://github.com/shashankdubey", "_blank")}
                data-testid="mobile-github-button"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button
                size="sm"
                className="flex-1 gap-2 bg-gradient-to-r from-gradient-purple to-gradient-cyan"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Shashank_Dubey_Resume.pdf";
                  link.click();
                }}
                data-testid="mobile-cv-button"
              >
                <Download className="h-4 w-4" />
                CV
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
