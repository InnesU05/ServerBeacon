'use server';

import { supabase } from '@/lib/supabase';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Limit to 1 vote per server per IP per 24 hours
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(1, '24 h'),
      analytics: true,
    })
  : null;

export async function voteServerAction(serverId: string, type: 'upvote' | 'downvote') {
  try {
    if (ratelimit) {
      const headersList = await headers();
      const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
      
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

    revalidatePath('/');
    return { success: true };

  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
