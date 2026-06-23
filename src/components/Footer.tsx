import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-charcoal py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase block mb-4">
              Server<span className="text-primary">Beacon</span>
            </span>
            <p className="text-gray-400 text-sm">
              The premier curated directory for Minecraft servers.
              Optimised for discovery, built for community.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/survival" className="text-gray-400 hover:text-white text-sm">Survival</Link></li>
              <li><Link href="/category/skyblock" className="text-gray-400 hover:text-white text-sm">Skyblock</Link></li>
              <li><Link href="/category/minigames" className="text-gray-400 hover:text-white text-sm">Minigames</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Locations</h3>
            <ul className="space-y-2">
              <li><Link href="/location/us" className="text-gray-400 hover:text-white text-sm">United States</Link></li>
              <li><Link href="/location/eu" className="text-gray-400 hover:text-white text-sm">Europe</Link></li>
              <li><Link href="/location/au" className="text-gray-400 hover:text-white text-sm">Australia</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ServerBeacon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
