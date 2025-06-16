
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface ContactFormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

export const ContactFormActions = ({ onCancel, isEditing }: ContactFormActionsProps) => {
  return (
    <div className="flex space-x-4 pt-6">
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 flex items-center space-x-2"
      >
        <Save className="h-4 w-4" />
        <span>{isEditing ? 'Update Contact' : 'Save Contact'}</span>
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="px-8 py-2"
      >
        Cancel
      </Button>
    </div>
  );
};
