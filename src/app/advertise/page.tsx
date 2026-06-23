import type { Metadata } from 'next';
import AdvertiseForm from '@/components/AdvertiseForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise Your Minecraft Server | ServerBeacon',
  description: 'Submit your Minecraft server to ServerBeacon. Reach thousands of players looking for their next favourite server.',
};

export default function AdvertisePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-xs group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Directory
      </Link>
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-tight">Advertise</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Get your server in front of thousands of active Minecraft players. 
          Featured slots guarantee top placement across the directory.
        </p>
      </div>
      
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-card border border-gray-800 p-8 text-center flex flex-col h-full">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Standard Listing</h3>
          <p className="text-4xl font-bold text-primary mb-6">Free</p>
          <ul className="text-gray-400 text-left space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <span className="text-primary mr-2">■</span> Included in standard directory
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">■</span> Searchable by category & location
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">■</span> Dedicated server page
            </li>
          </ul>
        </div>
        <div className="bg-card border border-featured p-8 text-center flex flex-col h-full relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-featured text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">Recommended</div>
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 mt-4">Featured Slot</h3>
          <p className="text-4xl font-bold text-featured mb-6">£20<span className="text-lg text-gray-500 font-normal">/week</span></p>
          <ul className="text-gray-400 text-left space-y-3 flex-grow">
            <li className="flex items-center">
              <span className="text-featured mr-2">■</span> Everything in Free
            </li>
            <li className="flex items-center">
              <span className="text-featured mr-2">■</span> Pinned to top of Homepage
            </li>
            <li className="flex items-center">
              <span className="text-featured mr-2">■</span> Pinned in Category pages
            </li>
            <li className="flex items-center">
              <span className="text-featured mr-2">■</span> Highlighted styling
            </li>
          </ul>
        </div>
      </div>

      <AdvertiseForm />
    </div>
  );
}
