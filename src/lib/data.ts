import { Server } from '@/components/ServerCard';

// Dummy data mirroring what would be in Supabase for initial rendering
export const DUMMY_SERVERS: Server[] = [
  {
    id: '1',
    slug: 'hypixel',
    name: 'Hypixel Network',
    description: 'The Hypixel Network is the largest and highest quality Minecraft Server Network in the world, featuring original games such as SkyBlock, BedWars, SkyWars, and many more!',
    category_tags: ['minigames', 'skyblock', 'bedwars', 'survival'],
    geo_region: 'us',
    discord_link: 'https://discord.gg/hypixel',
    image_url: 'https://pbs.twimg.com/profile_images/1675122180517863426/Yc-5B14f_400x400.png',
    is_featured: true,
  },
  {
    id: '2',
    slug: 'the-hive',
    name: 'The Hive',
    description: 'The Hive is a featured Minecraft Bedrock server featuring multiple minigames including Treasure Wars, Murder Mystery, and Survival Games.',
    category_tags: ['minigames', 'bedrock', 'survival-games'],
    geo_region: 'eu',
    discord_link: 'https://discord.gg/hive',
    image_url: 'https://pbs.twimg.com/profile_images/1498305718361817088/D-K_uQ51_400x400.png',
    is_featured: true,
  },
  {
    id: '3',
    slug: 'wynncraft',
    name: 'Wynncraft',
    description: 'The largest MMORPG in Minecraft. No mods required! Discover an immersive world with quests, guilds, and custom items.',
    category_tags: ['mmorpg', 'rpg', 'survival'],
    geo_region: 'eu',
    discord_link: 'https://discord.gg/wynncraft',
    image_url: 'https://pbs.twimg.com/profile_images/858482436894081024/02wD-66G_400x400.jpg',
    is_featured: false,
  },
  {
    id: '4',
    slug: 'cubecraft',
    name: 'CubeCraft Games',
    description: 'One of the largest server networks in the world! Play EggWars, SkyBlock, Tower Defence, and more.',
    category_tags: ['minigames', 'eggwars', 'skyblock'],
    geo_region: 'eu',
    discord_link: 'https://discord.gg/cubecraft',
    image_url: 'https://pbs.twimg.com/profile_images/1454044569038753793/R4x5qA_c_400x400.png',
    is_featured: false,
  },
  {
    id: '5',
    slug: 'complex-gaming',
    name: 'Complex Gaming',
    description: 'Complex Gaming is a multi-modal network featuring Pixelmon, Skyblock, Factions, Survival, and more across both EU and US locations.',
    category_tags: ['pixelmon', 'skyblock', 'factions'],
    geo_region: 'us',
    discord_link: 'https://discord.gg/complexgaming',
    image_url: 'https://pbs.twimg.com/profile_images/1544778103755497475/jZkYV_2u_400x400.png',
    is_featured: false,
  }
];

export async function getServers(): Promise<Server[]> {
  // TODO: Replace with actual Supabase fetch once NEXT_PUBLIC_SUPABASE_URL is set
  return DUMMY_SERVERS;
}

export async function getServerBySlug(slug: string): Promise<Server | null> {
  return DUMMY_SERVERS.find(s => s.slug === slug) || null;
}

export async function getServersByCategory(category: string): Promise<Server[]> {
  return DUMMY_SERVERS.filter(s => s.category_tags.includes(category));
}

export async function getServersByLocation(location: string): Promise<Server[]> {
  return DUMMY_SERVERS.filter(s => s.geo_region === location);
}
