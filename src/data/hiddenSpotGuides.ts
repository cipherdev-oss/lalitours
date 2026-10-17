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
    metaDescription: 'Explore Jaffna’s Tamil heritage, Nallur Kandaswamy Temple, Jaffna Fort, palmyrah landscapes, island ferries, and distinctive northern cuisine.',
    overview: 'Jaffna sits roughly 400 km north of Colombo at the tip of the peninsula, connected to the rest of the island by the A9 highway through Kilinochchi. This is the heartland of Sri Lankan Tamil culture: yellow gopurams of Hindu temples, palmyrah palms lining the lagoon roads, and a cuisine built on Jaffna crab, dried fish (oddiyal), and palmyrah sweets. The city re-opened fully to visitors only after the civil war ended in 2009, so the atmosphere feels genuinely local rather than polished for tourism. Use Jaffna as a base — the surrounding islands (Karainagar, Nagadeepa, Delft) each need their own unhurried day.',
    highlights: [
      'Nallur Kandaswamy Temple: founded in 948 AD and rebuilt in the 1730s, it hosts the 25-day Nallur Perahera each August–September; the final ten nights of drums, fire, and chariots draw the entire peninsula.',
      'Jaffna Fort: begun by the Portuguese in 1619 and rebuilt by the Dutch in the 1680s, it is the second-largest fortification in Sri Lanka and a sunset walking spot.',
      'Keerimalai sacred springs and Nagadeepa Island, one of the sixteen sites in Sri Lanka associated with the Buddha’s visits.',
      'Markets and food: Jaffna crab curry, palmyrah treacle, kool (a spiced seafood broth), and mutton rolls — the local answer to the southern hoppers.',
    ],
    planningNotes: 'Ferries to Delft leave Kurikattuwan jetty, typically in the morning, and sailings are limited and weather-dependent — confirm the previous evening and plan the return before you board. Temples require shoulders and knees covered and shoes removed; photography during puja needs permission from the priest. Expect warm, dry conditions from January to September; the city gets busy during the Nallur festival. ATMs exist in town but carry cash for islands, where cards are not accepted.',
    routeNotes: 'Jaffna works best as a dedicated 2–3 night northern extension. Drive the A9 from Anuradhapura (about 3 hours) for a heritage-focused route, or take the short domestic flight from Colombo (about 1 hour) if time is tight. Karainagar is reachable by causeway and Nagadeepa by boat from Nachikudah — neither should share a day with Delft.',
    relatedSlugs: ['delft-island', 'gal-oya-national-park'],
  },
  {
    slug: 'knuckles-mountain-range',
    title: 'Knuckles Mountain Range Guide | Hidden Serendipity',
    metaDescription: 'Plan a Knuckles Range visit in Sri Lanka with cloud-forest hikes, Pitawala Pathana grasslands, Meemure village, and practical notes on weather, permits, and access.',
    overview: 'The Knuckles Range takes its name from the fist-like profile of its highest ridge — visible from the Kandy side on a clear day. UNESCO inscribed it as part of the Central Highlands World Heritage Site in 2010, recognising an extraordinary ladder of ecosystems: lowland rainforest, cloud forest wreathed in mist, and open patana grasslands above 1,500 metres. It shelters endemics found nowhere else, including the Knuckles pygmy lizard and the purple-faced langur. Villages such as Meemure, among the island’s most remote, still farm on terraces cut into the valleys. Everything here is explored on foot, at the pace the weather dictates.',
    highlights: [
      'Pitawala Pathana: the island’s largest natural montane grassland, a wind-blown plateau with 360° views of the central massif.',
      'Meemure village and the trail toward Lakegala, passing rice terraces, stone pools, and streams — classic Knuckles highland scenery.',
      'Cloud-forest ridge walks where moss hangs from every branch; look for endemics and listen for the drumming of purple-faced langurs.',
      'Streams and waterfalls for a cold swim after the hike; the air at the trailheads is noticeably cooler than the coast.',
    ],
    planningNotes: 'The Forest Department gates several trailheads (Meemure, Loolwatta, Pitawala Pathana) and often requires a registered local guide — arrange this in Kandy or Matale, not at the gate. Start early: cloud closes in by late morning and rain is possible any month. Carry rain protection, leech protection for forest sections, and all your water and food — there are no shops on the trails. Weather turns within an hour; turn back rather than push a ridge in visibility of a few metres.',
    routeNotes: 'Kandy to Meemure takes roughly 4 hours via Teldeniya and Gampola on winding mountain roads, so treat any Knuckles hike as a full-day outing or overnight in a village guesthouse. The classic combination is Riverston → The Gap → Meemure, which lets you cross the range rather than double back.',
    relatedSlugs: ['riverston-and-the-gap', 'hiriketiya-horseshoe-bay'],
  },
  {
    slug: 'kalpitiya-peninsula',
    title: 'Kalpitiya Peninsula Guide | Hidden Serendipity',
    metaDescription: 'Discover Kalpitiya’s ocean coast and lagoon, with practical planning for kiteboarding, dolphin trips, Bar Reef snorkelling, and a quieter northwest Sri Lanka stay.',
    overview: 'Kalpitiya is a long, narrow finger of land in the northwest where the Indian Ocean faces a vast shallow lagoon, giving you two completely different bodies of water a few hundred metres apart. The ocean side gets reliable wind that has made it Sri Lanka’s kiteboarding capital, while the lagoon side stays glassy. Offshore, the Bar Reef Marine Sanctuary — gazetted in 1992 as the country’s largest marine sanctuary — holds hard coral gardens and reef fish. The peninsula stays low-key: fishing stilt poles, a Dutch-era church, and empty sand rather than resort strips.',
    highlights: [
      'Kiteboarding at Kapparagoda and the lagoon edge, with schools offering first lessons in waist-deep, flat water — ideal for beginners.',
      'Dolphin trips from Alankuda beach: pods of hundreds of spinner dolphins pass close to shore, most reliably November to April.',
      'Snorkelling day trips to Bar Reef, the island’s largest marine protected area, with sea turtles and colourful reef fish.',
      'The old Dutch Reformed church at Kalpitiya town, part of the peninsula’s colonial-era harbour history.',
    ],
    planningNotes: 'The kite season runs May to September with the strongest wind in June–August; the dolphin season runs roughly November to April — decide which you came for and time your visit accordingly. Outside those windows it can be very quiet, with some guesthouses closed. Bring reef shoes, sun protection, and insect repellent for evenings. Boat trips are weather-dependent; keep one spare day so a cancelled outing can be rescheduled.',
    routeNotes: 'Kalpitiya is about 135 km north of Colombo via Puttalam and Anamaduwa (3–4 hours). It pairs naturally with Wilpattu National Park for a northwest loop, or you can continue up the coast toward Mannar. Expect limited ATM and mobile coverage on the peninsula — carry cash.',
    relatedSlugs: ['nilaveli-and-pigeon-island', 'gal-oya-national-park'],
  },
  {
    slug: 'nilaveli-and-pigeon-island',
    title: 'Nilaveli & Pigeon Island Guide | Hidden Serendipity',
    metaDescription: 'Plan snorkelling at Pigeon Island National Park near Nilaveli: blacktip reef sharks, turtles, boat timings, tickets, and a calm Trincomalee beach base.',
    overview: 'Nilaveli is a wide, pale-sand beach about 15 minutes south of Trincomalee, and it is the launch point for Pigeon Island National Park — a pair of rocky islands rising from a coral shelf about 20 minutes offshore. Declared a national park in 1983, Pigeon Island is one of only four marine national parks in Sri Lanka, and its shallow reefs are among the most reliable places on the island to swim with blacktip reef sharks, hawksbill and green turtles, and dense stands of hard coral. The water is calm, clear, and waist-deep in places, which makes it forgiving for first-time snorkellers.',
    highlights: [
      'Snorkelling over the outer reef where blacktip reef sharks cruise the shallows — they are harmless but always worth respecting from a distance.',
      'Turtles feeding on the coral shelf; a few drift through the bay itself, especially early morning.',
      'The boat crossing itself: 20 minutes across turquoise water with the island growing from the horizon.',
      'Back on shore, Trincomalee adds Fort Frederick’s ramparts, the cliff-top Koneswaram Temple, and the hot springs of Kanniya.',
    ],
    planningNotes: 'Park tickets are issued at the Nilaveli jetty (Department of Wildlife fees plus a boatman charge), and boats run in the morning — arrive by 7:30 to secure a slot in season. The sea is calmest roughly April to September and can get choppy during the north-east monsoon months. Stand only on sand or bare rock: coral is fragile and park rules prohibit touching it. Reef-safe sunscreen, a rash vest, and water for the boat ride are essentials; there are no facilities on the island.',
    routeNotes: 'Base yourself in Nilaveli or Trincomalee — Trinco is about 8 hours from Colombo by road or reachable by the eastern rail line. Combine Pigeon Island with a Trincomalee day (Fort Frederick, Koneswaram Temple, Marble Beach) rather than rushing both into one outing; keep an afternoon spare for weather cancellations.',
    relatedSlugs: ['kalpitiya-peninsula', 'delft-island'],
  },
  {
    slug: 'hiriketiya-horseshoe-bay',
    title: 'Hiriketiya Horseshoe Bay Guide | Hidden Serendipity',
    metaDescription: 'Discover Hiriketiya’s horseshoe cove near Dikwella: surf levels, cafés, blowholes and temples nearby, plus the best swell window on Sri Lanka’s south coast.',
    overview: 'Hiriketiya (locals say Hiriketiya Bay) is a near-perfect horseshoe of water tucked against the headlands east of Dikwella on the south coast — so compact that the two ends of the curve are visible from the middle of the bay. Long before it had a name on travel maps, it was known to surfers as a forgiving, warm-water beach break, and today the cove mixes morning surf sessions with barefoot cafés strung along the sand. It stays small and low-rise: no high-rises, no strip, just the curve of the bay, fishing boats hauled up at dusk, and jungle-backed hills behind.',
    highlights: [
      'The bay’s beach break works for beginners and improvers, with gentle, shoulders-to-head-high waves and several surf schools operating right on the sand.',
      'Early mornings for the glassy first hour on the water; the afternoons bring the onshore breeze and café crowd.',
      'Hummanaya blowhole near Dikwella — one of the very few permanent blowholes in Sri Lanka, spouting seawater metres into the air on a big swell.',
      'Short rides to quiet neighbours: Mawella Beach, Dikwella town’s fish market, and inland temples with ocean views.',
    ],
    planningNotes: 'The south coast swell is strongest roughly May to September, which is also when the bay is most reliably fun to surf; outside that window it mellows but rarely goes flat. There are no lifeguards — swim between the flags of activity and stay near the boats. The bay faces southeast, so it stays cooler than open coastlines in the height of the dry season. Buggies and tuk-tuks link the cove to Dikwella (about 10 minutes); cash is useful as some cafés are card-shy.',
    routeNotes: 'Hiriketiya sits roughly 2.5 hours from Galle and about 5 hours from Colombo via the A2 coastal road. It slots perfectly into a south-coast hop: Mirissa → Hiriketiya → Tangalle, with Hiriketiya as the two-night pause between the busy whale-watching stretch and the empty southern bays.',
    relatedSlugs: ['knuckles-mountain-range', 'riverston-and-the-gap'],
  },
  {
    slug: 'riverston-and-the-gap',
    title: 'Riverston & The Gap Guide | Hidden Serendipity',
    metaDescription: 'Discover Riverston in Sri Lanka’s Matale highlands: The Gap viewpoint, windswept ridges, waterfalls, and practical trail and road advice.',
    overview: 'Riverston is a windswept plateau in the Matale district on the doorstep of the Knuckles Range, and its viewpoint — known simply as The Gap — drops away over forested valleys with almost nothing between your feet and the view. The final stretch of road climbs past terraced farms and small estates until the trees give way to open, grass-topped ridges that catch every breeze on the island. Flat granite outcrops known locally as Matrix make ideal sunset seats. It has none of the crowds of Nuwara Eliya or Ella, and that is exactly the point: this is highland Sri Lanka with the volume turned down.',
    highlights: [
      'The Gap: a cliff-edged viewpoint over deep green valley — spectacular at dawn when mist still fills the low ground below.',
      'Matrix rocks, broad flat boulders that are the natural gathering spot for sunset with 360° highland views.',
      'Winding mountain roads through tea, cardamom, and vegetable smallholdings between Matale and the ridge.',
      'Seasonal cascades and village footpaths for short walks — you can hear the Knuckles streams before you see them.',
    ],
    planningNotes: 'The ridge is genuinely exposed: wind can be strong and several degrees cooler than the valley, so carry a windcheater even on sunny days. Cloud can swallow The Gap within minutes — keep driving plans flexible and visit at more than one time of day if you can. Roads are narrow with sheer edges and no barriers; avoid the climb in heavy rain, and never park on a bend. Wear grip on uneven rock, especially if it has been raining.',
    routeNotes: 'Riverston is a day trip from Kandy or Matale: about 1 hour from Kandy to Matale, then 1–1.5 hours more on the climbing road. The classic highland loop runs Kandy → Matale → Riverston → The Gap → onward to Meemure in the Knuckles foothills, which turns a detour into a genuine crossing of the range.',
    relatedSlugs: ['knuckles-mountain-range', 'gal-oya-national-park'],
  },
  {
    slug: 'gal-oya-national-park',
    title: 'Gal Oya National Park Guide | Hidden Serendipity',
    metaDescription: 'Plan a Gal Oya visit around Senanayake Samudraya, swimming elephants between forested islands, and responsible boat safaris in eastern Sri Lanka.',
    overview: 'Gal Oya protects a quiet stretch of eastern dry zone around Senanayake Samudraya, a huge reservoir created by the Gal Oya dam scheme in the early 1950s and named after Prime Minister D.S. Senanayake. Instead of jeeps, its safaris happen by boat: you glide across open water toward forested islands where sea eagles nest and herds of elephants wade in — and famously swim across the channels between islands, a behaviour documented almost nowhere else in Sri Lanka. With only a handful of operators and few road-accessible lodges, visitor numbers stay low even in high season.',
    highlights: [
      'The island crossings: elephants swimming channel to channel with only trunks above the surface — the park’s signature sight.',
      'Boat safaris on Senanayake Samudraya past rookeries of painted storks, open-billed storks, and white-bellied sea eagles.',
      'Photography from the water at golden hour, with mirrored reflections of forested islands.',
      'A genuinely empty eastern interior — often only your boat and one other on the reservoir all morning.',
    ],
    planningNotes: 'Boat safaris depart from Inginiyagala and must be arranged in advance through the park or a licensed operator — permits, boatman, and lifejackets are included but confirm each before you travel. Wildlife sightings are never guaranteed; go for the light and the landscape as much as the animals. Carry water, sun protection, and insect repellent; services are sparse around the park gate. The driest months bring animals to the water’s edge, while the reservoir is fullest after the rains.',
    routeNotes: 'Gal Oya is out of the way by design: approach via Ampara or Monaragala from the cultural interior, or from Batticaloa on the east coast. It pairs naturally with an east-coast stay (Arugam Bay or Trincomalee) rather than a Colombo day trip — allow a full transfer day and at least one night near Inginiyagala.',
    relatedSlugs: ['kalpitiya-peninsula', 'riverston-and-the-gap'],
  },
  {
    slug: 'delft-island',
    title: 'Delft Island Travel Guide | Hidden Serendipity',
    metaDescription: 'Explore Delft Island from Jaffna: coral-stone walls, the famous baobab, free-roaming ponies, Dutch ruins, and essential ferry-planning notes.',
    overview: 'Delft Island — Neduntheevu to locals — lies in the Palk Strait between Sri Lanka and India, a low, windswept slab of land the Dutch named after their home city of Delft. Almost everything here is built from coral: lighthouse ruins, church walls, and the kilometres of coral-stone boundaries that divide the island. A celebrated baobab planted centuries ago by Arab traders stands near the centre, and several hundred free-roaming ponies — descendants of horses left by colonial administrators — graze the open scrub. The population is a few thousand Tamil fishing families, and the island sees barely a handful of visitors a day.',
    highlights: [
      'The giant baobab, one of the largest on the island, its trunk hollowed with age and framed by coral-stone walls.',
      'Hundreds of semi-wild ponies wandering the tracks — living descendants of Portuguese- and Dutch-era stock. Observe, do not feed or chase.',
      'Dutch and Portuguese ruins: the old Reformed church, gravestones with worn inscriptions, and the so-called Queen’s Palace foundations.',
      'Cycling the flat island loop between villages, coral quarries, and lagoon shore — the whole circuit is an easy half-day ride.',
    ],
    planningNotes: 'The ferry from Kurikattuwan jetty near Jaffna typically sails in the morning and takes around an hour; sailings are few, sometimes cancelled, and always worth confirming the day before. Missed return sailings are the single biggest risk — check the return time before you disembark, and keep cash, water, and sun cover, as shops and ATMs are essentially absent. Ponies are animals of habit: keep your distance and never corner one against a wall.',
    routeNotes: 'Delft is a full-day trip from Jaffna with the ferry as the fixed point of the day — build the rest of the schedule around it, not the other way around. A charter boat from Jaffna’s Kankesanthurai area is an option for groups who want flexibility. Combine the day after you arrive in Jaffna so a weather delay costs you a rest day, not your onward travel.',
    relatedSlugs: ['jaffna-and-islands', 'nilaveli-and-pigeon-island'],
  },
];
