import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThreatMapProps {
  className?: string;
}

interface ThreatPoint {
  id: string;
  x: number;
  y: number;
  level: "critical" | "high" | "medium" | "low";
  active: boolean;
}

const levelColors = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#a855f7",
  low: "#22c55e",
};

export function ThreatMap({ className }: ThreatMapProps) {
  const [points, setPoints] = useState<ThreatPoint[]>([]);

  useEffect(() => {
    // Generate random threat points
    const levels: ThreatPoint["level"][] = ["critical", "high", "medium", "low"];
    const initialPoints: ThreatPoint[] = Array.from({ length: 12 }, (_, i) => ({
      id: `threat-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      level: levels[Math.floor(Math.random() * levels.length)],
      active: Math.random() > 0.3,
    }));
    setPoints(initialPoints);

    // Animate points
    const interval = setInterval(() => {
      setPoints(prev => prev.map(point => ({
        ...point,
        active: Math.random() > 0.3,
        x: point.x + (Math.random() - 0.5) * 2,
        y: point.y + (Math.random() - 0.5) * 2,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("glass-card rounded-lg p-5 overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Global Threat Map</h3>
        <div className="flex items-center gap-3">
          {(["critical", "high", "medium", "low"] as const).map(level => (
            <div key={level} className="flex items-center gap-1.5 text-xs">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: levelColors[level] }}
              />
              <span className="text-muted-foreground capitalize">{level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-64 bg-secondary/30 rounded-lg overflow-hidden">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-b from-primary/30 to-transparent animate-scan"
          />
        </div>

        {/* Threat points */}
        {points.map(point => (
          <div
            key={point.id}
            className={cn(
              "absolute w-3 h-3 rounded-full transition-all duration-1000",
              point.active ? "opacity-100 scale-100" : "opacity-30 scale-75"
            )}
            style={{
              left: `${Math.max(5, Math.min(95, point.x))}%`,
              top: `${Math.max(5, Math.min(95, point.y))}%`,
              backgroundColor: levelColors[point.level],
              boxShadow: point.active 
                ? `0 0 12px ${levelColors[point.level]}, 0 0 24px ${levelColors[point.level]}40`
                : "none",
            }}
          />
        ))}

        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full border border-primary/30 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-primary/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
