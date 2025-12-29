import { cn } from "@/lib/utils";
import { Server, Wifi, WifiOff } from "lucide-react";

interface SystemStatus {
  name: string;
  status: "online" | "offline" | "degraded";
  latency?: number;
  lastCheck: string;
}

interface SystemStatusProps {
  systems: SystemStatus[];
}

export function SystemStatusPanel({ systems }: SystemStatusProps) {
  return (
    <div className="glass-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">System Status</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="status-dot status-dot-success" />
          <span>All systems operational</span>
        </div>
      </div>
      <div className="space-y-2">
        {systems.map((system, index) => (
          <div 
            key={system.name}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{system.name}</span>
            </div>
            <div className="flex items-center gap-4">
              {system.latency && (
                <span className="text-xs text-muted-foreground font-mono">
                  {system.latency}ms
                </span>
              )}
              <div className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
                system.status === "online" && "bg-success/20 text-success",
                system.status === "offline" && "bg-destructive/20 text-destructive",
                system.status === "degraded" && "bg-warning/20 text-warning"
              )}>
                {system.status === "online" ? (
                  <Wifi className="h-3 w-3" />
                ) : (
                  <WifiOff className="h-3 w-3" />
                )}
                <span className="capitalize">{system.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
