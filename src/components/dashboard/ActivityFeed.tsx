import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  user: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn(
              "status-dot",
              activity.status === "success" && "status-dot-success",
              activity.status === "warning" && "status-dot-warning",
              activity.status === "error" && "status-dot-destructive"
            )} />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium text-foreground">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action} </span>
                <span className="text-primary font-mono text-xs">{activity.target}</span>
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
