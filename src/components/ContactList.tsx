
import { Contact } from '@/types/contact';
import { ContactCard } from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  userRole: 'admin' | 'viewer';
}

export const ContactList = ({ contacts, onEdit, onDelete, userRole }: ContactListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          userRole={userRole}
        />
      ))}
    </div>
  );
};
