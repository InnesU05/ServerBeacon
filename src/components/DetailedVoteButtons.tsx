'use client';

import { useState } from 'react';
import { voteServerAction } from '@/actions/voteServer';

export default function DetailedVoteButtons({ serverId, initialVotes }: { serverId: string, initialVotes: number }) {
  const [voteStatus, setVoteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [localVotes, setLocalVotes] = useState(initialVotes);
  const [voteError, setVoteError] = useState('');

  const handleVote = async (type: 'upvote' | 'downvote') => {
    if (voteStatus === 'loading') return;
    
    setVoteStatus('loading');
    setVoteError('');
    
    const result = await voteServerAction(serverId, type);
    
    if (result.success) {
      setVoteStatus('success');
      setLocalVotes(prev => type === 'upvote' ? prev + 1 : prev - 1);
    } else {
      setVoteStatus('error');
      setVoteError(result.error || 'Failed to vote');
    }
  };

  return (
    <div className="flex flex-col items-center bg-charcoal border border-gray-800 p-4">
      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Live Votes</span>
      
      <div className="flex items-center space-x-6">
        <button 
          onClick={() => handleVote('upvote')}
          className="text-gray-400 hover:text-primary transition-colors text-2xl p-2 bg-gray-900 border border-gray-800 hover:border-primary"
          title="Upvote"
        >
          ▲
        </button>
        
        <span className="font-black text-white text-3xl">
          {localVotes}
        </span>
        
        <button 
          onClick={() => handleVote('downvote')}
          className="text-gray-400 hover:text-red-500 transition-colors text-2xl p-2 bg-gray-900 border border-gray-800 hover:border-red-500"
          title="Downvote"
        >
          ▼
        </button>
      </div>

      {voteError && (
        <div className="mt-4 text-red-500 text-xs font-bold uppercase tracking-wider text-center">
          {voteError}
        </div>
      )}
    </div>
  );
}
