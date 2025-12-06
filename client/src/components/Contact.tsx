import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shashankdub789@gmail.com",
    href: "mailto:shashankdub789@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8349159401",
    href: "tel:+918349159401",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bhopal, Madhya Pradesh",
    href: "#",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message sent!",
          description: data.message || "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="contact-section"
    >
      <div className="absolute inset-0 bg-hero-gradient opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-center mb-12 md:mb-16"
        >
          <span className="font-cursive text-2xl md:text-3xl text-gradient-cyan block mb-2 transform -rotate-1">
            Let's connect
          </span>
          Get In <span className="bg-gradient-to-r from-gradient-purple to-gradient-cyan bg-clip-text text-transparent">Touch</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background/50"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background/50"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-background/50 resize-none"
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 bg-gradient-to-r from-gradient-purple to-gradient-cyan text-white font-semibold py-6 shadow-lg shadow-gradient-purple/25 hover:shadow-xl hover:shadow-gradient-purple/30 transition-all duration-300"
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div ref={infoRef} className="flex flex-col gap-4">
            {contactInfo.map((info, i) => (
              <a
                key={info.label}
                href={info.href}
                className="group"
                data-testid={`contact-${info.label.toLowerCase()}`}
              >
                <Card className="p-5 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gradient-purple/30 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-gradient-purple/20 to-gradient-cyan/20 group-hover:from-gradient-purple/30 group-hover:to-gradient-cyan/30 transition-colors">
                      <info.icon className="h-5 w-5 text-gradient-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium text-foreground">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}

            <Card className="flex-1 p-6 bg-gradient-to-br from-gradient-purple/10 to-gradient-cyan/10 border-border/50 flex flex-col justify-center">
              <h3 className="text-lg font-bold font-display text-foreground mb-2">
                Open to Opportunities
              </h3>
              <p className="text-muted-foreground">
                I'm actively seeking internships and junior developer roles. 
                Feel free to reach out if you have an exciting opportunity!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
