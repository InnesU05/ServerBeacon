'use server';

import { supabase } from '@/lib/supabase';
import { ServerSubmission } from '@/lib/types';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers, cookies } from 'next/headers';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const ratelimit = redisUrl && redisToken
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
    })
  : null;

export async function submitServerAction(formData: FormData) {
  try {
    // Client Cookie check
    const cookieStore = await cookies();
    if (cookieStore.get('recent_submission')) {
      return { success: false, error: 'You have recently submitted a server. Please wait before submitting again.' };
    }

    if (ratelimit) {
      const headersList = await headers();
      const ip = (headersList.get('x-forwarded-for') || '127.0.0.1').split(',')[0].trim();
      const { success } = await ratelimit.limit(`submission_${ip}`);
      if (!success) {
        return { success: false, error: 'Rate limit exceeded. Please try again later.' };
      }
    }

    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const ip_address = formData.get('ip_address') as string;
    const description = formData.get('description') as string;
    const discord_link = formData.get('discord_link') as string;
    const image_url = formData.get('image_url') as string;
    const logo_url = formData.get('logo_url') as string;
    const edition = formData.get('edition') as string;
    const geo_region = formData.get('geo_region') as string;
    
    // Parse tags safely
    let category_tags: string[] = [];
    try {
      const tagsString = formData.get('category_tags') as string;
      category_tags = tagsString ? JSON.parse(tagsString) : [];
    } catch (e) {
      category_tags = ['survival'];
    }

    if (!email || !name || !ip_address || !description) {
      return { success: false, error: 'Missing required fields.' };
    }

    const submission: Omit<ServerSubmission, 'id' | 'created_at'> = {
      email,
      name,
      ip_address,
      description,
      discord_link: discord_link || undefined,
      image_url: image_url || undefined,
      logo_url: logo_url || undefined,
      edition: edition as any || 'java',
      geo_region: geo_region || 'us',
      category_tags,
      status: 'pending'
    };

    const { error } = await supabase
      .from('server_submissions')
      .insert([submission]);

    if (error) {
      console.error('Database insertion error:', error);
      return { success: false, error: 'Failed to submit application. Please try again.' };
    }

    cookieStore.set('recent_submission', 'true', { maxAge: 60 * 60 }); // 1 hour lockout

    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
