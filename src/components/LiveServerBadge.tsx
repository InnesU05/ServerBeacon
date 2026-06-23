'use client';

import { useEffect, useState } from 'react';

type ServerStatus = {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  motd?: {
    clean: string[];
  };
};

export default function LiveServerBadge({ ip, edition }: { ip: string, edition: 'java' | 'bedrock' | 'crossplay' }) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ip) {
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        const endpoint = edition === 'bedrock' 
          ? `https://api.mcsrvstat.us/bedrock/2/${ip}` 
          : `https://api.mcsrvstat.us/2/${ip}`;
          
        const res = await fetch(endpoint);
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Failed to fetch server status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [ip, edition]);

  if (loading) {
    return <span className="text-gray-500 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5 animate-pulse shrink-0">Pinging...</span>;
  }

  if (!status || !status.online) {
    return <span className="text-red-500 text-xs font-bold uppercase tracking-wider border border-red-500/30 bg-red-500/10 px-2 py-0.5 shrink-0">Offline</span>;
  }

  return (
    <span className="text-primary text-xs font-bold uppercase tracking-wider border border-primary/30 bg-primary/10 px-2 py-0.5 shrink-0 flex items-center gap-1">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      {status.players?.online || 0} / {status.players?.max || 0} Online
    </span>
  );
}
