
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';

interface ContactFormHeaderProps {
  onCancel: () => void;
  isEditing: boolean;
}

export const ContactFormHeader = ({ onCancel, isEditing }: ContactFormHeaderProps) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="p-2 hover:bg-white rounded-lg"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-blue-600 rounded-xl">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Contact' : 'Add New Contact'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update contact information' : 'Enter contact details'}
          </p>
        </div>
      </div>
    </div>
  );
};
