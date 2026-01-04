import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Shield, Crown, User, Eye, Trash2 } from "lucide-react";
import { GroupMember, useGroupMembers } from "@/hooks/useGroups";
import { cn } from "@/lib/utils";

const roleConfig = {
  owner: { label: "Owner", icon: Crown, color: "bg-warning/20 text-warning" },
  admin: { label: "Admin", icon: Shield, color: "bg-primary/20 text-primary" },
  member: { label: "Member", icon: User, color: "bg-accent/20 text-accent" },
  viewer: { label: "Viewer", icon: Eye, color: "bg-muted text-muted-foreground" },
};

interface MembersListProps {
  groupId: string;
}

export const MembersList = ({ groupId }: MembersListProps) => {
  const { members, loading, updateMemberRole, removeMember } = useGroupMembers(groupId);

  const getInitials = (member: GroupMember) => {
    const name = member.profile?.full_name || member.profile?.email || "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No members in this group yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {members.map((member, index) => {
        const RoleIcon = roleConfig[member.role].icon;
        return (
          <div
            key={member.id}
            className="glass-card rounded-lg p-4 flex items-center justify-between animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {getInitials(member)}
              </div>
              <div>
                <p className="font-medium">
                  {member.profile?.full_name || "Unknown User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.profile?.email || "No email"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", roleConfig[member.role].color)}>
                <RoleIcon className="h-3 w-3 mr-1" />
                {roleConfig[member.role].label}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Shield className="h-4 w-4 mr-2" />
                      Change Role
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => {
                        const Icon = roleConfig[role].icon;
                        return (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => updateMemberRole(member.id, role)}
                            disabled={member.role === role}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {roleConfig[role].label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => removeMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove from Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
};
