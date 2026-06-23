import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | ServerBeacon',
  description: 'Terms of Service and liability waivers for ServerBeacon.',
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors font-bold uppercase tracking-wider text-sm">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Directory
      </Link>
      <div className="bg-card border border-gray-800 p-8 md:p-12 mb-8 prose prose-invert max-w-none">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-8 border-b border-gray-800 pb-4">
          Terms of Service
        </h1>
        
        <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using ServerBeacon (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4 font-bold text-red-400">
            IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE OUR SERVICE.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">2. Description of Service</h2>
          <p className="text-gray-300 leading-relaxed">
            ServerBeacon is an independent, community-driven directory that lists third-party Minecraft servers. We do not host, operate, own, or manage any of the Minecraft servers listed on our website.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            ServerBeacon is not affiliated with, endorsed by, or associated with Mojang AB or Microsoft Corporation. "Minecraft" is a trademark of Mojang Synergies AB.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">3. Absolute Limitation of Liability (Waiver)</h2>
          <p className="text-gray-300 leading-relaxed">
            <strong>YOU EXPRESSLY UNDERSTAND AND AGREE THAT:</strong>
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-300">
            <li>We have absolutely zero control over the content, moderation, safety, user base, or functionality of the third-party Minecraft servers listed on our website.</li>
            <li>Joining any server listed on ServerBeacon is done entirely at your own risk.</li>
            <li>We shall not be liable for any damages, losses, bans, stolen accounts, malicious software, or inappropriate content you may encounter on third-party servers.</li>
            <li>We do not verify the security or legitimacy of any server IP address submitted to our directory.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">4. User Submissions & Moderation</h2>
          <p className="text-gray-300 leading-relaxed">
            Users may submit servers to be listed on ServerBeacon. By submitting a server, you warrant that you have the right to share its details publicly.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            We reserve the absolute right, at our sole discretion, to modify, reject, or remove any server listing at any time, for any reason, without notice or explanation. We reserve the right to reset, modify, or delete votes if we suspect botting, manipulation, or fraud.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">5. "As Is" Warranty Disclaimer</h2>
          <p className="text-gray-300 leading-relaxed uppercase text-sm">
            The service is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">6. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">
            If you need to report a server for illegal activity, request a removal, or have business enquiries, you may contact us at:
          </p>
          <ul className="list-none mt-4 space-y-2 text-gray-300">
            <li><strong>Email:</strong> <a href="mailto:innes.urquhart4@gmail.com" className="text-primary hover:underline">innes.urquhart4@gmail.com</a></li>
            <li><strong>TikTok:</strong> <a href="https://tiktok.com/@aegon205" className="text-primary hover:underline">@aegon205</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
