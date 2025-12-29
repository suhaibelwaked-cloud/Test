import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Plus,
  MoreVertical,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: "server" | "database" | "network" | "application";
  status: "healthy" | "warning" | "critical";
  ip: string;
  lastScan: string;
  vulnerabilities: number;
}

const assets: Asset[] = [
  {
    id: "AST-001",
    name: "Production Web Server",
    type: "server",
    status: "healthy",
    ip: "10.0.1.100",
    lastScan: "2 hours ago",
    vulnerabilities: 0,
  },
  {
    id: "AST-002",
    name: "Primary Database",
    type: "database",
    status: "healthy",
    ip: "10.0.1.101",
    lastScan: "1 hour ago",
    vulnerabilities: 2,
  },
  {
    id: "AST-003",
    name: "API Gateway",
    type: "network",
    status: "warning",
    ip: "10.0.1.102",
    lastScan: "30 min ago",
    vulnerabilities: 5,
  },
  {
    id: "AST-004",
    name: "Auth Service",
    type: "application",
    status: "healthy",
    ip: "10.0.1.103",
    lastScan: "4 hours ago",
    vulnerabilities: 1,
  },
  {
    id: "AST-005",
    name: "Backup Server",
    type: "server",
    status: "critical",
    ip: "10.0.1.104",
    lastScan: "6 hours ago",
    vulnerabilities: 8,
  },
];

const typeIcons = {
  server: Server,
  database: Database,
  network: Globe,
  application: Shield,
};

const statusConfig = {
  healthy: { color: "text-success", bg: "bg-success/20", label: "Healthy" },
  warning: { color: "text-warning", bg: "bg-warning/20", label: "Warning" },
  critical: { color: "text-destructive", bg: "bg-destructive/20", label: "Critical" },
};

const Assets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Asset Management" 
          subtitle="Monitor and manage your infrastructure assets"
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-success border-success/30 bg-success/10">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {assets.filter(a => a.status === "healthy").length} Healthy
            </Badge>
            <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {assets.filter(a => a.status === "warning").length} Warning
            </Badge>
            <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">
              {assets.filter(a => a.status === "critical").length} Critical
            </Badge>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset, index) => {
            const Icon = typeIcons[asset.type];
            const status = statusConfig[asset.status];
            
            return (
              <div 
                key={asset.id}
                className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-lg", status.bg)}>
                    <Icon className={cn("h-5 w-5", status.color)} />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="font-semibold mb-1">{asset.name}</h3>
                <p className="text-sm text-muted-foreground font-mono mb-3">{asset.ip}</p>
                
                <div className="flex items-center justify-between">
                  <Badge className={cn("text-xs", status.bg, status.color)}>
                    {status.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {asset.vulnerabilities} vulnerabilities
                  </span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  Last scan: {asset.lastScan}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Assets;
