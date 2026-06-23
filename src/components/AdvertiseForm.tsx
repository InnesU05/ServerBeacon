'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdvertiseForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      location: formData.get('location') as string,
      discord_link: formData.get('discord') as string,
      image_url: formData.get('image') as string,
    };

    const { error } = await supabase.from('submissions').insert([data]);

    if (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } else {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-card border border-gray-800 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Submit Your Server</h2>
      
      {status === 'success' && (
        <div className="bg-primary/10 border border-primary text-primary p-4 mb-6 font-bold">
          Success! Your submission has been received and is pending approval.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6 font-bold">
          An error occurred. Please try again later.
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
            <label htmlFor="email" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Contact Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              required 
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="admin@example.com"
            />
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Primary Category *</label>
            <select 
              id="category" 
              name="category"
              required
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none appearance-none"
            >
              <option value="">Select a category</option>
              <option value="survival">Survival</option>
              <option value="skyblock">Skyblock</option>
              <option value="minigames">Minigames</option>
              <option value="factions">Factions</option>
              <option value="prison">Prison</option>
              <option value="creative">Creative</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Location *</label>
            <select 
              id="location" 
              name="location"
              required
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none appearance-none"
            >
              <option value="">Select a location</option>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
              <option value="au">Australia</option>
              <option value="asia">Asia</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="discord" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Discord Link</label>
            <input 
              type="url" 
              id="discord" 
              name="discord"
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="https://discord.gg/..."
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">Image URL</label>
            <input 
              type="url" 
              id="image" 
              name="image"
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-primary text-black font-bold text-lg py-4 border border-primary hover:bg-transparent hover:text-primary transition-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT SERVER FOR REVIEW (£20/WEEK)'}
          </button>
        </div>
      </form>
    </div>
  );
}
