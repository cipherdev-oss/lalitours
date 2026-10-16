export interface HiddenSpotCard {
  slug: string;
  name: string;
  region: string;
  secret: string;
  tagline: string;
  image: string;
  badge: string;
}

export const HIDDEN_SPOT_CARDS: HiddenSpotCard[] = [
  {
    slug: 'jaffna-and-islands',
    name: 'Jaffna & Islands',
    region: 'Far North',
    secret: 'Towering saffron Hindu gopurams, quiet lagoons, and ancient palmyrah forests where tourists are rare and hospitality is legendary.',
    tagline: 'The vibrant Tamil cultural kingdom of the north.',
    image: '/img/map/jaffna-nallur-temple.webp',
    badge: 'Cultural Frontier',
  },
  {
    slug: 'knuckles-mountain-range',
    name: 'Knuckles Mountain Range',
    region: 'Central Massif',
    secret: 'Rugged mist-veiled peaks shaped like clenched fists. Cloud forests home to rare orchids, secret river pools, and isolated cardamom farming hamlets.',
    tagline: 'Untamed hiking with zero crowds.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    badge: 'Trekker Sanctuary',
  },
  {
    slug: 'kalpitiya-peninsula',
    name: 'Kalpitiya Peninsula',
    region: 'Northwest Shore',
    secret: 'A narrow finger of land bordered by a massive flat-water lagoon and the ocean, hosting dolphin mega-pods and world-class kiteboarding winds.',
    tagline: 'Dolphins, sandbars, and howling kite winds.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    badge: 'Kite & Marine Haven',
  },
  {
    slug: 'nilaveli-and-pigeon-island',
    name: 'Nilaveli & Pigeon Island',
    region: 'Eastern Coastline',
    secret: 'Powdery bone-white beaches meeting aquamarine waters where blacktip reef sharks and sea turtles glide through protected coral gardens.',
    tagline: 'Untouched eastern marine paradise.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Coral Sanctuary',
  },
  {
    slug: 'hiriketiya-horseshoe-bay',
    name: 'Hiriketiya Horseshoe Bay',
    region: 'Deep South',
    secret: 'A lush jungle-wrapped crescent cove with gentle peeling waves, wooden treehouse smoothie shacks, and sun-dappled yoga lofts.',
    tagline: 'The bohemian ocean hideaway.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    badge: 'Boho Surf Cove',
  },
  {
    slug: 'riverston-and-the-gap',
    name: 'Riverston & The Gap',
    region: 'Matale Highlands',
    secret: 'Known as the windy gap where sudden cliff drops reveal panoramic cloud valleys, miniature Worlds End viewpoints, and rushing waterfalls.',
    tagline: 'High-altitude ridges kissed by clouds.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    badge: 'Highland Secret',
  },
  {
    slug: 'gal-oya-national-park',
    name: 'Gal Oya National Park',
    region: 'Eastern Interior',
    secret: 'Sri Lanka’s only boat safari park. Watch wild elephants swim between lush forested islands across the vast Senanayake Samudra reservoir.',
    tagline: 'Swimming elephants on inland seas.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    badge: 'Boat Safaris',
  },
  {
    slug: 'delft-island',
    name: 'Delft Island (Neduntheevu)',
    region: 'Palk Strait',
    secret: 'A windswept island of wild Portuguese ponies descended from 17th-century horses, ancient baobab trees, and fences built entirely of bleached coral rock.',
    tagline: 'Coral fences and wild horses.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    badge: 'Living Time Capsule',
  },
];