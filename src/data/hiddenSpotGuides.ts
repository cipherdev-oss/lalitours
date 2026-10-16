export interface HiddenSpotGuide {
  slug: string;
  title: string;
  metaDescription: string;
  overview: string;
  highlights: string[];
  planningNotes: string;
  routeNotes: string;
  relatedSlugs: string[];
}

export const HIDDEN_SPOT_GUIDES: HiddenSpotGuide[] = [
  {
    slug: 'jaffna-and-islands',
    title: 'Jaffna & Islands Travel Guide | Hidden Serendipity',
    metaDescription: 'Explore Jaffna’s Tamil heritage, Nallur Kandaswamy Temple, palmyrah landscapes, island ferries, and distinctive northern Sri Lankan cuisine.',
    overview: 'Jaffna offers a distinctive northern Sri Lankan experience shaped by Tamil culture, Hindu temple architecture, lagoon landscapes, palmyrah products, and a cuisine known for seafood and bold spice. Use the city as a base to explore nearby islands at a slower pace.',
    highlights: [
      'Visit Nallur Kandaswamy Temple and follow local guidance on dress, photography, and worship customs.',
      'Explore Jaffna’s markets and sample regional dishes such as crab curry and palmyrah sweets.',
      'Consider a day trip to Delft Island for its coral-stone walls, baobab tree, and free-roaming ponies.',
    ],
    planningNotes: 'Island ferries and access can change with weather and operating schedules. Confirm departure and return times before setting out, and leave flexibility in your itinerary. Ask permission before photographing people or religious ceremonies.',
    routeNotes: 'Jaffna works well as a dedicated northern extension. Pair the city with Anuradhapura for a heritage-focused route, and plan Delft as a separate excursion rather than a rushed stop.',
    relatedSlugs: ['delft-island', 'gal-oya-national-park'],
  },
  {
    slug: 'knuckles-mountain-range',
    title: 'Knuckles Mountain Range Guide | Hidden Serendipity',
    metaDescription: 'Plan a Knuckles Range visit in Sri Lanka with cloud-forest hikes, mountain viewpoints, village trails, and practical notes on weather and access.',
    overview: 'The Knuckles range is a rugged highland landscape of mist-covered ridges, forest, streams, and small farming communities. It feels far removed from Sri Lanka’s busy coastal circuit and is best explored on foot with time to appreciate changing weather and terrain.',
    highlights: [
      'Choose a hike that matches your fitness and experience; trail length and difficulty vary by route.',
      'Look for cloud-forest plants, birds, and views across the central massif.',
      'Include a village stop to learn about life and cultivation in the highlands.',
    ],
    planningNotes: 'Mountain weather can change quickly, and access rules differ by trail. Check current conditions before departure, use a knowledgeable local guide where required, carry rain protection, and stay on established paths.',
    routeNotes: 'Kandy and Matale are useful starting points for a Knuckles visit. Depending on the chosen trail, allow a full day rather than treating the range as a quick roadside stop.',
    relatedSlugs: ['riverston-and-the-gap', 'hiriketiya-horseshoe-bay'],
  },
  {
    slug: 'kalpitiya-peninsula',
    title: 'Kalpitiya Peninsula Guide | Hidden Serendipity',
    metaDescription: 'Discover Kalpitiya’s ocean coast and lagoon, with practical planning for kiteboarding, dolphin trips, and a quieter northwest Sri Lanka stay.',
    overview: 'Kalpitiya is a narrow coastal peninsula where the Indian Ocean and a broad lagoon create two very different waterside settings. Visitors come for open beaches, boat trips, and wind- and water-based activities, with a quieter atmosphere than Sri Lanka’s most established resort towns.',
    highlights: [
      'Try kiteboarding with an established school and choose a session suited to your ability.',
      'Explore the lagoon and nearby sandbars by boat when conditions allow.',
      'Join a responsible dolphin-watching trip that gives wildlife space and avoids chasing pods.',
    ],
    planningNotes: 'Wind, sea state, and wildlife sightings are seasonal and weather-dependent. Confirm activity conditions and operator practices before booking, and keep flexible time for changes on the water.',
    routeNotes: 'Kalpitiya can be added to a northwest-coast route from Colombo or combined with a wildlife-focused inland stop. The best sequence depends on your arrival point and onward plans.',
    relatedSlugs: ['nilaveli-and-pigeon-island', 'jaffna-and-islands'],
  },
  {
    slug: 'nilaveli-and-pigeon-island',
    title: 'Nilaveli & Pigeon Island Guide | Hidden Serendipity',
    metaDescription: 'Plan a Nilaveli beach stay and Pigeon Island visit near Trincomalee, with snorkeling, reef-care, and sea-condition advice.',
    overview: 'Nilaveli is a relaxed eastern-coast beach base near Trincomalee. Offshore, Pigeon Island National Park is known for clear water, coral habitat, and snorkeling. The experience is shaped by sea conditions, park access, and respectful time in a fragile marine environment.',
    highlights: [
      'Spend time on Nilaveli’s pale sand and calm-looking eastern shoreline.',
      'Visit Pigeon Island with an authorized boat operator when marine conditions are suitable.',
      'Snorkel without touching coral, feeding wildlife, or disturbing turtles and reef fish.',
    ],
    planningNotes: 'Boat trips may be delayed or cancelled due to sea conditions. Check current park rules and fees, use a properly equipped operator, and bring sun protection that is suitable for a marine environment.',
    routeNotes: 'Pair Nilaveli with Trincomalee’s harbor and cultural sites. Allow time for both the mainland sights and a separate island outing.',
    relatedSlugs: ['kalpitiya-peninsula', 'jaffna-and-islands'],
  },
  {
    slug: 'hiriketiya-horseshoe-bay',
    title: 'Hiriketiya Bay Guide | Hidden Serendipity',
    metaDescription: 'Explore Hiriketiya’s horseshoe bay on Sri Lanka’s south coast, with surf, beach, and practical notes for a relaxed coastal stay.',
    overview: 'Hiriketiya is a compact, palm-fringed bay on the south coast. Its curved shoreline, nearby green hills, and relaxed café scene make it a popular stop for travelers looking to slow down between longer drives and beach destinations.',
    highlights: [
      'Spend an unhurried morning by the bay and watch how the surf changes through the day.',
      'Take a lesson with a local surf school if conditions suit your experience.',
      'Explore nearby Dikwella and the surrounding south-coast villages.',
    ],
    planningNotes: 'The bay is small and can feel busy at peak times. Check surf conditions before entering the water, respect local beach guidance, and reserve accommodation ahead during popular travel periods.',
    routeNotes: 'Hiriketiya fits naturally between Galle, Mirissa, and other south-coast stops. Staying overnight gives more time to enjoy the bay without adding a rushed detour.',
    relatedSlugs: ['riverston-and-the-gap', 'kalpitiya-peninsula'],
  },
  {
    slug: 'riverston-and-the-gap',
    title: 'Riverston & The Gap Guide | Hidden Serendipity',
    metaDescription: 'Discover Riverston in Sri Lanka’s Matale highlands: windy ridges, cloud-valley viewpoints, waterfalls, and practical trail advice.',
    overview: 'Riverston is a highland escape in the Matale area, known for exposed ridgelines, strong winds, and broad views across forested valleys. The surrounding roads and viewpoints make it a scenic alternative to the better-known central highland circuit.',
    highlights: [
      'Visit the ridge viewpoints when visibility is good and wind conditions are manageable.',
      'Combine the drive with nearby waterfalls and small highland communities.',
      'Take time for the changing scenery between Matale and the mountain viewpoints.',
    ],
    planningNotes: 'Cloud, rain, and road conditions can reduce visibility or affect access. Check locally before departing, wear footwear suited to uneven ground, and keep a safe distance from exposed edges.',
    routeNotes: 'Riverston is commonly planned from the Matale side. Pair it with the Knuckles region for a highland-focused itinerary, allowing enough time for winding roads.',
    relatedSlugs: ['knuckles-mountain-range', 'gal-oya-national-park'],
  },
  {
    slug: 'gal-oya-national-park',
    title: 'Gal Oya National Park Guide | Hidden Serendipity',
    metaDescription: 'Plan a Gal Oya visit around Senanayake Samudra, forested islands, and responsible boat safaris in eastern Sri Lanka.',
    overview: 'Gal Oya National Park protects a broad dry-zone landscape around Senanayake Samudra reservoir. Boat safaris offer a different perspective from a conventional jeep outing, with forested islands and the possibility of seeing elephants near or in the water.',
    highlights: [
      'Explore the reservoir by boat with an operator who follows park and wildlife guidance.',
      'Look for elephants and birdlife while keeping a respectful distance.',
      'Experience the quieter eastern interior beyond the main coastal route.',
    ],
    planningNotes: 'Wildlife sightings are never guaranteed, and boat access depends on local operating conditions. Confirm permits, departure times, and safety arrangements before travel.',
    routeNotes: 'Gal Oya is an out-of-the-way stop that works best as part of an eastern or cultural-interior itinerary. Plan the surrounding transfers rather than adding it as a last-minute day trip.',
    relatedSlugs: ['kalpitiya-peninsula', 'riverston-and-the-gap'],
  },
  {
    slug: 'delft-island',
    title: 'Delft Island Travel Guide | Hidden Serendipity',
    metaDescription: 'Explore Delft Island from Jaffna: coral-stone walls, baobab trees, free-roaming ponies, and essential ferry-planning notes.',
    overview: 'Delft Island, also known as Neduntheevu, sits in the Palk Strait off the Jaffna peninsula. Its open, windswept landscape is marked by coral-stone walls, a celebrated baobab tree, and ponies associated with the island’s colonial past.',
    highlights: [
      'See the island’s coral-stone structures and distinctive baobab tree.',
      'Observe the ponies from a respectful distance and avoid feeding or chasing them.',
      'Explore with a local guide who can explain the island’s layered history.',
    ],
    planningNotes: 'Ferry schedules and availability can be limited and may change. Confirm both outbound and return plans before leaving Jaffna, carry drinking water and sun protection, and allow extra time for transfers.',
    routeNotes: 'Delft is best planned as a day trip from Jaffna, with the ferry treated as the fixed point of the day. Keep the rest of the schedule flexible.',
    relatedSlugs: ['jaffna-and-islands', 'nilaveli-and-pigeon-island'],
  },
];