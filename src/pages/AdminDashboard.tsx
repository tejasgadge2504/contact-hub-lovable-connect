
import { ContactAuditLog } from '@/components/ContactAuditLog';
import { EmailIntegration } from '@/components/EmailIntegration';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Shield, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  if (!user) {
    return <div>Please log in to access the admin dashboard.</div>;
  }

  if (role !== 'admin') {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Access Denied</h3>
              <p className="text-gray-500">Admin role required to access this dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage system settings and view activity logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ContactAuditLog />
            <EmailIntegration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
