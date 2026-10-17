export interface DestinationGuideSection {
  heading: string;
  body: string;
}

export interface DestinationGuideImage {
  src: string;
  caption: string;
  className?: string;
}

export interface DestinationGuide {
  slug: string;
  name: string;
  region: string;
  kicker: string;
  title: string;
  metaDescription: string;
  heroImage: string;
  lede: string;
  sections: DestinationGuideSection[];
  quote: string;
  collage: DestinationGuideImage[];
  wide: DestinationGuideImage;
  facts: { label: string; value: string }[];
  relatedSlugs: string[];
}

export const DESTINATION_GUIDES: DestinationGuide[] = [
  {
    slug: 'sigiriya',
    name: 'Sigiriya',
    region: 'Cultural Triangle',
    kicker: 'Cultural Triangle · Central Province',
    title: 'Sigiriya Lion Rock: A Complete Travel Guide | Lali Ceylon Tours',
    metaDescription: 'Everything you need to know about climbing Sigiriya Rock: frescoes, Mirror Wall, water gardens, best climbing hours, Pidurangala sunrise alternative, and practical tips.',
    heroImage: '/img/sigiriya.webp',
    lede: 'A 200-metre granite monolith erupting from the coconut and jungle plain, Sigiriya was chosen by King Kashyapa in the 5th century AD as his capital and his statement of power — a palace built on top of a rock, guarded by lion paws, ringed by water gardens that still work after 1,500 years.',
    sections: [
      {
        heading: 'The climb and what waits at the top',
        body: 'The ascent begins through the North Gate and the world’s oldest landscaped gardens — moats, fountains fed by ancient hydraulic systems that still spout in the rainy months. A metal staircase past the famous frescoes leads to the Lion Paw Terrace, where two colossal brick paws frame the final stair to the summit. Up top: palace foundations, cisterns carved into bare rock, and a full 360° view over the cultural plain. The round trip takes about 90 minutes and roughly 1,200 steps.',
      },
      {
        heading: 'Frescoes, Mirror Wall and the painted verses',
        body: 'The western face once carried around 500 paintings; the 21 surviving “Sigiriya Maidens” — some bare-breasted, some in full court dress — are dated to the 5th century and are best seen mid-morning when light rakes the wall. Below them, the polished Mirror Wall is no longer mirror-like, but the 8th-century graffiti scratched into it by ancient visitors is one of the earliest records of spoken Sinhala anywhere.',
      },
      {
        heading: 'Pidurangala, the better sunrise, and timing your visit',
        body: 'Climbers at the ticket gates around 7:00 am get cooler steps and clearer air; by 10:00 the granite is radiating heat. If you want Sigiriya itself in your photo, climb neighbouring Pidurangala Rock at dawn instead — a shorter, wilder scramble over boulders to a flat summit that looks straight across at the Lion Rock sunrise. The two climbs are usually combined in one early morning.',
      },
    ],
    quote: '“This is unlike anything you have seen in Asia” — the ancient Brahmi graffiti on the Mirror Wall, written more than a thousand years ago by a visitor who felt exactly what you will feel.',
    collage: [
      { src: '/img/sigiriya.webp', caption: 'Lion Rock rising from the jungle plain', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/sigiri.jpg', caption: 'Granite slopes and the final stair', className: '' },
      { src: '/img/experiences/ancient-stupa.webp', caption: 'Cultural Triangle stupas nearby', className: '' },
      { src: '/img/map/polonnaruwa-gal-vihara.webp', caption: 'Gal Vihara, ancient Polonnaruwa', className: 'md:col-span-2' },
      { src: '/img/sigiriya.png', caption: 'The plain at golden hour', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/sigiri.jpg', caption: 'Sunlight on the western face' },
    facts: [
      { label: 'Best window', value: 'December – April, early mornings' },
      { label: 'Climb time', value: '≈90 min round trip · 1,200 steps' },
      { label: 'Status', value: 'UNESCO World Heritage, inscribed 1982' },
      { label: 'Base towns', value: 'Dambulla · Habarana · Polonnaruwa' },
    ],
    relatedSlugs: ['yala', 'ella'],
  },
  {
    slug: 'ella',
    name: 'Ella',
    region: 'Uva Highlands',
    kicker: 'Uva Province · Hill Country',
    title: 'Ella & the Nine Arch Bridge: Complete Travel Guide | Lali Ceylon Tours',
    metaDescription: 'Ride the famous blue train to Ella: Nine Arch Bridge, Ella Rock sunrise hike, Little Adam’s Peak, tea factories, and where the hills of Uva hide their best views.',
    heroImage: '/img/9.webp',
    lede: 'At about 1,040 metres in Sri Lanka’s Uva hills, Ella is the small mountain town everyone arrives at by train — hanging out of blue carriage doors as the line curls through eucalyptus, tea, and cloud. Around it sit the island’s most photographed bridge, its most walkable peaks, and some of its quietest tea-country roads.',
    sections: [
      {
        heading: 'The blue train: Kandy to Ella',
        body: 'The hill line from Kandy to Ella takes roughly six to seven hours and is routinely called one of the world’s great rail journeys. Reserved seats sell out days ahead in season; even a standing ticket on the open doorway (firmly grip the pole) delivers the experience the magazines photograph. The final descent into Ella on a clear afternoon, with Nine Arch Bridge appearing below the train, is the moment most travellers describe as unforgettable.',
      },
      {
        heading: 'Nine Arch Bridge and the jungle walk to it',
        body: 'Completed during the First World War without a single girder of steel — stone, brick and cement only — the 1919–21 viaduct spans a green gorge in nine perfect arches. Walk the short trail from Ella town through tea bushes to the viewpoint above the curve, then scramble down to the trackside café and wait for a train to roll across. Trains typically pass a few times a day; check the timetable board in town the night before.',
      },
      {
        heading: 'Ella Rock at sunrise, Little Adam’s Peak at sunset',
        body: 'Ella Rock is a real hike — two hours of forest track, one questionable signboard, and a boulder scramble rewarded by the whole hill country rolling to the horizon. Start at 5:30 am with a local guide (the wrong path is famously hard to spot). Little Adam’s Peak is the opposite: twenty minutes of easy zigzag steps from town, made for sunset, and the classic postcard view of Ella Gap.',
      },
    ],
    quote: 'Nine arches, no steel, no rivets — just masonry laid by hand while the Great War raged, and a century of trains still crossing it every day.',
    collage: [
      { src: '/img/9.webp', caption: 'Nine Arch Bridge in its green gorge', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/ella.jpg', caption: 'Ella town and the mountain air', className: '' },
      { src: '/img/e.webp', caption: 'Tea terraces along the line', className: '' },
      { src: '/img/kandy.jpg', caption: 'The railway climbs out of Kandy', className: 'md:col-span-2' },
      { src: '/img/kandy.webp', caption: 'Hill country rail country', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/9.png', caption: 'The full sweep of the viaduct' },
    facts: [
      { label: 'Best window', value: 'January – March · clear hill skies' },
      { label: 'Altitude', value: '≈1,040 m · cool evenings year-round' },
      { label: 'Signature ride', value: 'Kandy → Ella, ≈6–7 hours by rail' },
      { label: 'Nearest hub', value: 'Bandarawela 45 min · Colombo full day' },
    ],
    relatedSlugs: ['nuwara-eliya', 'sigiriya'],
  },
  {
    slug: 'mirissa',
    name: 'Mirissa',
    region: 'South Coast',
    kicker: 'Southern Province · Indian Ocean',
    title: 'Mirissa: Whales, Coconut Tree Hill & South Coast Guide | Lali Ceylon Tours',
    metaDescription: 'Plan Mirissa: blue whale season and boat timings, Coconut Tree Hill sunset, secret beach coves, turtle bays, and a slower rhythm on Sri Lanka’s deep-blue south coast.',
    heroImage: '/img/mirissa.webp',
    lede: 'A curl of golden bay on Sri Lanka’s south shore where the continental shelf drops into deep water a few kilometres out — close enough that blue whales, sperm whales and spinner dolphins patrol it while you watch from a wooden catamaran. The rest of Mirissa moves at fishing-village speed.',
    sections: [
      {
        heading: 'Blue whales offshore: season and boats',
        body: 'The blue whale season runs roughly November to April, peaking December to March, with the deep canyon off Mirissa one of the most reliable whale-watching grounds anywhere on Earth. Boats leave the little harbour around 6:30 am while the ocean is still flat, reach the feeding grounds within an hour, and return before the day-trip heat. Operators follow whale-watch guidelines — distance, time limits, no circling — so choose licensed boats that do the same.',
      },
      {
        heading: 'Coconut Tree Hill, the harbour, and the hidden cove',
        body: 'Coconut Tree Hill is a small coral outcrop covered in leaning palms that overlooks the entire bay — postcard vantage at 6:30 pm when the light goes gold, and again at 7:30 am when fishermen’s boats line the beach below. The headland path also passes old coconut plantations, and around the southern curve sits a smaller crescent beach most visitors walk straight past.',
      },
      {
        heading: 'Turtles, surfing and the easy pairing south',
        body: 'A few kilometres east, the reef corners at Weligama (beginner-friendly, boards and teachers on the sand) and the turtle shallows at Kahandamodara make easy half-days. Mirissa also works as a base to swing inland to tea and spice, or west along the coast to Galle Fort — both under two hours on good roads.',
      },
    ],
    quote: 'At dawn the harbour is a wooden-armada of outriggers; by eight the ocean is yours, and somewhere past the horizon a blue whale is forty metres long.',
    collage: [
      { src: '/img/mirissa.webp', caption: 'The curve of Mirissa Bay', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/mirissa.jpg', caption: 'Palms over the south coast', className: '' },
      { src: '/img/experiences/arugam-bay-surf.webp', caption: 'Indian Ocean swell country', className: '' },
      { src: '/img/galle.jpg', caption: 'The south coast road west', className: 'md:col-span-2' },
      { src: '/img/mirissa.png', caption: 'Coconut light, late afternoon', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/mirissa.jpg', caption: 'Deep blue off the headland' },
    facts: [
      { label: 'Whale season', value: 'November – April (peak Dec–Mar)' },
      { label: 'Boat departure', value: '≈6:30 am from the little harbour' },
      { label: 'Best for', value: 'Whales · snorkelling · slow beach days' },
      { label: 'Nearest hub', value: 'Galle 1 h · Matara 40 min' },
    ],
    relatedSlugs: ['galle-fort', 'yala'],
  },
  {
    slug: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    region: 'Tea Country',
    kicker: 'Central Highlands · Sri Lanka Tea Country',
    title: 'Nuwara Eliya: Little England at 1,868 m | Lali Ceylon Tours Guide',
    metaDescription: 'Discover Nuwara Eliya: Gregory Lake, high-altitude tea estates, Horton Plains and World’s End, colonial-era architecture, and the coolest weather in Sri Lanka.',
    heroImage: '/img/n.webp',
    lede: 'Sri Lanka’s highest town sits at 1,868 metres in a wide green basin of tea, pine and eucalyptus — colonial bungalows with burning fireplaces, a Victorian racecourse, a lake built by a governor, and nights that genuinely drop toward freezing. The country around it, drained by mist, is where the world’s most famous Ceylon teas are grown.',
    sections: [
      {
        heading: 'Tea from the bush to the cup',
        body: 'The hills around town hold some of the island’s most celebrated estates — Pedro, Lovers Leap, and the high slopes above the Haflinger farm. Factories run daily tours that take you from the plucking floor through the rolling, firing and grading rooms to a tasting of the final grade: high-grown orange pekoe with the floral, slightly minty character only altitude gives. Morning plucking starts while the dew is still on the leaf.',
      },
      {
        heading: 'Gregory Lake, the season and the old town',
        body: 'Governor William Gregory created the lake in 1873; today its promenade is the town’s living room — swan boats at midday, horse carts on the road, and a park filling with families in April when the flower season and Sinhala and Tamil New Year coincide. Around the old town stand the red-brick post office, the hill-hotel verandahs and a golf course laid out in 1889.',
      },
      {
        heading: 'Horton Plains and World’s End',
        body: 'An hour’s drive away, Horton Plains National Park protects montane grassland and cloud forest with a loop trail to two sheer edges: Mini World’s End and the 870-metre plunge of World’s End itself. Start at the gate when it opens — clouds roll up from the valley by mid-morning and erase the drop. The same park shelters the Sambar deer and the endemic white-throated laughingthrush.',
      },
    ],
    quote: 'At 1,868 metres the air smells of eucalyptus and coal smoke — this is the Sri Lanka where tea farmers put the fireplace on in August.',
    collage: [
      { src: '/img/n.webp', caption: 'The lake and the mountain town', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/nuwara.jpg', caption: 'Highland light over the valley', className: '' },
      { src: '/img/kandy.jpg', caption: 'The climb into tea country', className: '' },
      { src: '/img/kandy.webp', caption: 'Estates stepping up the ridges', className: 'md:col-span-2' },
      { src: '/img/9.webp', caption: 'Rail and road through the leaves', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/nuwara.jpg', caption: 'Mist settling over the basin' },
    facts: [
      { label: 'Best window', value: 'January – March · clear, crisp days' },
      { label: 'Altitude', value: '1,868 m · frosty nights possible' },
      { label: 'Signature days', value: 'Factory tour · Gregory Lake · Horton Plains' },
      { label: 'Nearest hub', value: 'Kandy ≈3 h · Colombo ≈6 h by road' },
    ],
    relatedSlugs: ['ella', 'galle-fort'],
  },
  {
    slug: 'galle-fort',
    name: 'Galle Fort',
    region: 'Southern Coast',
    kicker: 'Southern Province · UNESCO City',
    title: 'Galle Fort Guide: Inside the UNESCO Dutch City | Lali Ceylon Tours',
    metaDescription: 'Walk the ramparts of Galle Fort: Dutch churches, the 1939 lighthouse, colonial lanes, maritime museums, sunset walls, and where to stay inside Sri Lanka’s UNESCO city.',
    heroImage: '/img/fort.webp',
    lede: 'The Portuguese took Galle in 1640, the Dutch made it an impregnable trading city, and the British kept it — and a 14-hectare jigsaw of coral-rock ramparts, merchant houses and narrow lanes survived almost intact to become Sri Lanka’s only living fortified city and a UNESCO World Heritage Site since 1988.',
    sections: [
      {
        heading: 'The ramparts: a four-century walk',
        body: 'The full circuit of the walls takes about an hour: the Star and Moon bastions to the north, the long western sea-facing rampart that locals simply call “the Wall Walk”, and the lighthouse bastion to the south. Sunset gathers on the western stretch with the Indian Ocean breaking on the rocks below — fishermen, schoolboys and cricket games on the grass above. Walk it again at 7 am for the fishermen’s morning and empty stone.',
      },
      {
        heading: 'Lanes, churches and the Dutch merchant city',
        body: 'Inside the gates, Groote Kerk (1755) still holds Dutch tombstones under its teak beams, the Maritime Museum fills a former Dutch warehouse near the Old Gate, and narrow streets of aurudcu emporiums, jewellers and old burgher houses run between them. The 1939 lighthouse on the southern bastion remains the city’s marker at sea.',
      },
      {
        heading: 'Where to eat, shop and slow down',
        body: 'Rampart-side cafés do rice-and-curry plates and king-coconut juice; inside the fort, colonial-era houses converted into restaurants serve everything from Dutch-influenced lamprais to modern fusion. The old town works best with no plan: find the moat gardens, duck into a lane for a mask or a silver ring, then return to the wall for the last hour of light.',
      },
    ],
    quote: 'Three empires, one wall — and every evening the whole town walks out onto the Dutch stonework to watch the sun sink into the Indian Ocean.',
    collage: [
      { src: '/img/fort.webp', caption: 'The lighthouse bastion at day’s end', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/fort.jpg', caption: 'Ramparts above the sea', className: '' },
      { src: '/img/galle.jpg', caption: 'Lanes of the old merchant city', className: '' },
      { src: '/img/experiences/ambalangoda-masks.webp', caption: 'Southern craft country nearby', className: 'md:col-span-2' },
      { src: '/img/mirissa.webp', caption: 'The coast keeps going east', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/fort.jpg', caption: 'Wall Walk at golden hour' },
    facts: [
      { label: 'Best window', value: 'December – March · dry southern sun' },
      { label: 'Status', value: 'UNESCO World Heritage since 1988' },
      { label: 'Walk time', value: 'Full rampart circuit ≈60 minutes' },
      { label: 'Nearest hub', value: 'Colombo ≈4 h · airport ≈2.5 h' },
    ],
    relatedSlugs: ['mirissa', 'nuwara-eliya'],
  },
  {
    slug: 'yala',
    name: 'Yala',
    region: 'Wilderness',
    kicker: 'South-East · Sri Lanka’s Busiest Safari',
    title: 'Yala National Park Safari Guide: Leopards & Elephants | Lali Ceylon Tours',
    metaDescription: 'Plan a Yala safari: leopard best times, Block 1 opening calendar, elephant herds, park rules, jeep logistics, and how to pair Yala with the deep south or Arugam Bay.',
    heroImage: '/img/yala.jpg',
    lede: 'Two thousand square kilometres of scrub, lagoon and sand dune between the dry-zone forest and the ocean — Yala holds what is frequently called the highest leopard density on Earth, along with sloth bears, elephant herds and more than 200 bird species. It is Sri Lanka’s most famous safari for a reason, and the plan around it matters.',
    sections: [
      {
        heading: 'Leopards: why Yala is the island’s best bet',
        body: 'Open scrubland and a resident prey base make Yala’s Block 1 the classic leopard territory — guides know the territories of individual cats and work them quietly at dawn. The 6:00–9:00 am window and the last two hours before close are prime; midday sun pushes cats into shade. Sightings are never guaranteed, but on a full day here the odds are the best in South Asia.',
      },
      {
        heading: 'Block 1, blocks, and when the gates close',
        body: 'Yala is divided into blocks, with Block 1 the historic core. Block 1 typically closes for around six weeks each late August–September period for breeding — the exact dates shift yearly, so confirm before building your dates. Alternatives stay open when it shuts: quieter Wilpattu to the west, or the park’s own less-visited blocks with far fewer jeeps per sighting.',
      },
      {
        heading: 'Elephants, birds and the surrounding loop',
        body: 'Open plains near the reservoirs hold herds that graze down to the track, while the lagoon margins draw painted storks, ibis, and sea eagles. Yala slots into the island’s south-east loop: Kirinda coastal shrines, the rock temples of Tissamaharama, and the surf of Arugam Bay a few hours north — an east-coast pairing that takes in both wilderness and ocean.',
      },
    ],
    quote: 'At 6:12 in the morning, forty metres from the track, a leopard crossed the sand and vanished into the scrub — one of the reasons travellers call Yala the greatest safari island on Earth.',
    collage: [
      { src: '/img/yala.jpg', caption: 'Scrub, lagoon and dry-zone light', className: 'md:col-span-2 md:row-span-2' },
      { src: '/img/Elephants%20in%20Sri%20Lanka.jpg', caption: 'Elephant herds at the water', className: '' },
      { src: '/img/experiences/village-cooking.webp', caption: 'Villages on the park edge', className: '' },
      { src: '/img/experiences/arugam-bay-surf.webp', caption: 'The coast north of Yala', className: 'md:col-span-2' },
      { src: '/img/experiences/ancient-stupa.webp', caption: 'Tissamaharama stupas nearby', className: 'md:col-span-2' },
    ],
    wide: { src: '/img/yala.jpg', caption: 'First light on the track' },
    facts: [
      { label: 'Best window', value: 'February – July · dry, animals at water' },
      { label: 'Safari hours', value: '6:00–9:00 am & 2:30–6:00 pm slots' },
      { label: 'Signature sighting', value: 'Leopards · elephants · sloth bears' },
      { label: 'Nearest hub', value: 'Tissamaharama 1 h · Ella ≈3.5 h' },
    ],
    relatedSlugs: ['sigiriya', 'mirissa'],
  },
];
