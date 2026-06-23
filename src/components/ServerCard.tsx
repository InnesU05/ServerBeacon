'use client';

import { useState } from 'react';
import { Server } from '@/lib/types';
import { voteServerAction } from '@/actions/voteServer';

export default function ServerCard({ server }: { server: Server }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [voteError, setVoteError] = useState('');
  const [localVotes, setLocalVotes] = useState(server.votes);
  const [copiedIp, setCopiedIp] = useState(false);

  const handleVote = async (e: React.MouseEvent, type: 'upvote' | 'downvote') => {
    e.stopPropagation();
    if (voteStatus === 'loading') return;
    
    setVoteStatus('loading');
    setVoteError('');
    
    const result = await voteServerAction(server.id, type);
    
    if (result.success) {
      setVoteStatus('success');
      setLocalVotes(prev => type === 'upvote' ? prev + 1 : prev - 1);
    } else {
      setVoteStatus('error');
      setVoteError(result.error || 'Failed to vote');
    }
  };

  const handleCopyIp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (server.ip_address) {
      navigator.clipboard.writeText(server.ip_address);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    }
  };

  return (
    <div 
      className={`bg-card border border-gray-800 flex flex-col transition-all duration-200 cursor-pointer hover:border-gray-600 ${server.is_featured ? 'border-featured' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header / Preview Section */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {server.image_url ? (
            <img src={server.image_url} alt={`${server.name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-gray-800 shrink-0" />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-charcoal border border-gray-800 flex items-center justify-center shrink-0">
              <span className="text-gray-500 font-bold text-xl">{server.name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          <div className="flex-grow min-w-0">
            <h3 className="text-xl font-bold text-white flex flex-wrap items-center gap-2">
              <span className="truncate">{server.name}</span>
              {server.is_featured && (
                <span className="bg-featured text-black text-xs font-bold px-2 py-1 uppercase tracking-wider shrink-0">
                  Featured
                </span>
              )}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5 shrink-0">
                {server.edition}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5 shrink-0">
                {server.geo_region}
              </span>
              <div className="hidden sm:flex space-x-1 shrink-0">
                {server.category_tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Voting Section (Always Visible) */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto bg-charcoal border border-gray-800 p-2 sm:p-3 shrink-0">
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

      {/* Expanded Section */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t border-gray-800 bg-charcoal/50" onClick={e => e.stopPropagation()}>
          {voteError && (
            <div className="text-red-500 text-sm font-bold mb-4 border border-red-500/30 bg-red-500/10 p-2">
              {voteError}
            </div>
          )}
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {server.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            {server.ip_address ? (
              <button 
                onClick={handleCopyIp}
                className="flex-1 bg-charcoal text-white text-center font-bold text-sm py-3 border border-gray-600 hover:border-white transition-none flex items-center justify-center"
              >
                {copiedIp ? 'COPIED TO CLIPBOARD!' : `COPY IP: ${server.ip_address}`}
              </button>
            ) : (
              <div className="flex-1 bg-charcoal text-gray-500 text-center font-bold text-sm py-3 border border-gray-800 flex items-center justify-center">
                IP NOT PROVIDED
              </div>
            )}
            
            {server.discord_link && (
              <a 
                href={server.discord_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex-1 bg-primary text-black text-center font-bold text-sm py-3 border border-primary hover:bg-transparent hover:text-primary transition-none flex items-center justify-center"
              >
                JOIN DISCORD
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
