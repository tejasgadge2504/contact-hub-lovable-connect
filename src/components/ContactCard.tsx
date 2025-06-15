
import { Contact } from '@/types/contact';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, User, Trash2, Mail, Phone, Building } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  userRole: 'admin' | 'viewer';
}

export const ContactCard = ({ contact, onEdit, onDelete, userRole }: ContactCardProps) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      onDelete(contact.id);
    }
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{contact.name}</h3>
              <p className="text-sm text-gray-500">
                Added {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          {userRole === 'admin' && (
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(contact)}
                className="text-gray-500 hover:text-blue-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{contact.email}</span>
          </div>
          
          {contact.phone && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{contact.phone}</span>
            </div>
          )}
          
          {contact.company && (
            <div className="flex items-center space-x-2 text-sm">
              <Building className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{contact.company}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {contact.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {contact.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Notes */}
        {contact.notes && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="line-clamp-2">{contact.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
