'use server';

import { supabase } from '@/lib/supabase';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

// Create a new ratelimiter, that allows 3 requests per 1 hour
// Fallback to a dummy object if environment variables are not set during build time
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
    })
  : null;

export async function submitServerAction(formData: FormData) {
  try {
    // 1. Rate Limiting Check
    if (ratelimit) {
      const headersList = await headers();
      const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
      
      const { success } = await ratelimit.limit(`ratelimit_submission_${ip}`);
      if (!success) {
        return { 
          success: false, 
          error: 'You have exceeded the maximum number of submissions. Please try again later.' 
        };
      }
    }

    // 2. Data Parsing
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      location: formData.get('location') as string,
      discord_link: formData.get('discord') as string,
      image_url: formData.get('image') as string,
    };

    // Basic validation
    if (!data.name || !data.email || !data.description || !data.category || !data.location) {
      return { success: false, error: 'Missing required fields.' };
    }

    // 3. Database Insertion
    const { error } = await supabase.from('submissions').insert([data]);

    if (error) {
      console.error('Database insertion error:', error);
      return { success: false, error: 'Failed to submit to database. Please try again.' };
    }

    return { success: true };

  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
