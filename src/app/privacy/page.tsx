import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | ServerBeacon',
  description: 'Privacy Policy and data collection practices for ServerBeacon.',
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        
        <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to ServerBeacon ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            By using ServerBeacon, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">2. The Data We Collect</h2>
          <p className="text-gray-300 leading-relaxed">
            We may collect, use, store and transfer different kinds of data about you, which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, including the servers you view and vote for.</li>
            <li><strong>Submission Data:</strong> If you submit a server to our directory, we collect the server IP, description, and any provided contact links. This information is published publicly.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">3. Why We Collect IP Addresses</h2>
          <p className="text-gray-300 leading-relaxed">
            <strong>Fraud & Spam Prevention:</strong> Our platform features a public voting system. To ensure the integrity of this system and prevent automated bot spam, we temporarily log and hash user IP addresses when a vote is cast. This data is processed securely (via our infrastructure partner, Upstash Redis) strictly for rate-limiting purposes (e.g., ensuring 1 vote per IP per 24 hours). We do not use this data for marketing, tracking, or profiling.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">4. Third-Party Links & APIs</h2>
          <p className="text-gray-300 leading-relaxed">
            Our website acts as a directory for third-party Minecraft servers. Clicking on these links or copying their IP addresses to join them will direct you to third-party environments that we do not control. 
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Furthermore, we utilise public APIs (such as <code>mcsrvstat.us</code>) to fetch live server statuses. These third-party services may have their own privacy policies. We do not accept any responsibility or liability for their policies or the safety of the servers listed on our site.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">5. Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">6. Children's Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            Our service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-4">7. Contact Details</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <ul className="list-none mt-4 space-y-2 text-gray-300">
            <li><strong>Email:</strong> <a href="mailto:innes.urquhart4@gmail.com" className="text-primary hover:underline">innes.urquhart4@gmail.com</a></li>
            <li><strong>Business Enquiries:</strong> TikTok <a href="https://tiktok.com/@aegon205" className="text-primary hover:underline">@aegon205</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
