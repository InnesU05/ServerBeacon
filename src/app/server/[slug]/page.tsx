import { Metadata } from 'next';
import { getServerBySlug } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    description: `${server.description.substring(0, 150)}... Join ${server.name} today! View Discord details, location, and category information.`,
  };
}

export default async function ServerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = await getServerBySlug(slug);

  if (!server) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-card border border-gray-800 p-8 md:p-12 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8 border-b border-gray-800 pb-8">
          {server.image_url ? (
            <img src={server.image_url} alt={`${server.name} logo`} className="w-32 h-32 object-cover border border-gray-800 flex-shrink-0" />
          ) : (
            <div className="w-32 h-32 bg-charcoal border border-gray-800 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-500 font-bold text-4xl">{server.name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <h1 className="text-4xl font-bold text-white uppercase tracking-tight">{server.name}</h1>
              {server.is_featured && (
                <span className="bg-featured text-black text-xs font-bold px-3 py-1 uppercase tracking-wider ml-4">
                  Featured
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Link href={`/location/${server.geo_region}`} className="text-gray-400 hover:text-white text-sm uppercase tracking-wider border border-gray-800 px-3 py-1 hover:border-gray-600 transition-none">
                {server.geo_region.toUpperCase()}
              </Link>
              {server.category_tags.map(tag => (
                <Link key={tag} href={`/category/${tag}`} className="text-gray-400 hover:text-white text-sm uppercase tracking-wider border border-gray-800 px-3 py-1 hover:border-gray-600 transition-none">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
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
          <div className="flex-1 bg-charcoal text-white text-center font-bold text-lg py-4 border border-gray-800 hover:border-white transition-none cursor-pointer flex items-center justify-center">
            COPY IP: PLAY.{server.slug.toUpperCase()}.NET
          </div>
        </div>
      </div>
    </div>
  );
}
