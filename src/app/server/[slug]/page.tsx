import { Metadata } from 'next';
import { getServerBySlug } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LiveServerBadge from '@/components/LiveServerBadge';
import DetailedVoteButtons from '@/components/DetailedVoteButtons';

async function fetchServerLiveStats(ip: string, edition: string) {
  try {
    const endpoint = edition === 'bedrock' 
      ? `https://api.mcsrvstat.us/bedrock/2/${ip}` 
      : `https://api.mcsrvstat.us/2/${ip}`;
    
    // Cache the API response for 60 seconds
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const server = await getServerBySlug(slug);
  
  if (!server) {
    return {
      title: 'Server Not Found | ServerBeacon',
    };
  }

  return {
    title: `${server.name} - Minecraft Server | ServerBeacon`,
    description: `${server.description.substring(0, 150)}... Join ${server.name} today! View Discord details, IP, and voting information.`,
  };
}

export default async function ServerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = await getServerBySlug(slug);

  if (!server) {
    notFound();
  }

  // Fetch live stats (MOTD, Players) if we have an IP
  const liveStats = server.ip_address ? await fetchServerLiveStats(server.ip_address, server.edition) : null;
  
  // The square icon from the API or custom logo
  const rawSquareIconUrl = server.logo_url || (server.ip_address ? `https://api.mcsrvstat.us/icon/${server.ip_address}` : null);
  
  // Route external images through our proxy to bypass strict hotlink protections (e.g. Twitter/Cloudflare)
  const bannerUrl = server.image_url ? `/api/proxy-image?url=${encodeURIComponent(server.image_url)}` : null;
  const squareIconUrl = rawSquareIconUrl ? `/api/proxy-image?url=${encodeURIComponent(rawSquareIconUrl)}` : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-xs group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Directory
      </Link>

      <div className="bg-card border border-gray-800 mb-8 overflow-hidden">
        
        {/* Promotional Banner (if provided in database) */}
        {bannerUrl && (
          <div className="w-full h-48 sm:h-64 md:h-80 relative border-b border-gray-800 bg-charcoal">
            <img 
              src={bannerUrl} 
              alt={`${server.name} promotional banner`} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 border-b border-gray-800 pb-8 text-center md:text-left">
            {/* Square Logo */}
            {squareIconUrl ? (
              <img src={squareIconUrl} alt={`${server.name} icon`} className="w-24 h-24 sm:w-32 sm:h-32 object-cover border border-gray-800 flex-shrink-0 bg-charcoal" />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-charcoal border border-gray-800 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 font-bold text-4xl">{server.name.substring(0, 2).toUpperCase()}</span>
              </div>
            )}
            
            <div className="flex-grow flex flex-col items-center md:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">{server.name}</h1>
                {server.is_featured && (
                  <span className="bg-featured text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 mt-4">
                {server.ip_address && (
                  <LiveServerBadge ip={server.ip_address} edition={server.edition} />
                )}
                <span className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-wider border border-gray-800 px-2 sm:px-3 py-1 bg-charcoal">
                  {server.edition}
                </span>
                <span className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-wider border border-gray-800 px-2 sm:px-3 py-1 bg-charcoal">
                  {server.geo_region.toUpperCase()}
                </span>
                {server.category_tags.map(tag => (
                  <span key={tag} className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider border border-gray-800 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex-shrink-0 w-full sm:w-auto mt-4 md:mt-0 flex justify-center">
              <DetailedVoteButtons serverId={server.id} initialVotes={server.votes} />
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            {/* Live MOTD Section */}
            {liveStats?.motd?.clean && liveStats.motd.clean.length > 0 && (
              <div className="bg-charcoal border border-gray-800 p-4 sm:p-6 mb-8">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Live Server Broadcast (MOTD)</h3>
                <div className="font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap">
                  {liveStats.motd.clean.join('\n')}
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">About the Server</h2>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">{server.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-800 pt-8">
            {server.discord_link && (
              <a 
                href={server.discord_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-black text-center font-bold text-lg py-4 border border-primary hover:bg-transparent hover:text-primary transition-none"
              >
                JOIN DISCORD
              </a>
            )}
            {server.ip_address ? (
              <div className="flex-1 bg-charcoal text-white text-center font-bold text-lg py-4 border border-gray-600 hover:border-white transition-none flex items-center justify-center">
                IP: {server.ip_address}
              </div>
            ) : (
              <div className="flex-1 bg-charcoal text-gray-500 text-center font-bold text-lg py-4 border border-gray-800 flex items-center justify-center">
                IP NOT PROVIDED
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
