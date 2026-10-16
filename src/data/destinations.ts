import { Destination } from '../types';

export const SRI_LANKA_SLOGAN = {
  country: 'LALI CEYLON TOURS',
  brand: 'Lali Ceylon Tours',
  title: 'Bespoke Sri Lanka Expeditions',
  subtitle: 'A Land of Serendipity, Ancient Citadels & Emerald Tea Valleys',
  description: 'An island blessed by eternal summer, where golden coastlines meet mist-shrouded mountain peaks, millennium-old royal fortresses rise above virgin jungles, and wild leopards roam free.'
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    displayTitle: 'SIGIRIYA',
    subtitle: 'Ancient Citadel in the Clouds',
    slogan: 'Where a fifth-century royal sky fortress rises 200 meters above emerald canopies.',
    region: 'Cultural Triangle',
    heroImage: '/img/sigiriya.webp',
    cardImage: '/img/sigiriya.webp', 
    overview: 'A UNESCO World Heritage marvel, King Kashyapa\'s ancient capital is sculpted atop a monolithic granite pillar with ancient frescoes, water gardens, and symmetrical terraces.',
    highlights: [
      'Summit the Lion Rock at dawn for mist-swathed canopy panoramas',
      'Walk through the world\'s oldest landscaped water gardens and mirror wall',
      'View the famed fifth-century heavenly maiden frescoes preserved on sheer stone'
    ]
  },
  {
    id: 'ella',
    name: 'Ella & Nine Arch',
    displayTitle: 'ELLA GAP',
    subtitle: 'The Colonial Mountain Viaduct',
    slogan: 'Traverse misty mountain viaducts through the world’s most scenic highland railway.',
    region: 'Central Highlands',
    heroImage: '/img/9.webp',
    cardImage: '/img/9.webp',
    overview: 'Cradled between forested ravines and silver waterfalls, Ella is Sri Lanka’s mountain haven. The iconic 1921 Nine Arch Bridge spans 300 feet of emerald tea jungle without a single steel reinforcement.',
    highlights: [
      'Watch the scenic blue mountain train glide across the Nine Arch Bridge',
      'Hike Little Adam’s Peak for sunrise across the dramatic Ella Rock gorge',
      'Cool off at Ravana Waterfall amidst lush mountain air'
    ]
  },
  {
    id: 'mirissa',
    name: 'Mirissa & South Coast',
    displayTitle: 'MIRISSA',
    subtitle: 'Palms & Azure Indian Ocean',
    slogan: 'Untamed sapphire waters where gentle blue whales migrate along golden palm shores.',
    region: 'Southern Province',
    heroImage: '/img/mirissa.webp',
    cardImage: '/img/mirissa.webp',
    overview: 'A crescent of golden sand fringed by leaning coconut palms and tranquil turquoise bays. Mirissa is renowned globally for ethical deep-ocean encounters with the majestic Blue Whale.',
    highlights: [
      'Ascend Coconut Tree Hill for sunset over Indian Ocean breakers',
      'Sail into the deep ocean to witness migrating Blue Whales and playful spinner dolphins',
      'Relax at secret crescent beaches with candlelit fresh seafood dining on the sand'
    ]
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    displayTitle: 'NUWARA ELIYA',
    subtitle: 'Emerald Ceylon Tea Valleys',
    slogan: 'Endless velvet tea carpets kissed by crisp mountain breeze and colonial grace.',
    region: 'Hill Country',
    heroImage: '/img/n.webp',
    cardImage: '/img/n.webp',
    overview: 'Perched 1,868 meters above sea level, Nuwara Eliya is the heart of Ceylon tea. Manicured rolling hills, heritage estates, and cool mountain air evoke timeless grandeur.',
    highlights: [
      'Stroll through aromatic heritage tea factories and taste single-origin Ceylon leaves',
      'Explore Horton Plains and peer over the sheer 1,000-meter drop at World\'s End',
      'Cruise across Gregory Lake enveloped by pine hills and blooming flora'
    ]
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    displayTitle: 'GALLE FORT',
    subtitle: 'Maritime Living Heritage',
    slogan: 'Centuries of history echoing across stone ramparts, lighthouses, and ocean breeze.',
    region: 'South Coast',
    heroImage: '/img/fort.webp',
    cardImage: '/img/fort.webp',
    overview: 'Founded by the Portuguese in 1588 and fortified by the Dutch in the 17th century, Galle Fort is an unbroken ocean bastion of cobblestone lanes, boutique cafes, and historic bastions.',
    highlights: [
      'Walk the ocean ramparts at sunset towards the iconic white Galle Lighthouse',
      'Browse quaint colonial architecture, artisan gem boutiques, and antique galleries',
      'Sip artisan Ceylon spiced tea on open courtyards sheltered by ancient coral stone'
    ]
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    displayTitle: 'YALA WILD',
    subtitle: 'Realm of the Leopard',
    slogan: 'One of the highest leopard densities on Earth alongside roaming wild elephants.',
    region: 'Southern Wilderness',
    heroImage: '/img/e.webp',
    cardImage: '/img/e.webp',
    overview: 'Where rugged dry-zone brush meets the raw waves of the Indian Ocean. Yala is world-famous for its thriving population of Sri Lankan leopards, sloth bears, and stately elephant herds.',
    highlights: [
      'Dawn game safari tracking the elusive panthera pardus kotiya on giant granite boulders',
      'Observe wild elephant families bathing in coastal lagoons',
      'Glamp under the star-drenched southern sky in eco-luxury canvas lodges'
    ]
  }
];

export const FEATURED_DESTINATIONS = DESTINATIONS;
export const destinations = DESTINATIONS;
