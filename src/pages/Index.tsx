
import { useState } from 'react';
import { ContactList } from '@/components/ContactList';
import { ContactForm } from '@/components/ContactForm';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { Auth } from '@/components/Auth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { Contact } from '@/types/contact';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { useContacts } from '@/hooks/useContacts';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { role } = useUserRole();
  const { contacts, loading: contactsLoading, addContact, updateContact, deleteContact } = useContacts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('name');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const handleAddContact = async (contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const newContact = await addContact(contactData);
    if (newContact) {
      setShowForm(false);
    }
  };

  const handleEditContact = async (contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!editingContact) return;
    
    const updatedContact = await updateContact(editingContact.id, contactData);
    if (updatedContact) {
      setEditingContact(null);
      setShowForm(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact(id);
  };

  const filteredAndSortedContacts = contacts
    .filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => contact.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const startEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (showForm) {
    return (
      <div>
        <Navbar />
        <ContactForm
          onSubmit={editingContact ? handleEditContact : handleAddContact}
          onCancel={cancelForm}
          initialData={editingContact}
          isEditing={!!editingContact}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
                <p className="text-gray-600">Manage your contacts efficiently</p>
              </div>
            </div>
            
            {role === 'admin' && (
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Contact
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SearchBar 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm} 
                />
              </div>
              <div>
                <FilterPanel
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>
          </div>

          {/* Contact List */}
          {contactsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading contacts...</p>
            </div>
          ) : (
            <ContactList
              contacts={filteredAndSortedContacts}
              onEdit={startEdit}
              onDelete={handleDeleteContact}
              userRole={role}
            />
          )}

          {/* Empty State */}
          {!contactsLoading && filteredAndSortedContacts.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {contacts.length === 0 ? 'No contacts yet' : 'No contacts match your filters'}
              </h3>
              <p className="text-gray-500 mb-6">
                {contacts.length === 0 ? 'Get started by adding your first contact' : 'Try adjusting your search or filters'}
              </p>
              {role === 'admin' && contacts.length === 0 && (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Contact
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
