
-- Update the default role in user_roles table to 'admin'
ALTER TABLE public.user_roles ALTER COLUMN role SET DEFAULT 'admin'::app_role;

-- Update existing viewer users to admin (optional - only if you want to upgrade existing users)
UPDATE public.user_roles SET role = 'admin' WHERE role = 'viewer';
