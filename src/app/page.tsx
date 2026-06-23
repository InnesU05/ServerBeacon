import ServerCard from '@/components/ServerCard';
import { getServers } from '@/lib/data';

export default async function Home() {
  const servers = await getServers();
  const featuredServers = servers.filter(s => s.is_featured);
  const standardServers = servers.filter(s => !s.is_featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
          The Curated Minecraft Server Directory
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Discover premium, high-uptime servers. Browse by category, location, or find your next adventure in our featured list.
        </p>
      </div>

      {featuredServers.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-featured uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-featured mr-3 block"></span>
              Featured Servers
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
            All Servers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardServers.map(server => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}
