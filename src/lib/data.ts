import { Server } from '@/components/ServerCard';
import { supabase } from './supabase';

export async function getServers(): Promise<Server[]> {
  const { data, error } = await supabase.from('servers').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching servers:', error);
    return [];
  }
  return data as Server[];
}

export async function getServerBySlug(slug: string): Promise<Server | null> {
  const { data, error } = await supabase.from('servers').select('*').eq('slug', slug).single();
  if (error) {
    console.error(`Error fetching server ${slug}:`, error);
    return null;
  }
  return data as Server;
}

export async function getServersByCategory(category: string): Promise<Server[]> {
  const { data, error } = await supabase.from('servers').select('*').contains('category_tags', [category]).order('created_at', { ascending: false });
  if (error) {
    console.error(`Error fetching servers for category ${category}:`, error);
    return [];
  }
  return data as Server[];
}

export async function getServersByLocation(location: string): Promise<Server[]> {
  const { data, error } = await supabase.from('servers').select('*').eq('geo_region', location).order('created_at', { ascending: false });
  if (error) {
    console.error(`Error fetching servers for location ${location}:`, error);
    return [];
  }
  return data as Server[];
}
