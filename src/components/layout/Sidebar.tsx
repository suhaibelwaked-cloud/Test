import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Settings, 
  Shield,
  Activity,
  FileText,
  Users,
  Bell
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/incidents", icon: AlertTriangle, label: "Incidents" },
  { href: "/assets", icon: Shield, label: "Assets" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/team", icon: Users, label: "Team" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 blur-lg bg-primary/30" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient">SecureOps</h1>
            <p className="text-xs text-muted-foreground">Nexus Control</p>
          </div>
        </Link>
      </div>

      {/* Status indicator */}
      <div className="mx-4 my-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-foreground">System Status</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-dot status-dot-success" />
          <span className="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span>{item.label}</span>
              {item.label === "Incidents" && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-destructive/20 text-destructive font-medium">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
          <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary font-medium">
            5
          </span>
        </button>
      </div>
    </aside>
  );
}
