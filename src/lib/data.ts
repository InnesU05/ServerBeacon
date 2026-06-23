import { Server } from './types';
import { supabase } from './supabase';

export async function getServers(): Promise<Server[]> {
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('votes', { ascending: false })
    .order('created_at', { ascending: false });
    
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

export async function getServersByEdition(edition: string): Promise<Server[]> {
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .in('edition', [edition, 'crossplay'])
    .order('is_featured', { ascending: false })
    .order('votes', { ascending: false })
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error(`Error fetching servers for edition ${edition}:`, error);
    return [];
  }
  return data as Server[];
}
