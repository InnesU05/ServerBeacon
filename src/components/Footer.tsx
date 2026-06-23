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
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The premier curated directory for Minecraft servers.
              Optimised for discovery, built for community.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              For business enquiries, message <a href="https://tiktok.com/@aegon205" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@aegon205</a> on TikTok.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ServerBeacon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
