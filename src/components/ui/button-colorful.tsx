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
          "group relative h-12 px-8 overflow-hidden rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
        style={{
          background: "linear-gradient(90deg, #4A1DB5 0%, #00D4AA 100%)",
          boxShadow: "0 4px 20px rgba(74,29,181,0.35)",
        }}
        {...props}
      >
        {/* Glow effect on hover */}
        <span
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, #3D1A8C 0%, #00B894 100%)",
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
