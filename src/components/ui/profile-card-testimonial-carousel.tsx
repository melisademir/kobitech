import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist, InsightX",
    description:
      "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions. Their dashboarding capabilities went above and beyond our expectations.",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product, NovaLabs",
    description:
      "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex items-stretch gap-0">
        {/* Avatar */}
        <div className="flex-shrink-0 relative" style={{ width: "340px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-2xl overflow-hidden"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="flex-1 -ml-6 z-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-8 w-full"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="text-2xl font-extrabold text-foreground mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {currentTestimonial.name}
              </h3>

              <p className="text-sm text-muted-foreground italic mb-4">
                {currentTestimonial.title}
              </p>

              <p className="text-foreground/80 text-base leading-relaxed mb-5">
                {currentTestimonial.description}
              </p>

              <div className="flex items-center gap-3">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: "hsl(var(--foreground))",
                      color: "hsl(var(--background))",
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center gap-0">
        {/* Avatar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-${currentTestimonial.imageUrl}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-2xl rounded-b-none overflow-hidden"
            style={{ height: "280px" }}
          >
            <img
              src={currentTestimonial.imageUrl}
              alt={currentTestimonial.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Card content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-card-${currentTestimonial.name}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl rounded-t-none p-6 w-full"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderTop: "none",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <h3 className="text-lg font-extrabold text-foreground mb-1">
              {currentTestimonial.name}
            </h3>
            <p className="text-xs text-muted-foreground italic mb-3">
              {currentTestimonial.title}
            </p>
            <p className="text-foreground/80 text-sm leading-relaxed mb-4">
              {currentTestimonial.description}
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: IconComponent, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "hsl(var(--foreground))",
                    color: "hsl(var(--background))",
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: "hsl(var(--muted))",
            color: "hsl(var(--foreground))",
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, testimonialIndex) => (
            <button
              key={testimonialIndex}
              onClick={() => setCurrentIndex(testimonialIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                testimonialIndex === currentIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/30"
              )}
              aria-label={`Go to testimonial ${testimonialIndex + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: "hsl(var(--muted))",
            color: "hsl(var(--foreground))",
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
