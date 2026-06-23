-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Servers Table
CREATE TABLE servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category_tags TEXT[] NOT NULL,
    geo_region TEXT NOT NULL,
    discord_link TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions Table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    discord_link TEXT,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dummy Data for initial directory authority
INSERT INTO servers (slug, name, description, category_tags, geo_region, discord_link, image_url, is_featured)
VALUES 
(
    'hypixel',
    'Hypixel Network',
    'The Hypixel Network is the largest and highest quality Minecraft Server Network in the world, featuring original games such as SkyBlock, BedWars, SkyWars, and many more!',
    '{"minigames", "skyblock", "bedwars", "survival"}',
    'us',
    'https://discord.gg/hypixel',
    'https://pbs.twimg.com/profile_images/1675122180517863426/Yc-5B14f_400x400.png',
    TRUE
),
(
    'the-hive',
    'The Hive',
    'The Hive is a featured Minecraft Bedrock server featuring multiple minigames including Treasure Wars, Murder Mystery, and Survival Games.',
    '{"minigames", "bedrock", "survival-games"}',
    'eu',
    'https://discord.gg/hive',
    'https://pbs.twimg.com/profile_images/1498305718361817088/D-K_uQ51_400x400.png',
    TRUE
),
(
    'wynncraft',
    'Wynncraft',
    'The largest MMORPG in Minecraft. No mods required! Discover an immersive world with quests, guilds, and custom items.',
    '{"mmorpg", "rpg", "survival"}',
    'eu',
    'https://discord.gg/wynncraft',
    'https://pbs.twimg.com/profile_images/858482436894081024/02wD-66G_400x400.jpg',
    FALSE
),
(
    'cubecraft',
    'CubeCraft Games',
    'One of the largest server networks in the world! Play EggWars, SkyBlock, Tower Defence, and more.',
    '{"minigames", "eggwars", "skyblock"}',
    'eu',
    'https://discord.gg/cubecraft',
    'https://pbs.twimg.com/profile_images/1454044569038753793/R4x5qA_c_400x400.png',
    FALSE
),
(
    'complex-gaming',
    'Complex Gaming',
    'Complex Gaming is a multi-modal network featuring Pixelmon, Skyblock, Factions, Survival, and more across both EU and US locations.',
    '{"pixelmon", "skyblock", "factions"}',
    'us',
    'https://discord.gg/complexgaming',
    'https://pbs.twimg.com/profile_images/1544778103755497475/jZkYV_2u_400x400.png',
    FALSE
);
