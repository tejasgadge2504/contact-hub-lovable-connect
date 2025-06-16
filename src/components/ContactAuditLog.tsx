
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { formatDistanceToNow } from 'date-fns';
import { Activity, User, Edit, Trash2, Plus } from 'lucide-react';

interface AuditEntry {
  id: string;
  action: 'created' | 'updated' | 'deleted';
  contact_name: string;
  user_email: string;
  timestamp: string;
  details?: string;
}

export const ContactAuditLog = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);

  useEffect(() => {
    // Mock audit data - in a real app, this would come from Supabase
    const mockAuditEntries: AuditEntry[] = [
      {
        id: '1',
        action: 'created',
        contact_name: 'John Doe',
        user_email: user?.email || 'admin@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        details: 'Contact added with work tag'
      },
      {
        id: '2',
        action: 'updated',
        contact_name: 'Jane Smith',
        user_email: user?.email || 'admin@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        details: 'Updated phone number'
      },
      {
        id: '3',
        action: 'deleted',
        contact_name: 'Old Contact',
        user_email: user?.email || 'admin@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        details: 'Contact removed'
      }
    ];
    setAuditEntries(mockAuditEntries);
  }, [user]);

  if (role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Access denied. Admin role required to view audit logs.</p>
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'updated':
        return <Edit className="h-4 w-4 text-blue-600" />;
      case 'deleted':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-100 text-green-800';
      case 'updated':
        return 'bg-blue-100 text-blue-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Contact Activity Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditEntries.map((entry) => (
            <div key={entry.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {getActionIcon(entry.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Badge className={getActionColor(entry.action)}>
                    {entry.action}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900">
                    {entry.contact_name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{entry.user_email}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                  </span>
                </div>
                {entry.details && (
                  <p className="text-xs text-gray-600 mt-1">{entry.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
