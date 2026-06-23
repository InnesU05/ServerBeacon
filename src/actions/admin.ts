'use server';

import { supabase } from '@/lib/supabase';
import { Server, ServerSubmission } from '@/lib/types';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Simple Auth Check
export async function authenticateAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { success: false, error: 'ADMIN_PASSWORD environment variable is not set.' };
  }
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  
  return { success: false, error: 'Invalid password.' };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_auth')?.value === 'true';
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  return { success: true };
}

// Submissions Management
export async function approveSubmission(submissionId: string) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };

  // 1. Fetch submission
  const { data: sub, error: fetchError } = await supabase
    .from('server_submissions')
    .select('*')
    .eq('id', submissionId)
    .single();

  if (fetchError || !sub) return { success: false, error: 'Submission not found' };

  // 2. Generate slug from name
  const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // 3. Create Server entry
  const newServer = {
    slug,
    name: sub.name,
    description: sub.description,
    category_tags: sub.category_tags,
    geo_region: sub.geo_region,
    discord_link: sub.discord_link,
    image_url: sub.image_url,
    logo_url: sub.logo_url,
    ip_address: sub.ip_address,
    edition: sub.edition,
    votes: 0,
    is_featured: false
  };

  const { error: insertError } = await supabase.from('servers').insert([newServer]);
  if (insertError) {
    // Note: if slug exists, this might fail. In a real app we'd append a number.
    return { success: false, error: 'Failed to create server. A server with this name may already exist.' };
  }

  // 4. Mark submission as approved
  await supabase.from('server_submissions').update({ status: 'approved' }).eq('id', submissionId);

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function rejectSubmission(submissionId: string) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };
  
  const { error } = await supabase.from('server_submissions').update({ status: 'rejected' }).eq('id', submissionId);
  if (error) return { success: false, error: 'Failed to reject submission' };
  
  revalidatePath('/admin');
  return { success: true };
}

// Active Server Management
export async function toggleFeatured(formData: FormData) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };
  
  const serverId = formData.get('id') as string;
  const currentState = formData.get('currentState') === 'true';

  const { error } = await supabase.from('servers').update({ is_featured: !currentState }).eq('id', serverId);
  if (error) return { success: false, error: 'Failed to toggle featured status' };
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteServer(formData: FormData) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };
  
  const serverId = formData.get('id') as string;

  const { error } = await supabase.from('servers').delete().eq('id', serverId);
  if (error) return { success: false, error: 'Failed to delete server' };
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateServer(formData: FormData) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };

  const serverId = formData.get('id') as string;
  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  let category_tags: string[] = [];
  try {
    const tagsString = formData.get('category_tags_input') as string;
    category_tags = tagsString ? [tagsString] : ['survival'];
  } catch (e) {
    category_tags = ['survival'];
  }

  const updatedServer = {
    slug,
    name,
    description: formData.get('description') as string,
    ip_address: formData.get('ip_address') as string,
    discord_link: (formData.get('discord_link') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    logo_url: (formData.get('logo_url') as string) || null,
    edition: formData.get('edition') as string,
    geo_region: formData.get('geo_region') as string,
    category_tags,
  };

  const { error } = await supabase.from('servers').update(updatedServer).eq('id', serverId);
  if (error) return { success: false, error: 'Failed to update server' };

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// Manual Add Server
export async function manualAddServer(formData: FormData) {
  if (!(await checkAdminAuth())) return { success: false, error: 'Unauthorized' };

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  let category_tags: string[] = [];
  try {
    const tagsString = formData.get('category_tags_input') as string;
    category_tags = tagsString ? [tagsString] : ['survival'];
  } catch (e) {
    category_tags = ['survival'];
  }

  const newServer = {
    slug,
    name,
    description: formData.get('description') as string,
    ip_address: formData.get('ip_address') as string,
    discord_link: (formData.get('discord_link') as string) || undefined,
    image_url: (formData.get('image_url') as string) || undefined,
    logo_url: (formData.get('logo_url') as string) || undefined,
    edition: formData.get('edition') as string,
    geo_region: formData.get('geo_region') as string,
    category_tags,
    votes: 0,
    is_featured: formData.get('is_featured') === 'true'
  };

  const { error } = await supabase.from('servers').insert([newServer]);
  if (error) return { success: false, error: 'Failed to add server' };

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
