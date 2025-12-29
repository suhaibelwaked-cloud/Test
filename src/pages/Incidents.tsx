import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Plus,
  ExternalLink,
  User,
  Calendar
} from "lucide-react";

type IncidentStatus = "open" | "investigating" | "resolved";
type IncidentSeverity = "critical" | "high" | "medium" | "low";

interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

const incidents: Incident[] = [
  {
    id: "INC-2024-0891",
    title: "SQL Injection Attack - Production Database",
    description: "Critical SQL injection vulnerability exploited on the production authentication endpoint. Immediate action required.",
    status: "investigating",
    severity: "critical",
    assignee: "John Smith",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
  },
  {
    id: "INC-2024-0890",
    title: "Brute Force Attack on Admin Portal",
    description: "Multiple failed login attempts detected targeting administrator accounts. IP has been blocked.",
    status: "investigating",
    severity: "high",
    assignee: "Sarah Johnson",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "INC-2024-0889",
    title: "Suspicious API Activity",
    description: "Unusual pattern of API requests detected from internal network. Under investigation.",
    status: "open",
    severity: "medium",
    assignee: "Unassigned",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "INC-2024-0888",
    title: "SSL Certificate Renewal Required",
    description: "Production SSL certificate expires in 14 days. Renewal process initiated.",
    status: "resolved",
    severity: "low",
    assignee: "Mike Chen",
    createdAt: "2024-01-14T14:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "INC-2024-0887",
    title: "DDoS Attack Mitigated",
    description: "Large-scale DDoS attack successfully blocked by firewall rules. No service impact.",
    status: "resolved",
    severity: "critical",
    assignee: "John Smith",
    createdAt: "2024-01-14T02:30:00Z",
    updatedAt: "2024-01-14T05:15:00Z",
  },
];

const statusConfig = {
  open: { label: "Open", color: "bg-warning/20 text-warning border-warning/30" },
  investigating: { label: "Investigating", color: "bg-accent/20 text-accent border-accent/30" },
  resolved: { label: "Resolved", color: "bg-success/20 text-success border-success/30" },
};

const severityConfig = {
  critical: { label: "Critical", color: "bg-destructive/20 text-destructive" },
  high: { label: "High", color: "bg-warning/20 text-warning" },
  medium: { label: "Medium", color: "bg-accent/20 text-accent" },
  low: { label: "Low", color: "bg-success/20 text-success" },
};

const Incidents = () => {
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | "all">("all");

  const filteredIncidents = incidents.filter(
    incident => filterStatus === "all" || incident.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Incident Management" 
          subtitle="Track and manage security incidents"
        />

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All ({incidents.length})
            </Button>
            <Button 
              variant={filterStatus === "open" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("open")}
            >
              <Clock className="h-4 w-4 mr-1" />
              Open
            </Button>
            <Button 
              variant={filterStatus === "investigating" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("investigating")}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Investigating
            </Button>
            <Button 
              variant={filterStatus === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("resolved")}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Resolved
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Incident
          </Button>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.map((incident, index) => (
            <div 
              key={incident.id}
              className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
                    <Badge className={cn("text-xs border", statusConfig[incident.status].color)}>
                      {statusConfig[incident.status].label}
                    </Badge>
                    <Badge className={cn("text-xs", severityConfig[incident.severity].color)}>
                      {severityConfig[incident.severity].label}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{incident.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{incident.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Updated {new Date(incident.updatedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Incidents;
