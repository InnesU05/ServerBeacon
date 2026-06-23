'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Server } from '@/lib/types';
import { voteServerAction } from '@/actions/voteServer';
import LiveServerBadge from './LiveServerBadge';

export default function ServerCard({ server }: { server: Server }) {
  const [voteStatus, setVoteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [localVotes, setLocalVotes] = useState(server.votes);

  const handleVote = async (e: React.MouseEvent, type: 'upvote' | 'downvote') => {
    e.preventDefault();
    e.stopPropagation();
    if (voteStatus === 'loading') return;
    
    setVoteStatus('loading');
    
    const result = await voteServerAction(server.id, type);
    
    if (result.success) {
      setVoteStatus('success');
      setLocalVotes(prev => type === 'upvote' ? prev + 1 : prev - 1);
    } else {
      setVoteStatus('error');
      alert(result.error || 'Failed to vote');
    }
  };

  // The card should only display the square icon, never the wide promotional banner.
  const iconUrl = server.ip_address ? `https://api.mcsrvstat.us/icon/${server.ip_address}` : null;

  return (
    <div className={`relative bg-card border border-gray-800 flex flex-col transition-all duration-200 hover:border-gray-500 group h-full ${server.is_featured ? 'border-featured hover:border-featured/80' : ''}`}>
      
      {/* Invisible SEO Link covering the whole card */}
      <Link href={`/server/${server.slug}`} className="absolute inset-0 z-0" aria-label={`View details for ${server.name}`}></Link>
      
      {/* Header / Preview Section */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-grow relative z-10 pointer-events-none">
        
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {iconUrl ? (
            <img src={iconUrl} alt={`${server.name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-gray-800 shrink-0 bg-charcoal" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-charcoal border border-gray-800 flex items-center justify-center shrink-0">
              <span className="text-gray-500 font-bold text-xl">{server.name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          
          <div className="flex-grow min-w-0">
            <h3 className="text-xl font-bold text-white flex flex-wrap items-center gap-2 group-hover:text-primary transition-colors duration-200">
              <span className="truncate">{server.name}</span>
              {server.is_featured && (
                <span className="bg-featured text-black text-xs font-bold px-2 py-1 uppercase tracking-wider shrink-0">
                  Featured
                </span>
              )}
            </h3>
            
            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{server.description}</p>
            
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {server.ip_address && (
                <LiveServerBadge ip={server.ip_address} edition={server.edition} />
              )}
              <span className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5 shrink-0 bg-charcoal">
                {server.edition}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5 shrink-0 bg-charcoal">
                {server.geo_region}
              </span>
            </div>
          </div>
        </div>

        {/* Voting Section (Z-10, Pointer events enabled so it intercepts clicks) */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto bg-charcoal border border-gray-800 p-2 sm:p-3 shrink-0 pointer-events-auto">
          <button 
            onClick={(e) => handleVote(e, 'upvote')}
            className="text-gray-400 hover:text-primary transition-colors p-1"
            title="Upvote"
          >
            ▲
          </button>
          <span className="font-black text-white text-lg sm:text-xl my-0 sm:my-1 px-4 sm:px-0">
            {localVotes}
          </span>
          <button 
            onClick={(e) => handleVote(e, 'downvote')}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Downvote"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
