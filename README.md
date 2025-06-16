
# Contact Management System

A modern, full-featured contact management system built with React, TypeScript, and Supabase. This application provides a complete solution for storing, managing, and organizing your contacts with role-based access control.

## 🚀 Features

### Core Functionality
- **Contact Management**: Create, read, update, and delete contacts
- **Advanced Search**: Search by name, email, or company
- **Smart Filtering**: Filter contacts by tags (Family, Work, Client, Vendor, Friend)
- **Flexible Sorting**: Sort by name or creation date
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Authentication & Authorization
- **Email Authentication**: Secure login with email and password
- **Google OAuth**: Optional Google sign-in integration
- **Role-Based Access**: 
  - **Admin**: Full CRUD permissions
  - **Viewer**: Read-only access

### Advanced Features
- **Audit Logging**: Track all contact activities (admin only)
- **Email Integration**: Zapier webhook support for automated workflows
- **Real-time Updates**: Live data synchronization with Supabase
- **Tag System**: Organize contacts with customizable tags

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Lucide React Icons
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Build Tool**: Vite
- **Deployment**: Lovable Platform
- **Version Control**: GitHub

## 📊 Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### User Roles
```sql
CREATE TYPE app_role AS ENUM ('admin', 'viewer');

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- A Supabase account
- A GitHub account (for deployment)

### Environment Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Configure Authentication**
   - In Supabase Dashboard, go to Authentication > Settings
   - Set Site URL to your domain
   - Configure email templates if needed

3. **Set Up Database**
   - The database schema is automatically created via migrations
   - Run the provided SQL migrations in your Supabase SQL editor

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/contact-management-lovable.git
   cd contact-management-lovable
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase Connection**
   - Update `src/integrations/supabase/client.ts` with your Supabase credentials

4. **Run the Application**
   ```bash
   npm run dev
   ```

## 👥 User Guide

### Getting Started
1. **Sign Up**: Create an account using email/password or Google OAuth
2. **First Login**: New users are assigned the "viewer" role by default
3. **Role Assignment**: Contact an admin to upgrade to "admin" role if needed

### Managing Contacts

#### Adding Contacts (Admin Only)
1. Click the "Add Contact" button
2. Fill in the required fields (Name, Email)
3. Add optional information (Phone, Company, Tags, Notes)
4. Click "Save Contact"

#### Viewing Contacts
- **List View**: See all contacts in a grid layout
- **Search**: Use the search bar to find contacts by name, email, or company
- **Filter**: Filter by tags using the filter dropdown
- **Sort**: Sort by name (A-Z) or creation date (newest first)

#### Editing Contacts (Admin Only)
1. Click the edit icon on any contact card
2. Update the information
3. Click "Update Contact"

#### Deleting Contacts (Admin Only)
1. Click the delete icon on any contact card
2. Confirm the deletion in the popup

### Admin Features

#### Audit Log
- View all contact activities (create, update, delete)
- Track which user performed each action
- See timestamps and action details

#### Email Integration
1. Go to Admin Dashboard
2. Set up a Zapier webhook URL
3. Test the integration
4. Automatic notifications when contacts are added

## 🔧 Configuration

### Role Management
By default, all new users are assigned the "viewer" role. To promote users to admin:

1. Go to your Supabase Dashboard
2. Navigate to Table Editor > user_roles
3. Find the user's record
4. Change the role from "viewer" to "admin"

### Email Integration Setup
1. Create a Zapier account
2. Create a new Zap with "Webhooks by Zapier" trigger
3. Choose "Catch Hook" event
4. Copy the webhook URL
5. Paste it in the Admin Dashboard > Email Integration
6. Set up your email action (Gmail, Outlook, etc.)

### Google OAuth (Optional)
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add your domain to authorized origins
4. Configure in Supabase Dashboard > Authentication > Providers

## 🚀 Deployment

### Using Lovable Platform
1. Connect your GitHub repository to Lovable
2. Configure environment variables
3. Deploy with one click

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own contacts
- **Role-Based Access Control**: Admin/viewer permission system
- **Secure Authentication**: Powered by Supabase Auth
- **Data Validation**: Client and server-side validation
- **CORS Protection**: Properly configured for web security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: [Link to detailed docs]

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development platform
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Backend powered by [Supabase](https://supabase.com)

---

**Made with ❤️ using Lovable, React, and Supabase by TEJAS GADGE**
(www.tejasgadge.xyz)
