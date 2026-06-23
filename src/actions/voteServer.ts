'use server';

import { supabase } from '@/lib/supabase';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers, cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Support both Upstash integration and Vercel KV
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const ratelimit = redisUrl && redisToken
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(1, '24 h'),
      analytics: true,
    })
  : null;

export async function voteServerAction(serverId: string, type: 'upvote' | 'downvote') {
  try {
    // 1. Client Cookie check (fast, stops 99% of casual spam)
    const cookieStore = await cookies();
    const cookieName = `voted_${serverId}`;
    if (cookieStore.get(cookieName)) {
      return { success: false, error: 'You have already voted for this server today.' };
    }

    // 2. Upstash Redis IP check (stops advanced spam)
    if (ratelimit) {
      const headersList = await headers();
      const forwardedFor = headersList.get('x-forwarded-for') || '127.0.0.1';
      // Handle comma-separated IPs from proxies
      const ip = forwardedFor.split(',')[0].trim();
      
      const { success } = await ratelimit.limit(`vote_${serverId}_${ip}`);
      if (!success) {
        return { 
          success: false, 
          error: 'You have already voted for this server today.' 
        };
      }
    }

    // Call Supabase RPC to increment or decrement votes
    const rpcName = type === 'upvote' ? 'increment_votes' : 'decrement_votes';
    
    const { error } = await supabase.rpc(rpcName, { server_id: serverId });

    if (error) {
      console.error('Database voting error:', error);
      return { success: false, error: 'Failed to record vote. Please try again.' };
    }

    // Set a 24-hour cookie to prevent further voting
    cookieStore.set(cookieName, 'true', { maxAge: 60 * 60 * 24 });

    revalidatePath('/');
    return { success: true };

  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
