import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export type ThreatLevel = "critical" | "high" | "medium" | "low";

interface ThreatCardProps {
  id: string;
  title: string;
  description: string;
  level: ThreatLevel;
  source: string;
  timestamp: string;
  onClick?: () => void;
}

const levelConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    badge: "bg-destructive/20 text-destructive",
  },
  high: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    badge: "bg-warning/20 text-warning",
  },
  medium: {
    icon: Shield,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    badge: "bg-accent/20 text-accent",
  },
  low: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    badge: "bg-success/20 text-success",
  },
};

export function ThreatCard({ 
  id, 
  title, 
  description, 
  level, 
  source, 
  timestamp,
  onClick 
}: ThreatCardProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "glass-card rounded-lg p-4 cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-elevated animate-slide-in",
        config.border
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-2 rounded-lg", config.bg)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-semibold text-foreground truncate">{title}</h4>
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium uppercase", config.badge)}>
              {level}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">{id}</span>
            <div className="flex items-center gap-3">
              <span>{source}</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
