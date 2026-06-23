import { Metadata } from 'next';
import { getServersByLocation } from '@/lib/data';
import ServerCard from '@/components/ServerCard';

export async function generateMetadata({ params }: { params: Promise<{ geo: string }> }): Promise<Metadata> {
  const { geo } = await params;
  const formattedGeo = geo.toUpperCase();
  return {
    title: `Best Minecraft Servers in ${formattedGeo} (2026) | ServerBeacon`,
    description: `Find top-rated Minecraft servers hosted in ${formattedGeo}. Low latency, great communities, and curated for quality.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ geo: string }> }) {
  const { geo } = await params;
  const formattedGeo = geo.toUpperCase();
  const servers = await getServersByLocation(geo);
  
  const featuredServers = servers.filter(s => s.is_featured);
  const standardServers = servers.filter(s => !s.is_featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 border-b border-gray-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
          Servers in {formattedGeo}
        </h1>
        <p className="text-xl text-gray-400">
          Find top-rated Minecraft servers hosted in {formattedGeo}. Low latency, great communities, and curated for quality.
        </p>
      </div>

      {featuredServers.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-featured uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-featured mr-3 block"></span>
              Featured in {formattedGeo}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center">
            <span className="w-3 h-3 bg-gray-600 mr-3 block"></span>
            All {formattedGeo} Servers
          </h2>
        </div>
        
        {standardServers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardServers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-gray-800 p-12 text-center">
            <p className="text-gray-400">No standard servers found in this location yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
