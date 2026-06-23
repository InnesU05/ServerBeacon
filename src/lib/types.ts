export type ServerEdition = 'java' | 'bedrock' | 'crossplay';

export type Server = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category_tags: string[];
  geo_region: string;
  discord_link?: string;
  image_url?: string;
  logo_url?: string;
  ip_address?: string;
  edition: ServerEdition;
  votes: number;
  is_featured: boolean;
  created_at?: string;
};

export type ServerSubmission = {
  id: string;
  email: string;
  name: string;
  description: string;
  ip_address: string;
  discord_link?: string;
  image_url?: string;
  logo_url?: string;
  edition: ServerEdition;
  geo_region: string;
  category_tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  wants_featured?: boolean;
  created_at: string;
};
