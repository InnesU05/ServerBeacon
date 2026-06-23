import { checkAdminAuth, authenticateAdmin, approveSubmission, rejectSubmission, manualAddServer, logoutAdmin } from '@/actions/admin';
import { supabase } from '@/lib/supabase';
import { Server, ServerSubmission } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import AdminServerRow from '@/components/AdminServerRow';

export const metadata = { title: 'Admin Dashboard | ServerBeacon' };

export default async function AdminPage() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <div className="bg-card border border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider text-center">Admin Login</h1>
          <form action={async (formData) => {
            'use server';
            const pwd = formData.get('password') as string;
            await authenticateAdmin(pwd);
            revalidatePath('/admin');
          }} className="space-y-4">
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Enter Admin Password"
              className="w-full bg-charcoal border border-gray-800 text-white px-4 py-3 focus:border-primary focus:outline-none transition-none"
            />
            <button type="submit" className="w-full bg-primary text-black font-bold py-3 uppercase tracking-wider">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Fetch Data
  const { data: submissions } = await supabase
    .from('server_submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false }) as { data: ServerSubmission[] | null };

  const { data: servers } = await supabase
    .from('servers')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('votes', { ascending: false }) as { data: Server[] | null };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Admin Dashboard</h1>
        <form action={async () => { 'use server'; await logoutAdmin(); revalidatePath('/admin'); }}>
          <button type="submit" className="text-gray-400 hover:text-white border border-gray-800 px-4 py-2 uppercase text-xs font-bold bg-card">Logout</button>
        </form>
      </div>

      {/* Pending Submissions */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider flex items-center">
          Pending Submissions
          <span className="ml-3 bg-primary text-black px-2 py-0.5 rounded-full text-sm">{submissions?.length || 0}</span>
        </h2>
        
        {submissions?.length === 0 ? (
          <div className="bg-card border border-gray-800 p-8 text-center text-gray-500 uppercase tracking-wider">
            No pending submissions.
          </div>
        ) : (
          <div className="space-y-4">
            {submissions?.map(sub => (
              <div key={sub.id} className="bg-card border border-gray-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {sub.name} <span className="text-gray-500 text-sm ml-2">({sub.ip_address})</span>
                    {sub.wants_featured && (
                      <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-500/50 uppercase tracking-wider font-bold">
                        Wants Featured
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{sub.email} • {sub.edition.toUpperCase()} • {sub.geo_region.toUpperCase()}</p>
                  <p className="text-gray-300 text-sm line-clamp-2 max-w-2xl">{sub.description}</p>
                </div>
                <div className="flex flex-row gap-3 w-full md:w-auto shrink-0">
                  <form action={async () => { 'use server'; await approveSubmission(sub.id); }}>
                    <button type="submit" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 px-6 py-2 font-bold uppercase tracking-wider w-full md:w-auto">Approve</button>
                  </form>
                  <form action={async () => { 'use server'; await rejectSubmission(sub.id); }}>
                    <button type="submit" className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 px-6 py-2 font-bold uppercase tracking-wider w-full md:w-auto">Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Servers */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-featured pl-3">Active Servers</h2>
          <div className="space-y-4">
            {servers?.map(server => (
              <AdminServerRow key={server.id} server={server} />
            ))}
          </div>
        </div>

        {/* Manual Add Server */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-gray-500 pl-3">Quick Add</h2>
          <form action={async (formData) => {
            'use server';
            await manualAddServer(formData);
          }} className="bg-card border border-gray-800 p-6 space-y-4">
            <input type="text" name="name" required placeholder="Server Name" className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input type="text" name="ip_address" required placeholder="IP Address" className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <textarea name="description" required placeholder="Description" rows={3} className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"></textarea>
            
            <div className="grid grid-cols-2 gap-2">
              <select name="edition" required className="w-full bg-charcoal border border-gray-800 text-gray-400 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="java">Java</option>
                <option value="bedrock">Bedrock</option>
                <option value="crossplay">Crossplay</option>
              </select>
              <select name="geo_region" required className="w-full bg-charcoal border border-gray-800 text-gray-400 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="us">US</option>
                <option value="eu">EU</option>
                <option value="au">AU</option>
                <option value="asia">Asia</option>
              </select>
            </div>
            
            <input type="url" name="image_url" placeholder="Promo Banner URL (Optional)" className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input type="url" name="logo_url" placeholder="Custom Logo URL (Optional)" className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input type="url" name="discord_link" placeholder="Discord Link (Optional)" className="w-full bg-charcoal border border-gray-800 text-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input type="checkbox" name="is_featured" value="true" className="w-4 h-4 accent-featured bg-charcoal border-gray-800" />
              <span>Make Featured Immediately</span>
            </label>

            <button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 text-sm uppercase tracking-wider transition-colors mt-4">Add Server</button>
          </form>
        </div>

      </div>
    </div>
  );
}
