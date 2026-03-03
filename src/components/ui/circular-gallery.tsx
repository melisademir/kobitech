import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  common: string;
  binomial: string;
  description?: string;
  tags?: string[];
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const dragStartRef = useRef<{ x: number; rotation: number } | null>(null);

    // Drag support
    const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, rotation };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      setRotation(dragStartRef.current.rotation + dx * 0.3);
    };
    const handlePointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    // Auto-rotate when not dragging
    useEffect(() => {
      const autoRotate = () => {
        if (!isDragging) setRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isDragging, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
        style={{ perspective: '2000px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.6, 1 - (normalizedAngle / 270));
            const isFront = normalizedAngle < 40;

            return (
              <div
                key={item.common}
                role="group"
                aria-label={item.common}
                className="absolute w-[240px] sm:w-[280px] md:w-[320px] h-[340px] sm:h-[380px] md:h-[420px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-200px',
                  opacity,
                  transition: 'opacity 0.3s linear',
                }}
              >
                <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border border-border/30 bg-card/70 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white flex flex-col gap-1.5">
                    <h2 className="text-lg md:text-xl font-extrabold leading-tight">{item.common}</h2>
                    <em className="text-xs italic opacity-70">{item.binomial}</em>
                    {isFront && item.description && (
                      <p className="text-[11px] leading-relaxed opacity-80 mt-1 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    {isFront && item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
