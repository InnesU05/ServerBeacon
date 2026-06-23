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
};
