import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ThreatCard, ThreatLevel } from "@/components/dashboard/ThreatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SystemStatusPanel } from "@/components/dashboard/SystemStatusPanel";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { Shield, AlertTriangle, Bug, CheckCircle, Activity } from "lucide-react";

// Mock data
const stats = [
  { 
    title: "Active Threats", 
    value: 12, 
    change: "+3 from yesterday", 
    changeType: "negative" as const,
    icon: AlertTriangle,
    iconColor: "text-destructive"
  },
  { 
    title: "Blocked Attacks", 
    value: "2,847", 
    change: "+127 today", 
    changeType: "positive" as const,
    icon: Shield,
    iconColor: "text-success"
  },
  { 
    title: "Vulnerabilities", 
    value: 23, 
    change: "-5 this week", 
    changeType: "positive" as const,
    icon: Bug,
    iconColor: "text-warning"
  },
  { 
    title: "Uptime", 
    value: "99.9%", 
    change: "Last 30 days", 
    changeType: "neutral" as const,
    icon: Activity,
    iconColor: "text-primary"
  },
];

const threats = [
  {
    id: "THR-2024-0891",
    title: "SQL Injection Attempt Detected",
    description: "Multiple SQL injection attempts detected from IP 192.168.1.105 targeting the authentication endpoint.",
    level: "critical" as ThreatLevel,
    source: "WAF",
    timestamp: "2 min ago",
  },
  {
    id: "THR-2024-0890",
    title: "Unusual Login Pattern",
    description: "Brute force login attempts detected from multiple geographic locations for user admin@company.com.",
    level: "high" as ThreatLevel,
    source: "Auth Monitor",
    timestamp: "15 min ago",
  },
  {
    id: "THR-2024-0889",
    title: "Suspicious API Traffic",
    description: "Abnormal API request volume detected from endpoint /api/v1/users. Rate limiting applied.",
    level: "medium" as ThreatLevel,
    source: "API Gateway",
    timestamp: "1 hour ago",
  },
  {
    id: "THR-2024-0888",
    title: "Certificate Expiring Soon",
    description: "SSL certificate for api.secureops.io will expire in 14 days. Renewal recommended.",
    level: "low" as ThreatLevel,
    source: "Cert Manager",
    timestamp: "3 hours ago",
  },
];

const activities = [
  { id: "1", action: "blocked", target: "IP 192.168.1.105", user: "Firewall", timestamp: "Just now", status: "success" as const },
  { id: "2", action: "detected threat on", target: "/api/auth/login", user: "WAF", timestamp: "2 min ago", status: "warning" as const },
  { id: "3", action: "scanned", target: "production-server-01", user: "Scanner", timestamp: "5 min ago", status: "success" as const },
  { id: "4", action: "updated rules for", target: "DDoS Protection", user: "Admin", timestamp: "10 min ago", status: "success" as const },
  { id: "5", action: "failed auth for", target: "admin@company.com", user: "Auth Service", timestamp: "15 min ago", status: "error" as const },
];

const systems = [
  { name: "API Gateway", status: "online" as const, latency: 45, lastCheck: "1 min ago" },
  { name: "Firewall Cluster", status: "online" as const, latency: 12, lastCheck: "30 sec ago" },
  { name: "Auth Service", status: "online" as const, latency: 89, lastCheck: "2 min ago" },
  { name: "Log Aggregator", status: "online" as const, latency: 156, lastCheck: "1 min ago" },
  { name: "Backup Server", status: "online" as const, latency: 234, lastCheck: "5 min ago" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Security Dashboard" 
          subtitle="Real-time threat monitoring and incident management"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threats Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Threats</h3>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {threats.map((threat) => (
                  <ThreatCard key={threat.id} {...threat} />
                ))}
              </div>
            </div>

            <ThreatMap />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SystemStatusPanel systems={systems} />
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
