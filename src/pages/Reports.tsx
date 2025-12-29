import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: "security" | "compliance" | "incident" | "vulnerability";
  date: string;
  status: "ready" | "generating" | "scheduled";
}

const reports: Report[] = [
  {
    id: "RPT-001",
    title: "Weekly Security Summary",
    type: "security",
    date: "2024-01-15",
    status: "ready",
  },
  {
    id: "RPT-002",
    title: "Compliance Audit Report",
    type: "compliance",
    date: "2024-01-14",
    status: "ready",
  },
  {
    id: "RPT-003",
    title: "Incident Response Analysis",
    type: "incident",
    date: "2024-01-13",
    status: "ready",
  },
  {
    id: "RPT-004",
    title: "Vulnerability Assessment",
    type: "vulnerability",
    date: "2024-01-12",
    status: "generating",
  },
];

const typeConfig = {
  security: { icon: Shield, color: "text-primary", bg: "bg-primary/10" },
  compliance: { icon: FileText, color: "text-success", bg: "bg-success/10" },
  incident: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  vulnerability: { icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
};

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Reports" 
          subtitle="Security reports and compliance documentation"
        />

        <div className="grid gap-4">
          {reports.map((report, index) => {
            const config = typeConfig[report.type];
            const Icon = config.icon;
            
            return (
              <div 
                key={report.id}
                className="glass-card rounded-lg p-5 flex items-center justify-between animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", config.bg)}>
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="font-mono">{report.id}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn(
                    "text-xs",
                    report.status === "ready" && "bg-success/20 text-success",
                    report.status === "generating" && "bg-warning/20 text-warning",
                    report.status === "scheduled" && "bg-muted text-muted-foreground"
                  )}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm" disabled={report.status !== "ready"}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Reports;
