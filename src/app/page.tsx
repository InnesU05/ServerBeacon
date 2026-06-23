import ServerCard from '@/components/ServerCard';
import { getServers, getServersByEdition } from '@/lib/data';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const editionParam = typeof params.edition === 'string' ? params.edition : undefined;
  
  // SEO optimization: Filter servers on the server before rendering
  const allServers = editionParam 
    ? await getServersByEdition(editionParam)
    : await getServers();

  const featuredServers = allServers.filter(s => s.is_featured);
  const standardServers = allServers.filter(s => !s.is_featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 sm:mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tight">
          The Curated Minecraft Server Directory
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
          Discover premium, high-uptime servers. Upvote your favourites, and copy IPs to start playing instantly.
        </p>
      </div>

      {featuredServers.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center mb-6 border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-featured uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-featured mr-3 block"></span>
              Featured Servers
            </h2>
          </div>
          
          {/* Horizontal Scroll Container for Featured */}
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar snap-x snap-mandatory gap-6">
            {featuredServers.map(server => (
              <div key={server.id} className="min-w-[85vw] sm:min-w-[400px] md:min-w-[500px] shrink-0 snap-center">
                <ServerCard server={server} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center mb-6 border-b border-gray-800 pb-4 justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider flex items-center">
            <span className="w-3 h-3 bg-gray-600 mr-3 block"></span>
            {editionParam ? `${editionParam.toUpperCase()} SERVERS` : 'ALL SERVERS'}
          </h2>
          <span className="text-gray-500 text-sm font-bold tracking-wider hidden sm:block">SORTED BY VOTES</span>
        </div>
        
        {/* Vertical List Container for All Servers */}
        <div className="flex flex-col gap-6">
          {standardServers.length > 0 ? (
            standardServers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))
          ) : (
            <div className="bg-charcoal border border-gray-800 p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
              No servers found for this edition yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
