import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CreateGroupDialog } from "@/components/team/CreateGroupDialog";
import { GroupCard } from "@/components/team/GroupCard";
import { MembersList } from "@/components/team/MembersList";
import { useGroups, Group } from "@/hooks/useGroups";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const { groups, loading } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Team Management" 
          subtitle="Manage groups and assign roles to team members"
        />

        <div className="flex items-center justify-between mb-6">
          {selectedGroup ? (
            <Button variant="ghost" onClick={() => setSelectedGroup(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Groups
            </Button>
          ) : (
            <div />
          )}
          {!selectedGroup && <CreateGroupDialog />}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : selectedGroup ? (
          <div className="space-y-4">
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
                  {selectedGroup.description && (
                    <p className="text-muted-foreground">{selectedGroup.description}</p>
                  )}
                </div>
              </div>
              <MembersList groupId={selectedGroup.id} />
            </div>
          </div>
        ) : groups.length === 0 ? (
          <div className="glass-card rounded-lg p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Groups Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first group to organize team members and assign roles.
            </p>
            <CreateGroupDialog />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, index) => (
              <div
                key={group.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <GroupCard
                  group={group}
                  onSelect={setSelectedGroup}
                  isSelected={selectedGroup?.id === group.id}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Team;
