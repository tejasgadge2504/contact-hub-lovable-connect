
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contact } from '@/types/contact';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export const useContacts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    if (!user) {
      setContacts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const addContact = async (contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setContacts(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Contact added successfully",
      });
      return data;
    } catch (error: any) {
      console.error('Error adding contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add contact",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateContact = async (id: string, contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(contactData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setContacts(prev => prev.map(contact => 
        contact.id === id ? data : contact
      ));
      toast({
        title: "Success",
        description: "Contact updated successfully",
      });
      return data;
    } catch (error: any) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteContact = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setContacts(prev => prev.filter(contact => contact.id !== id));
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts,
  };
};
