import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Group {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  member_count?: number;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  created_at: string;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchGroups = async () => {
    if (!user) {
      setGroups([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error: any) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (name: string, description?: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      // Create the group
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert({ name, description })
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as owner
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: user.id,
          role: 'owner',
        });

      if (memberError) throw memberError;

      toast({ title: 'Group created successfully' });
      await fetchGroups();
      return { data: group, error: null };
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to create group', description: error.message });
      return { error };
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', groupId);

      if (error) throw error;

      toast({ title: 'Group deleted successfully' });
      await fetchGroups();
      return { error: null };
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to delete group', description: error.message });
      return { error };
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user]);

  return { groups, loading, createGroup, deleteGroup, refetch: fetchGroups };
};

export const useGroupMembers = (groupId: string | null) => {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMembers = async () => {
    if (!groupId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profile:profiles(full_name, email, avatar_url)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const formattedMembers = (data || []).map(member => ({
        ...member,
        profile: Array.isArray(member.profile) ? member.profile[0] : member.profile
      }));
      
      setMembers(formattedMembers);
    } catch (error: any) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (userId: string, role: 'owner' | 'admin' | 'member' | 'viewer' = 'member') => {
    if (!groupId) return { error: new Error('No group selected') };

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: userId,
          role,
        });

      if (error) throw error;

      toast({ title: 'Member added successfully' });
      await fetchMembers();
      return { error: null };
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to add member', description: error.message });
      return { error };
    }
  };

  const updateMemberRole = async (memberId: string, role: 'owner' | 'admin' | 'member' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('group_members')
        .update({ role })
        .eq('id', memberId);

      if (error) throw error;

      toast({ title: 'Role updated successfully' });
      await fetchMembers();
      return { error: null };
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to update role', description: error.message });
      return { error };
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      toast({ title: 'Member removed successfully' });
      await fetchMembers();
      return { error: null };
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to remove member', description: error.message });
      return { error };
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [groupId]);

  return { members, loading, addMember, updateMemberRole, removeMember, refetch: fetchMembers };
};
