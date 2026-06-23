import { Metadata } from 'next';
import { getServersByCategory } from '@/lib/data';
import ServerCard from '@/components/ServerCard';

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  return {
    title: `Top Minecraft ${formattedType} Servers in 2026 | ServerBeacon`,
    description: `Discover the best Minecraft ${formattedType} servers. Browse our curated directory of premium, high-uptime ${formattedType} servers and join the community.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  const servers = await getServersByCategory(type);
  
  const featuredServers = servers.filter(s => s.is_featured);
  const standardServers = servers.filter(s => !s.is_featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 border-b border-gray-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
          {formattedType} Servers
        </h1>
        <p className="text-xl text-gray-400">
          Discover the best Minecraft {formattedType} servers. Browse our curated directory of premium, high-uptime {formattedType} servers and join the community.
        </p>
      </div>

      {featuredServers.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-featured uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-featured mr-3 block"></span>
              Featured {formattedType} Servers
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
            All {formattedType} Servers
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
            <p className="text-gray-400">No standard {formattedType} servers found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
