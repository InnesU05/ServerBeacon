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
  const rawIconUrl = server.logo_url || (server.ip_address ? `https://api.mcsrvstat.us/icon/${server.ip_address}` : null);
  const iconUrl = rawIconUrl ? `/api/proxy-image?url=${encodeURIComponent(rawIconUrl)}` : null;

  return (
    <div className={`relative bg-card border border-gray-800 flex flex-col transition-all duration-200 hover:border-gray-500 group h-full ${server.is_featured ? 'border-featured hover:border-featured/80' : ''}`}>
      
      {/* Invisible SEO Link covering the whole card */}
      <Link href={`/server/${server.slug}`} className="absolute inset-0 z-0" aria-label={`View details for ${server.name}`}></Link>
      
      {/* Header / Preview Section */}
      <div className="flex flex-row items-stretch p-3 sm:p-5 gap-3 sm:gap-5 flex-grow relative z-10 pointer-events-none h-full">
        
        {/* Logo */}
        <div className="flex items-start sm:items-center shrink-0">
          {iconUrl ? (
            <img src={iconUrl} alt={`${server.name} logo`} className="w-14 h-14 sm:w-20 sm:h-20 object-cover border border-gray-800 bg-charcoal" />
          ) : (
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-charcoal border border-gray-800 flex items-center justify-center">
              <span className="text-gray-500 font-bold text-lg sm:text-xl">{server.name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col justify-center flex-grow min-w-0 py-1">
          <h3 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-2 group-hover:text-primary transition-colors duration-200 leading-tight mb-1 sm:mb-2">
            <span className="truncate">{server.name}</span>
            {server.is_featured && (
              <span className="bg-featured text-black text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 uppercase tracking-wider shrink-0 rounded-sm">
                Featured
              </span>
            )}
          </h3>
          
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-3">{server.description}</p>
          
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-auto">
            {server.ip_address && (
              <LiveServerBadge ip={server.ip_address} edition={server.edition} />
            )}
            <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider border border-gray-800 px-1.5 py-0.5 shrink-0 bg-charcoal">
              {server.edition}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider border border-gray-800 px-1.5 py-0.5 shrink-0 bg-charcoal hidden sm:inline-block">
              {server.geo_region}
            </span>
          </div>
        </div>

        {/* Voting Section (Z-10, Pointer events enabled so it intercepts clicks) */}
        <div className="flex flex-col items-center justify-center w-10 sm:w-16 bg-charcoal border border-gray-800 shrink-0 pointer-events-auto ml-1 sm:ml-2">
          <button 
            onClick={(e) => handleVote(e, 'upvote')}
            className="text-gray-400 hover:text-primary transition-colors p-2 w-full flex justify-center"
            title="Upvote"
          >
            <span className="text-sm sm:text-base leading-none">▲</span>
          </button>
          <span className="font-black text-white text-sm sm:text-lg my-1 text-center w-full">
            {localVotes}
          </span>
          <button 
            onClick={(e) => handleVote(e, 'downvote')}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 w-full flex justify-center"
            title="Downvote"
          >
            <span className="text-sm sm:text-base leading-none">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
}
