import Link from 'next/link';

export type Server = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category_tags: string[];
  geo_region: string;
  discord_link?: string;
  image_url?: string;
  is_featured: boolean;
};

export default function ServerCard({ server }: { server: Server }) {
  return (
    <div className={`bg-card border border-gray-800 p-6 flex flex-col h-full ${server.is_featured ? 'border-featured' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          {server.image_url ? (
            <img src={server.image_url} alt={`${server.name} logo`} className="w-16 h-16 object-cover border border-gray-800" />
          ) : (
            <div className="w-16 h-16 bg-charcoal border border-gray-800 flex items-center justify-center">
              <span className="text-gray-500 font-bold">{server.name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Link href={`/server/${server.slug}`} className="hover:underline decoration-primary underline-offset-4">
                {server.name}
              </Link>
              {server.is_featured && (
                <span className="bg-featured text-black text-xs font-bold px-2 py-1 uppercase tracking-wider ml-2">
                  Featured
                </span>
              )}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5">
                {server.geo_region.toUpperCase()}
              </span>
              <div className="flex space-x-1">
                {server.category_tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-gray-400 text-xs uppercase tracking-wider border border-gray-800 px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm flex-grow mb-6">
        {server.description}
      </p>
      
      <div className="mt-auto flex space-x-3">
        <Link 
          href={`/server/${server.slug}`} 
          className="flex-1 bg-charcoal text-white text-center font-bold text-sm py-2 border border-gray-800 hover:border-white transition-none"
        >
          View Details
        </Link>
        {server.discord_link && (
          <a 
            href={server.discord_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary text-black text-center font-bold text-sm py-2 border border-primary hover:bg-transparent hover:text-primary transition-none"
          >
            Join Discord
          </a>
        )}
      </div>
    </div>
  );
}
