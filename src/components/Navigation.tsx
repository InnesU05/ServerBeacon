import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="border-b border-gray-800 bg-charcoal sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-black text-white tracking-tighter uppercase">
                Server<span className="text-primary">Beacon</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold uppercase tracking-wider">
              Directory
            </Link>
            <Link 
              href="/advertise" 
              className="bg-primary text-black font-bold px-4 py-2 text-sm border border-primary hover:bg-transparent hover:text-primary transition-none uppercase tracking-wider"
            >
              Advertise
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
