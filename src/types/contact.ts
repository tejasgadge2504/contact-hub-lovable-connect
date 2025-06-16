
export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tags: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const TAG_OPTIONS = [
  'Family',
  'Work', 
  'Client',
  'Vendor',
  'Friend'
] as const;

export type TagOption = typeof TAG_OPTIONS[number];
