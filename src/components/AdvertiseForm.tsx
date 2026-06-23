'use client';

import { useState } from 'react';
import { submitServerAction } from '@/actions/submitServer';

export default function AdvertiseForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    
    // We need to pass category_tags as a JSON string for the action
    const category = formData.get('category_tags_input') as string;
    if (category) {
      formData.set('category_tags', JSON.stringify([category]));
    } else {
      formData.set('category_tags', JSON.stringify([]));
    }
    
    const result = await submitServerAction(formData);

    if (!result.success) {
      console.error('Submission error:', result.error);
      setErrorMessage(result.error || 'An unexpected error occurred.');
      setStatus('error');
    } else {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-card border border-gray-800 p-5 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Submit Your Server</h2>
      
      {status === 'success' && (
        <div className="bg-primary/10 border border-primary text-primary p-4 mb-6 font-bold">
          Success! Your submission has been received and is pending approval.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6 font-bold">
          {errorMessage || 'An error occurred. Please try again later.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Server Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              required 
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="e.g. Hypixel"
            />
          </div>
          <div>
            <label htmlFor="ip_address" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Server IP *</label>
            <input 
              type="text" 
              id="ip_address" 
              name="ip_address"
              required 
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="play.example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Contact Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            required 
            className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
            placeholder="admin@example.com (For invoicing)"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Description *</label>
          <textarea 
            id="description" 
            name="description"
            required 
            rows={4}
            className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none resize-none"
            placeholder="Describe your server in detail..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="edition" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Edition *</label>
            <select 
              id="edition" 
              name="edition"
              required
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none appearance-none"
            >
              <option value="java">Java</option>
              <option value="bedrock">Bedrock</option>
              <option value="crossplay">Crossplay</option>
            </select>
          </div>
          <div>
            <label htmlFor="category_tags_input" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Primary Tag *</label>
            <select 
              id="category_tags_input" 
              name="category_tags_input"
              required
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none appearance-none"
            >
              <option value="">Select...</option>
              <option value="survival">Survival</option>
              <option value="skyblock">Skyblock</option>
              <option value="minigames">Minigames</option>
              <option value="factions">Factions</option>
              <option value="prison">Prison</option>
              <option value="creative">Creative</option>
              <option value="rpg">RPG</option>
            </select>
          </div>
          <div>
            <label htmlFor="geo_region" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Region *</label>
            <select 
              id="geo_region" 
              name="geo_region"
              required
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none appearance-none"
            >
              <option value="">Select...</option>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
              <option value="au">Australia</option>
              <option value="asia">Asia</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="discord_link" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Discord Invite Link</label>
          <input 
            type="url" 
            id="discord_link" 
            name="discord_link"
            className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
            placeholder="https://discord.gg/..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="image_url" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Promo Banner URL</label>
            <input 
              type="url" 
              id="image_url" 
              name="image_url"
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="Direct image link (1500x500)"
            />
          </div>
          <div>
            <label htmlFor="logo_url" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Custom Logo URL</label>
            <input 
              type="url" 
              id="logo_url" 
              name="logo_url"
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="Direct image link (Square)"
            />
          </div>
        </div>

        <div className="bg-charcoal/50 border border-yellow-500/20 p-4 rounded-md">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="flex items-center h-5 mt-1">
              <input 
                type="checkbox" 
                name="wants_featured" 
                className="w-5 h-5 accent-yellow-500 bg-charcoal border-gray-600 rounded cursor-pointer"
              />
            </div>
            <div className="text-sm">
              <span className="font-bold text-yellow-500 block text-base group-hover:text-yellow-400 transition-colors">
                Do you want to be added to featured servers? - £20/Week
              </span>
              <span className="text-gray-400 block mt-1">
                You can absolutely submit your server for free! However, featured servers are pinned to the top of the directory with a gold border, bringing in significantly more clicks and players. Check this box if you're interested and we'll email you with details.
              </span>
            </div>
          </label>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-primary text-black font-bold text-lg py-4 border border-primary hover:bg-transparent hover:text-primary transition-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT SERVER FOR REVIEW'}
          </button>
        </div>
      </form>
    </div>
  );
}
