
import { useState } from 'react';
import { Contact } from '@/types/contact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ContactFormHeader } from './ContactFormHeader';
import { ContactFormFields } from './ContactFormFields';
import { ContactFormActions } from './ContactFormActions';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void;
  onCancel: () => void;
  initialData?: Contact | null;
  isEditing?: boolean;
}

export const ContactForm = ({ onSubmit, onCancel, initialData, isEditing = false }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    tags: initialData?.tags || [],
    notes: initialData?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Validation Error", 
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: isEditing ? "Contact Updated" : "Contact Added",
      description: isEditing ? "Contact has been successfully updated" : "New contact has been successfully added",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <ContactFormHeader onCancel={onCancel} isEditing={isEditing} />

        <Card className="max-w-2xl bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ContactFormFields formData={formData} setFormData={setFormData} />
              <ContactFormActions onCancel={onCancel} isEditing={isEditing} />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
