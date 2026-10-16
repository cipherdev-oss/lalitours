import React, { useState } from 'react';
import { Calendar, Compass, ArrowRight, Check, Sparkles, MapPin, Clock, Users } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

interface JourneyPreset {
  id: string;
  duration: string;
  title: string;
  route: string;
  pacing: string;
  highlight: string;
  image: string;
  stops: {
    days: string;
    place: string;
    focus: string;
  }[];
}

const PRESETS: JourneyPreset[] = [
  {
    id: '7days',
    duration: '7 Days',
    title: 'The Golden Classic',
    route: 'Colombo → Sigiriya → Kandy → Ella → Galle',
    pacing: 'Dynamic & Iconic',
    highlight: 'The definitive first-time circuit covering the 8th wonder monolith, sacred hill capital, highland blue train, and coastal colonial fort.',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80',
    stops: [
      { days: 'Day 1', place: 'Colombo', focus: 'Arrival, coastal seafood & sunset at Galle Face Green' },
      { days: 'Days 2–3', place: 'Sigiriya & Cultural Triangle', focus: 'Lion Rock sunrise, Dambulla caves & elephant gathering' },
      { days: 'Day 4', place: 'Kandy & Foothills', focus: 'Temple of the Tooth & spice gardens' },
      { days: 'Day 5', place: 'Ella Highlands', focus: 'Iconic scenic blue train & Nine Arch Bridge' },
      { days: 'Days 6–7', place: 'Galle Fort & South Coast', focus: 'Dutch ramparts, ocean sunset & departure' },
    ],
  },
  {
    id: '10days',
    duration: '10 Days',
    title: 'Culture + Mountains + Beach',
    route: 'Negombo → Anuradhapura → Sigiriya → Kandy → Nuwara Eliya → Yala → Mirissa',
    pacing: 'Immersive & Varied',
    highlight: 'Deep immersion into 2,500-year-old ancient stupas, high-altitude tea plucking, thrill of a leopard safari, and barefoot ocean downtime.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
    stops: [
      { days: 'Days 1–2', place: 'Negombo & Anuradhapura', focus: 'Coastal lagoons & sacred ancient monasteries' },
      { days: 'Days 3–4', place: 'Sigiriya & Polonnaruwa', focus: 'Colossal granite citadels & medieval ruins' },
      { days: 'Days 5–6', place: 'Kandy & Nuwara Eliya', focus: 'Tea plantations, waterfalls & botanical walks' },
      { days: 'Days 7–8', place: 'Yala National Park', focus: 'Dawn & dusk leopard safaris' },
      { days: 'Days 9–10', place: 'Mirissa & Weligama', focus: 'Blue whale watching & sunset surf' },
    ],
  },
  {
    id: '14days',
    duration: '14 Days',
    title: 'The Complete Island Odyssey',
    route: 'Colombo → Jaffna → Trincomalee → Sigiriya → Knuckles → Ella → Yala → Galle',
    pacing: 'Grand Expedition',
    highlight: 'The ultimate panoramic odyssey from the mystical northern peninsula and pristine eastern coral beaches to untouched cloud forests and deep southern surf.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    stops: [
      { days: 'Days 1–3', place: 'Jaffna & North Islands', focus: 'Hindu temples, fiery cuisine & remote Delft island' },
      { days: 'Days 4–5', place: 'Trincomalee & Nilaveli', focus: 'Pigeon Island snorkeling & whale watching' },
      { days: 'Days 6–7', place: 'Sigiriya & Dambulla', focus: 'Ancient cave temples & fortress summit' },
      { days: 'Days 8–9', place: 'Knuckles Mountain Range', focus: 'Cloud forest trekking & cardamom valley rivers' },
      { days: 'Days 10–11', place: 'Ella & Tea Country', focus: 'Peak hikes & colonial railway viaducts' },
      { days: 'Days 12–14', place: 'Yala & Galle Coast', focus: 'Leopard tracking & colonial rampart living' },
    ],
  },
];

const INTEREST_OPTIONS = [
  'Beaches',
  'Wildlife',
  'Adventure',
  'Culture',
  'Food',
  'Mountains',
  'Luxury',
  'Surfing',
];

interface ChooseYourJourneyProps {
  onOpenBooking?: (notes?: string) => void;
}

export const ChooseYourJourney: React.FC<ChooseYourJourneyProps> = ({ onOpenBooking }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('7days');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Culture', 'Mountains', 'Beaches']);
  const [travelPace, setTravelPace] = useState<string>('Balanced');
  const [partySize, setPartySize] = useState<string>('Couple');
  const [customGenerated, setCustomGenerated] = useState<boolean>(false);

  const activePreset = PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerateCustom = () => {
    setCustomGenerated(true);
  };

  return (
    <section id="choose-journey" className="w-full py-20 sm:py-28 bg-gradient-to-b from-[#dff0fb] via-[#ebf6fd] to-[#d8ecf8] text-slate-900 relative overflow-hidden">
      {/* Top Wavy Break from TasteTheIsland (#081420) */}
      <WaveDivider position="top" fill="#081420" variant={2} />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-400/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-sky-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            Seamless Itineraries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-[#082238]">
            Choose Your Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Distances in Sri Lanka are surprisingly compact. Move between mist-shrouded cloud forests and warm tropical oceans in just a single afternoon.
          </p>
        </div>

        {/* Preset Itinerary Tab Headers */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPreset;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white font-extrabold shadow-lg shadow-sky-600/30 scale-105'
                    : 'bg-white hover:bg-sky-50 text-slate-700 border border-sky-200/90 shadow-sm hover:border-sky-400'
                }`}
              >
                <span>{preset.duration}</span>
                <span className="opacity-80 font-semibold hidden sm:inline">· {preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Preset Card */}
        <div className="bg-white/95 rounded-3xl overflow-hidden border border-sky-200/90 shadow-xl p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Summary and Day-by-Day */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-800 bg-sky-100 px-2.5 py-1 rounded border border-sky-300 font-bold">
                    {activePreset.duration}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Pace: <strong className="text-slate-900 font-bold">{activePreset.pacing}</strong>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-archivo font-extrabold text-slate-900 mt-2">
                  {activePreset.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-sky-700 font-semibold mt-1">
                  {activePreset.route}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 font-normal leading-relaxed">
                  {activePreset.highlight}
                </p>
              </div>

              {/* Stops list */}
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                  Route Breakdown:
                </span>
                <div className="space-y-2">
                  {activePreset.stops.map((stop, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 text-xs bg-sky-50/80 p-3 rounded-xl border border-sky-200/80"
                    >
                      <div>
                        <span className="font-mono text-sky-700 font-bold mr-2">
                          {stop.days}:
                        </span>
                        <strong className="text-slate-900 font-bold">{stop.place}</strong>
                        <p className="text-slate-600 text-[11px] mt-0.5">{stop.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking?.(`Preset Itinerary: ${activePreset.title} (${activePreset.duration})`)}
                  className="px-7 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-archivo font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-sky-600/25 transition-all duration-300 cursor-pointer"
                >
                  Book This Route
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Feature Image */}
            <div className="lg:col-span-5 h-80 sm:h-96 rounded-2xl overflow-hidden relative shadow-xl group border border-sky-100">
              <img
                src={activePreset.image}
                alt={activePreset.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300 font-semibold">
                  Curated Island Route
                </span>
                <p className="text-sm font-bold text-white">
                  Chauffeur driven or scenic train options included
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUILD YOUR OWN JOURNEY INTERACTIVE BUILDER */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 border border-sky-200/90 shadow-xl relative">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-sky-700 font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Custom Island Architect
            </div>
            <h3 className="text-2xl sm:text-3xl font-archivo font-black text-slate-900">
              Build Your Own Journey
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              Select what makes your heart sing. We'll instantly weave an optimal route tailored to your passions.
            </p>
          </div>

          {/* Interests Checkbox Matrix */}
          <div className="mb-8">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block text-center mb-4">
              What do you love?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {INTEREST_OPTIONS.map((opt) => {
                const checked = selectedInterests.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      checked
                        ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-sm'
                        : 'bg-white border-sky-200/80 text-slate-700 hover:border-sky-400'
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                        checked
                          ? 'bg-sky-600 text-white border-sky-600 font-bold'
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Details Filter (Pace & Party) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-1.5">
                Travel Style:
              </label>
              <select
                value={travelPace}
                onChange={(e) => setTravelPace(e.target.value)}
                className="w-full bg-white border border-sky-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 shadow-sm"
              >
                <option value="Relaxed">Relaxed & Leisurely</option>
                <option value="Balanced">Balanced Highlights</option>
                <option value="Action-Packed">Fast-Paced Explorer</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-1.5">
                Traveling As:
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full bg-white border border-sky-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 shadow-sm"
              >
                <option value="Solo">Solo Traveler</option>
                <option value="Couple">Couple / Romance</option>
                <option value="Family">Family with Kids</option>
                <option value="Friends">Group of Friends</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGenerateCustom}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-archivo font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-sky-600/25 transition-all duration-300 cursor-pointer"
            >
              CREATE MY JOURNEY
            </button>
          </div>

          {/* Generated Result Modal Card */}
          {customGenerated && (
            <div className="mt-8 p-6 sm:p-8 bg-sky-50 rounded-2xl border border-sky-300 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold">
                    Your Personalized Tailored Circuit
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                    The {selectedInterests.join(' + ')} Odyssey
                  </h4>
                </div>
                <div className="text-xs bg-white px-3 py-1 rounded-full border border-sky-300 text-sky-800 font-mono font-semibold shadow-sm">
                  {travelPace} Pace · {partySize}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                Based on your preference for <strong>{selectedInterests.join(', ')}</strong>, we’ve connected your dream spots: starting on the coast, climbing into misty highlands via the scenic railway, and venturing into wildlife reserves.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedInterests.map((interest) => (
                  <span key={interest} className="text-xs bg-white text-sky-800 border border-sky-200 px-3 py-1 rounded-full font-medium shadow-sm">
                    ★ {interest} Highlights Included
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  onOpenBooking?.(
                    `Custom Built Itinerary: Interests (${selectedInterests.join(', ')}), Pace (${travelPace}), Style (${partySize})`
                  )
                }
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-sky-600/20"
              >
                Send Me This Detailed Custom Itinerary
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wavy Break into BeyondThePostcard (#06121e) */}
      <WaveDivider position="bottom" fill="#06121e" variant={1} />
    </section>
  );
};
