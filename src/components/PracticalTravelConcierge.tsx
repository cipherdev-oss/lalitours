import React, { useState } from 'react';
import {
  FileText,
  Car,
  Sun,
  Coins,
  ShieldCheck,
  Home,
  Luggage,
  X,
  Compass,
  Check,
  ArrowRight,
} from 'lucide-react';

interface PracticalTab {
  id: string;
  label: string;
  icon: any;
  title: string;
  summary: string;
  bullets: {
    heading: string;
    text: string;
  }[];
  insiderTip: string;
}

const PRACTICAL_TABS: PracticalTab[] = [
  {
    id: 'visa',
    label: 'Visa & Entry',
    icon: FileText,
    title: 'Electronic Travel Authorization (ETA)',
    summary: 'Entering Sri Lanka is straightforward and hassle-free for tourists from most countries.',
    bullets: [
      {
        heading: 'Online ETA System',
        text: 'Apply easily online at the official portal prior to arrival for a standard 30-day tourist entry (extendable up to 180 days in Colombo).',
      },
      {
        heading: 'Passport Validity',
        text: 'Ensure your passport is valid for at least 6 months from your scheduled date of entry.',
      },
      {
        heading: 'On-Arrival Facility',
        text: 'While on-arrival visas are available at Bandaranaike International Airport (CMB), pre-arranging online avoids queue times.',
      },
    ],
    insiderTip: 'Save a digital screenshot of your approved ETA barcode on your phone for lightning-fast immigration clearance.',
  },
  {
    id: 'transport',
    label: 'Getting Around',
    icon: Car,
    title: 'Trains, Chauffeurs & Tuk-Tuks',
    summary: 'Travel in Sri Lanka is an adventure in itself, with some of the most scenic train rides on planet earth.',
    bullets: [
      {
        heading: 'Private Chauffeur-Guide',
        text: 'The most popular and stress-free option. An English-speaking licensed chauffeur with an air-conditioned car is fully arranged with your custom journey, including vehicle fuel and insurance.',
      },
      {
        heading: 'The Iconic Scenic Rail',
        text: 'The Kandy → Nanu Oya (Nuwara Eliya) → Ella line is world famous. Book 1st class observation or 2nd class reserved seats 30 days ahead.',
      },
      {
        heading: 'Tuk-Tuks & Ride Apps',
        text: 'In Colombo and Kandy, use the "PickMe" or "Uber" apps for metered, transparent rates. In beach towns, agree on a fare beforehand.',
      },
    ],
    insiderTip: 'Book 2nd Class unreserved or reserved window seats on the train for the ability to open the window and take unobstructed photos.',
  },
  {
    id: 'seasons',
    label: 'Best Time to Visit',
    icon: Sun,
    title: 'The Dual Monsoon Secret',
    summary: 'Sri Lanka is a year-round destination because when it rains on one coast, the other is drenched in golden sunshine.',
    bullets: [
      {
        heading: 'South & West Coasts (Galle, Mirissa, Colombo)',
        text: 'Prime sunshine and calm seas run from November to April. Peak surf and whale watching.',
      },
      {
        heading: 'East Coast & North (Arugam Bay, Trincomalee, Jaffna)',
        text: 'Prime beach weather, flat turquoise bays, and world-class point breaks run from May to September.',
      },
      {
        heading: 'Cultural Triangle & Highlands',
        text: 'Accessible year-round; Nuwara Eliya is cool and crisp (14°C–20°C), while Sigiriya enjoys warm tropical breezes.',
      },
    ],
    insiderTip: 'No matter which month you land in Sri Lanka, there is always a sun-drenched beach with flat turquoise water waiting for you.',
  },
  {
    id: 'money',
    label: 'Currency & Money',
    icon: Coins,
    title: 'Sri Lankan Rupee (LKR) & Cards',
    summary: 'A very affordable destination offering exceptional luxury value for foreign currencies.',
    bullets: [
      {
        heading: 'Currency & ATMs',
        text: 'The currency is LKR. International Visa and Mastercard are accepted at all major ATMs (Commercial Bank, Sampath Bank).',
      },
      {
        heading: 'Card Acceptance',
        text: 'Hotels, supermarkets, and upscale restaurants take credit cards. Keep cash in small denominations for village fruit stalls and tuk-tuks.',
      },
      {
        heading: 'Tipping Etiquette',
        text: 'A 10% service charge is often included in restaurant bills. A modest extra tip for great hotel staff or safari trackers is deeply appreciated.',
      },
    ],
    insiderTip: 'Exchange a small amount at Colombo airport on arrival, then use ATMs in town for the best live mid-market exchange rates.',
  },
  {
    id: 'safety',
    label: 'Safety & Health',
    icon: ShieldCheck,
    title: 'One of Asia’s Most Welcoming Nations',
    summary: 'Sri Lanka ranks among the friendliest and safest travel destinations in the world for solo travelers, couples, and families.',
    bullets: [
      {
        heading: 'Warm Hospitality',
        text: 'Sri Lankans are famously welcoming. Scams are rare and generally limited to minor tourist tuk-tuk haggling.',
      },
      {
        heading: 'Water & Hygiene',
        text: 'Drink filtered or bottled water. Cooked street food from busy stalls with high turnover is delicious, fresh, and safe.',
      },
      {
        heading: 'Medical Care',
        text: 'Excellent private hospitals operate in Colombo (Asiri, Lanka Hospitals), with reliable clinics in tourist hubs.',
      },
    ],
    insiderTip: 'Buy a local tourist SIM card at the airport (Dialog or Mobitel) with generous high-speed 4G/5G data across the entire island.',
  },
  {
    id: 'stays',
    label: 'Stays & Living',
    icon: Home,
    title: 'From Geoffrey Bawa Villas to Treehouses',
    summary: 'Experience tropical modernism, colonial tea bungalows, and barefoot luxury eco-lodges.',
    bullets: [
      {
        heading: 'Tropical Modernism',
        text: 'Stay in architectural masterpieces designed by legendary architect Geoffrey Bawa, blurring the boundary between indoors and lush nature.',
      },
      {
        heading: 'Colonial Tea Bungalows',
        text: 'In the highlands, sleep in restored planters’ estates with open hearths, brass fittings, and private butler service.',
      },
      {
        heading: 'Beach Eco-Lodges',
        text: 'Glamping tents beside Yala national park, and surf villas nestled inside coconut groves footsteps from the ocean.',
      },
    ],
    insiderTip: 'Split your stays between a heritage tea estate, a wildlife eco-camp, and a boutique coastal retreat for the complete island spectrum.',
  },
  {
    id: 'packing',
    label: 'Packing & Etiquette',
    icon: Luggage,
    title: 'Temple Decorum & Island Essentials',
    summary: 'Pack light, breathable linens and keep respectful clothing handy for sacred Buddhist and Hindu temples.',
    bullets: [
      {
        heading: 'Temple Dress Code',
        text: 'When entering temples, cover shoulders and knees. White or light-colored clothing is respected. Remove shoes and hats before entering.',
      },
      {
        heading: 'Power & Plugs',
        text: 'Sri Lanka uses Type D and G (UK 3-pin) plugs at 230V. Most modern hotels provide universal sockets.',
      },
      {
        heading: 'Clothing Layering',
        text: 'Pack lightweight swimwear and linen for coastal areas, plus a cozy sweater or light fleece for Nuwara Eliya and early morning safaris.',
      },
    ],
    insiderTip: 'Never pose for a photo with your back turned directly to a Buddha statue, as this is considered culturally disrespectful.',
  },
];

interface PracticalTravelConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PracticalTravelConcierge: React.FC<PracticalTravelConciergeProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<string>('visa');

  if (!isOpen) return null;

  const current = PRACTICAL_TABS.find((t) => t.id === activeTab) || PRACTICAL_TABS[0];

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#091b2b] rounded-3xl max-w-4xl w-full border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-700/80 flex items-center justify-between bg-[#071725]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-archivo font-extrabold text-white">
                Practical Travel Concierge
              </h3>
              <p className="text-xs text-slate-400">
                Essential intelligence for entering, navigating, and savoring Sri Lanka
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Tabs & Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Topic Selector */}
          <div data-lenis-prevent className="w-full md:w-56 bg-[#061421] p-3 border-r border-slate-700/60 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
            {PRACTICAL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-[#0e2538] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content Pane */}
          <div data-lenis-prevent className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                {current.label}
              </span>
              <h4 className="text-2xl font-archivo font-extrabold text-white mt-1">
                {current.title}
              </h4>
              <p className="text-sm text-slate-300 mt-2 font-light">
                {current.summary}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3">
              {current.bullets.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e2538] p-4 rounded-xl border border-slate-700/60"
                >
                  <strong className="text-sm text-cyan-300 block mb-1">
                    {b.heading}
                  </strong>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Insider Tip Callout */}
            <div className="bg-[#122e44] p-4 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
              <span className="text-cyan-400 text-base">💡</span>
              <div>
                <strong className="text-cyan-300 block mb-0.5">Local Insider Tip:</strong>
                <span>{current.insiderTip}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Need customized arrangements or a verified chauffeur-guide?
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Inquire Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
