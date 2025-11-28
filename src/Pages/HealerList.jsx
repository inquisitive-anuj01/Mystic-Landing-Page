import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// --- 1. UPDATED DUMMY DATA ---
// Added experience and languages to match your real data requirements
const dummyHealers = [
  {
    id: 1,
    firstName: "Aarav",
    lastName: "Sharma",
    title: "Reiki Healing",
    price: "2500",
    rating: "4.9",
    experience: "8+ Years",
    languages: ["ENG", "HIN"],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    tags: ["Stress Relief", "Anxiety", "Chakra"],
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Patel",
    title: "Tarot Reading",
    price: "1500",
    rating: "4.8",
    experience: "5 Years",
    languages: ["ENG", "GUJ"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    tags: ["Future", "Career", "Love"],
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Jenkins",
    title: "Crystal Healing",
    price: "3000",
    rating: "5.0",
    experience: "12 Years",
    languages: ["ENG"],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    tags: ["Balancing", "Energy Clearing"],
  },
  {
    id: 4,
    firstName: "Rahul",
    lastName: "Verma",
    title: "Pranic Healing",
    price: "2000",
    rating: "4.7",
    experience: "6 Years",
    languages: ["HIN", "ENG", "PUN"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    tags: ["Aura Cleanse", "Health"],
  },
  {
    id: 5,
    firstName: "Emily",
    lastName: "Wong",
    title: "Sound Therapy",
    price: "3500",
    rating: "4.9",
    experience: "9 Years",
    languages: ["ENG", "MAN"],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    tags: ["Vibration", "Deep Sleep"],
  },
  {
    id: 6,
    firstName: "Vikram",
    lastName: "Singh",
    title: "Vedic Astrology",
    price: "2200",
    rating: "4.6",
    experience: "15+ Years",
    languages: ["HIN", "ENG"],
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    tags: ["Planetary", "Gemstones"],
  },
  {
    id: 7,
    firstName: "Anita",
    lastName: "Desai",
    title: "Hypnotherapy",
    price: "4000",
    rating: "5.0",
    experience: "10 Years",
    languages: ["ENG", "HIN", "MAR"],
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
    tags: ["Trauma", "Mindset"],
  },
  {
    id: 8,
    firstName: "John",
    lastName: "Doe",
    title: "Life Coaching",
    price: "5000",
    rating: "4.8",
    experience: "7 Years",
    languages: ["ENG"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    tags: ["Goals", "Success Mindset"],
  },
];

// --- 2. HEALER CARD COMPONENT ---
const HealerCard = ({ item, isMobile }) => {
  return (
    <div
      className={`group relative h-full w-full flex flex-col rounded-[20px] p-2 shadow-sm 
      `}
    >
      {/* 1. IMAGE CONTAINER */}
      <div
        className={`relative w-full flex-1 overflow-hidden mb-2 
          rounded-2xl 
        `}
      >
        <img
          src={item.image}
          alt={item.firstName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* BOTTOM DARK GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* TEXT OVERLAY */}
        <div className="absolute bottom-3 left-0 w-full text-center px-2">
          <h3 className="text-white text-lg md:text-xl font-medium tracking-wide">
            {item.firstName} {item.lastName}
          </h3>
          <span className="text-gray-200 text-[10px] md:text-xs uppercase tracking-wider font-semibold">
            {item.title}
          </span>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <hr className="border-t border-gray-300 mx-2 mb-2" />

      {/* --- NEW SECTION: MODALITY PILLS --- */}
      <div className={`flex flex-wrap gap-1 mb-2 ${isMobile ? "px-1" : "px-4"}`}>
        {item.tags.slice(0, 3).map((tag, idx) => (
          <span 
            key={idx} 
            className="px-2 py-0.5 text-[9px] md:text-[10px] rounded-md bg-white/60 text-gray-600 border border-gray-100 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* --- NEW SECTION: INFO ROW (Exp | Lang | Rating) --- */}
      <div className={`flex items-center text-[10px] md:text-[11px] text-gray-500 font-medium mb-3 ${isMobile ? "px-1" : "px-4"}`}>
        {/* Experience */}
        <span className="whitespace-nowrap">Exp: {item.experience}</span>
        
        <span className="mx-2 text-gray-300">|</span>
        
        {/* Languages */}
        <span className="uppercase truncate max-w-[60px]" title={item.languages.join(", ")}>
            {item.languages.join(" | ")}
        </span>

        <span className="mx-2 text-gray-300">|</span>

        {/* Rating */}
        <div className="flex items-center text-amber-500">
            <span className="mr-0.5 font-bold text-gray-700">{item.rating}</span>
            <Star size={10} fill="currentColor" />
        </div>
      </div>

      {/* 2. BOTTOM INFO (Price & Button) */}
      <div
        className={`flex items-center justify-between mt-auto ${
          isMobile ? "px-1 pb-1" : "px-4 pb-2"
        }`}
      >
        {/* Price Section */}
        <div className="flex flex-col">
          <span className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wide">
            Starting from
          </span>
          <span className="text-base md:text-lg font-bold text-gray-800">
            ₹{item.price}
          </span>
        </div>

        {/* Action Button */}
        <button
          className="px-4 py-1.5 md:px-5 md:py-1.5 rounded-full text-white text-xs md:text-sm font-medium shadow-md hover:shadow-lg hover:opacity-95 transform active:scale-95 transition-all
          bg-gradient-to-r from-[#b09bd8] to-[#6f42c1]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
function HealerList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPageDesktop = 4;
  const scrollStep = 2; // SCROLL BY 2 ITEMS

  const maxIndex = dummyHealers.length - itemsPerPageDesktop;

  // Desktop Navigation Handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - scrollStep, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + scrollStep, maxIndex));
  };

  const navButtonStyle = `absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100/90 backdrop-blur-sm border border-gray-200 shadow-sm text-gray-600 transition-all active:scale-95`;

  return (
    <div className="mt-10 pb-12 bg-white min-h-[500px] relative border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-24 max-w-[1400px] relative">
        {/* HEADING */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-4xl font-normal text-gray-800 uppercase tracking-wider">
            Meet Your Guiding Lights
          </h2>
          {/* Subheading Added */}
          <p className="text-gray-500 text-sm md:text-lg mt-2 font-light">
            Connect with certified healers worldwide
          </p>
          <div className="w-16 md:w-24 h-1 bg-[#b09bd8] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- DESKTOP SLIDER CONTROLS --- */}
        <div className="hidden md:block">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`${navButtonStyle} left-6 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`${navButtonStyle} right-6 ${
              currentIndex >= maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* --- CAROUSEL TRACK --- */}
        <div className="relative overflow-hidden w-full">
          {/* DESKTOP VIEW */}
          {/* Increased height slightly to accommodate new info fields */}
          <div
            className="hidden md:flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerPageDesktop)
              }%)`,
            }}
          >
            {dummyHealers.map((healer) => (
              <div key={healer.id} className="w-1/4 shrink-0 px-4 h-[440px] mb-4">
                <HealerCard item={healer} isMobile={false} />
              </div>
            ))}
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 px-2 pb-6 scrollbar-hide">
            {dummyHealers.map((healer) => (
              <div
                key={healer.id}
                className="min-w-[75%] snap-center h-[380px]"
              >
                <HealerCard item={healer} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default HealerList;