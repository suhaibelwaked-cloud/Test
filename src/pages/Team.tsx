import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  User, 
  Mail, 
  Shield,
  Plus,
  MoreVertical
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  avatar: string;
  status: "online" | "offline";
}

const team: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    avatar: "JS",
    status: "online",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "analyst",
    avatar: "SJ",
    status: "online",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "analyst",
    avatar: "MC",
    status: "offline",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@company.com",
    role: "viewer",
    avatar: "ED",
    status: "online",
  },
];

const roleConfig = {
  admin: { label: "Admin", color: "bg-primary/20 text-primary" },
  analyst: { label: "Analyst", color: "bg-accent/20 text-accent" },
  viewer: { label: "Viewer", color: "bg-muted text-muted-foreground" },
};

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Team Management" 
          subtitle="Manage your security team members"
        />

        <div className="flex items-center justify-end mb-6">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <div className="grid gap-4">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className="glass-card rounded-lg p-5 flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                    {member.avatar}
                  </div>
                  <div className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                    member.status === "online" ? "bg-success" : "bg-muted-foreground"
                  )} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={cn("text-xs", roleConfig[member.role].color)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {roleConfig[member.role].label}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Team;
