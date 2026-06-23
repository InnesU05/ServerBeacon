'use client';

import { useState } from 'react';
import { Server } from '@/lib/types';
import { toggleFeatured, deleteServer, updateServer } from '@/actions/admin';

export default function AdminServerRow({ server }: { server: Server }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <form action={async (formData) => {
        await updateServer(formData);
        setIsEditing(false);
      }} className={`bg-card border p-6 flex flex-col gap-4 ${server.is_featured ? 'border-featured bg-featured/5' : 'border-gray-800'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-white text-lg uppercase tracking-wider">Editing: {server.name}</h3>
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white uppercase text-xs font-bold">Cancel</button>
        </div>
        
        <input type="hidden" name="id" value={server.id} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Server Name</label>
            <input type="text" name="name" defaultValue={server.name} required className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">IP Address</label>
            <input type="text" name="ip_address" defaultValue={server.ip_address} required className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
          <textarea name="description" defaultValue={server.description} required rows={3} className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"></textarea>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Promo Banner URL</label>
            <input type="url" name="image_url" defaultValue={server.image_url} className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Custom Logo URL</label>
            <input type="url" name="logo_url" defaultValue={server.logo_url} className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Edition</label>
            <select name="edition" defaultValue={server.edition} required className="w-full bg-charcoal border border-gray-800 text-gray-400 px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="java">Java</option>
              <option value="bedrock">Bedrock</option>
              <option value="crossplay">Crossplay</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Region</label>
            <select name="geo_region" defaultValue={server.geo_region} required className="w-full bg-charcoal border border-gray-800 text-gray-400 px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="us">US</option>
              <option value="eu">EU</option>
              <option value="au">AU</option>
              <option value="asia">Asia</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Tag</label>
            <select name="category_tags_input" defaultValue={server.category_tags[0] || 'survival'} required className="w-full bg-charcoal border border-gray-800 text-gray-400 px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="survival">Survival</option>
              <option value="skyblock">Skyblock</option>
              <option value="minigames">Minigames</option>
              <option value="factions">Factions</option>
              <option value="prison">Prison</option>
              <option value="creative">Creative</option>
              <option value="rpg">RPG</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discord Link</label>
          <input type="url" name="discord_link" defaultValue={server.discord_link} className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>

        <button type="submit" className="w-full bg-emerald-500 text-black font-bold py-3 text-sm uppercase tracking-wider transition-colors mt-2 hover:bg-emerald-400">Save Changes</button>
      </form>
    );
  }

  return (
    <div className={`bg-card border p-4 flex flex-col sm:flex-row justify-between items-center gap-4 ${server.is_featured ? 'border-featured bg-featured/5' : 'border-gray-800'}`}>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-12 h-12 bg-charcoal border border-gray-800 flex items-center justify-center shrink-0">
          <span className="text-gray-500 font-bold text-xs">{server.name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div>
          <h3 className="font-bold text-white">{server.name}</h3>
          <p className="text-xs text-gray-500">{server.ip_address} • {server.votes} Votes</p>
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto shrink-0">
        <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-xs font-bold uppercase tracking-wider border bg-transparent text-gray-300 border-gray-600 hover:border-gray-400">
          Edit
        </button>
        
        <form action={async (formData) => { await toggleFeatured(formData); }}>
          <input type="hidden" name="id" value={server.id} />
          <input type="hidden" name="currentState" value={server.is_featured.toString()} />
          <button type="submit" className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border ${server.is_featured ? 'bg-featured text-black border-featured' : 'bg-transparent text-featured border-featured hover:bg-featured/10'}`}>
            {server.is_featured ? '★ Featured' : 'Make Featured'}
          </button>
        </form>
        
        <form action={async (formData) => { await deleteServer(formData); }}>
          <input type="hidden" name="id" value={server.id} />
          <button type="submit" className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-transparent text-red-500 border border-red-500/50 hover:bg-red-500/10">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
