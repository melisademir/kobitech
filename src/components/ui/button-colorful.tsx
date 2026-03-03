import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "group relative h-12 px-8 overflow-hidden rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary)))",
      }}
      {...props}
    >
      {/* Glow effect on hover */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.8), hsl(var(--primary-glow) / 0.8), hsl(var(--primary) / 0.8))",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 text-white">
        <span>{label}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Button>
  );
}
