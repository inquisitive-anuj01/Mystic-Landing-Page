import React, { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';

// --- 1. DUMMY DATA ---
const dummyHealers = [
  { id: 1, firstName: "Aarav", lastName: "Sharma", title: "Reiki Healing", price: "2500", time: "60 Mins", rating: "4.9", exp: "5", languages: ["HIN", "ENG"], tags: ["Stress", "Anxiety", "Chakra"] },
  { id: 2, firstName: "Priya", lastName: "Patel", title: "Tarot Reading", price: "1500", time: "45 Mins", rating: "4.8", exp: "3", languages: ["ENG", "GUJ"], tags: ["Future", "Career", "Love"] },
  { id: 3, firstName: "Sarah", lastName: "Jenkins", title: "Crystal Healing", price: "3000", time: "90 Mins", rating: "5.0", exp: "8", languages: ["ENG"], tags: ["Balancing", "Energy", "Focus"] },
  { id: 4, firstName: "Rahul", lastName: "Verma", title: "Pranic Healing", price: "2000", time: "60 Mins", rating: "4.7", exp: "4", languages: ["HIN", "ENG", "PUN"], tags: ["Aura", "Cleansing", "Health"] },
  { id: 5, firstName: "Emily", lastName: "Wong", title: "Sound Therapy", price: "3500", time: "60 Mins", rating: "4.9", exp: "6", languages: ["ENG", "CHI"], tags: ["Vibration", "Relax", "Sleep"] },
  { id: 6, firstName: "Vikram", lastName: "Singh", title: "Vedic Astrology", price: "2200", time: "30 Mins", rating: "4.6", exp: "10", languages: ["HIN", "SAN"], tags: ["Planets", "Dasha", "Gemstones"] },
  { id: 7, firstName: "Anita", lastName: "Desai", title: "Hypnotherapy", price: "4000", time: "90 Mins", rating: "5.0", exp: "12", languages: ["ENG", "HIN"], tags: ["Trauma", "Habits", "Mind"] },
  { id: 8, firstName: "John", lastName: "Doe", title: "Life Coaching", price: "5000", time: "60 Mins", rating: "4.8", exp: "7", languages: ["ENG"], tags: ["Goals", "Success", "Motivation"] },
  { id: 9, firstName: "Meera", lastName: "Iyer", title: "Yoga Therapy", price: "1200", time: "60 Mins", rating: "4.9", exp: "4", languages: ["ENG", "TAM"], tags: ["Body", "Flexibility", "Peace"] },
  { id: 10, firstName: "David", lastName: "Smith", title: "Meditation", price: "1000", time: "45 Mins", rating: "4.7", exp: "2", languages: ["ENG"], tags: ["Mindfulness", "Zen", "Calm"] },
  { id: 11, firstName: "Sonia", lastName: "Kapoor", title: "Numerology", price: "1800", time: "40 Mins", rating: "4.5", exp: "5", languages: ["HIN", "ENG"], tags: ["Numbers", "Destiny", "Name"] },
  { id: 12, firstName: "Arjun", lastName: "Reddy", title: "Ayurveda", price: "2800", time: "60 Mins", rating: "4.8", exp: "9", languages: ["TEL", "ENG"], tags: ["Dosha", "Herbs", "Diet"] },
];

// --- 2. SINGLE HEALER CARD COMPONENT ---
const HealerCard = ({ item }) => {
  const currencySymbol = '₹';

  return (
    <div className="group relative bg-[#fff9f0] border-2 border-black rounded-[25px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-purple-800 flex flex-col h-full cursor-pointer">
      
      {/* HEADER VISUAL SECTION */}
      <div className="relative h-[220px] w-full p-5 flex flex-col justify-end overflow-hidden">
        {/* Layer 1: Fallback Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 z-0"></div>
        {/* Layer 2: Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>

        {/* Layer 3: Content */}
        <div className="relative z-20 w-[70%] flex flex-col gap-1 mt-4">
          <span className="text-[0.6rem] text-gray-100 uppercase tracking-widest font-semibold">
            UNLOCK THE POWER OF
          </span>
          <h3 className="text-[1.1rem] font-extrabold text-white uppercase leading-tight drop-shadow-md">
            {item.title}
          </h3>
          <div className="mt-1">
            <h4 className="text-[1.2rem] font-bold text-white uppercase leading-tight line-clamp-2">
              {item.firstName} {item.lastName}
            </h4>
            <p className="text-[0.6rem] text-white/90 uppercase font-semibold mt-0.5">
              CERTIFIED {item.title} HEALER
            </p>
          </div>
          <button className="mt-2 flex items-center gap-1 w-fit px-3 py-1.5 rounded-full bg-white/20 border border-white/70 text-white text-[0.65rem] font-bold uppercase backdrop-blur-sm transition-all hover:bg-white hover:text-purple-900 hover:scale-105">
            Book A Session <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-white border-y-2 border-black px-3 py-2 flex justify-between items-center text-[0.7rem] font-extrabold text-black uppercase tracking-wide">
        <span>EXP: {item.exp} YEARS</span>
        <span className="text-gray-300">|</span>
        <span className="truncate max-w-[80px]" title={item.languages.join(' | ')}>
          {item.languages.join(' | ')}
        </span>
        <span className="bg-[#53155b] text-white px-2 py-0.5 rounded flex items-center gap-1">
          <Star size={10} fill="white" /> {item.rating}
        </span>
      </div>

      {/* FOOTER BODY */}
      <div className="bg-[#fffbf5] p-4 flex-grow flex flex-col justify-between rounded-b-[23px]">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="border border-black rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold text-black uppercase bg-transparent">
              {tag}
            </span>
          ))}
        </div>
        <div className="relative flex justify-between items-center">
          <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-black"></div>
          <div className="flex-1 flex flex-col">
            <p className="text-[0.6rem] font-extrabold text-black uppercase">Duration</p>
            <p className="text-[1.3rem] font-light text-black leading-none">{item.time}</p>
          </div>
          <div className="flex-1 flex flex-col items-end text-right">
            <p className="text-[0.6rem] font-extrabold text-black uppercase">Price</p>
            <p className="text-[1.3rem] font-light text-black leading-none">
              {currencySymbol}{item.price} <span className="text-[0.65rem] font-semibold">ONWARDS</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- 3. MAIN LISTING COMPONENT ---
function HealerList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default desktop

  // Handle Resize logic for Pagination (2 for Mobile, 6 for Desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(6);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(dummyHealers.length / itemsPerPage);

  // Ensure current page is valid on resize
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [itemsPerPage, totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyHealers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='min-h-screen bg-gray-100 pt-16 pb-20 font-sans'>
      
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- HEADING SECTION --- */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-3xl font-light text-gray-800 uppercase tracking-widest">
             Meet Your Guiding Lights
          </h2>
          <div className="w-24 h-1 bg-[#b09bd8] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* HEALER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {currentItems.map((healer) => (
            <HealerCard key={healer.id} item={healer} />
          ))}
        </div>

        {/* --- CUSTOM PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav>
              <ul className="flex list-none rounded-md -space-x-px shadow-sm">
                
                {/* PREVIOUS BUTTON */}
                <li>
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`
                      relative block px-4 py-3 border text-sm font-medium rounded-l-md transition-colors duration-150
                      ${currentPage === 1 
                        ? 'bg-white text-gray-300 border-gray-300 cursor-not-allowed' 
                        : 'bg-white text-[#b09bd8] border-gray-300 hover:bg-[#b09bd8] hover:text-white hover:z-10'}
                    `}
                  >
                    <span>&larr;</span>
                  </button>
                </li>

                {/* NUMBERED BUTTONS */}
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <li key={pageNum}>
                      <button 
                        onClick={() => paginate(pageNum)}
                        className={`
                          relative block px-5 py-3 border text-sm font-medium transition-colors duration-150
                          ${isActive 
                            ? 'bg-[#b09bd8] text-white border-[#b09bd8] z-20' 
                            : 'bg-white text-[#b09bd8] border-gray-300 hover:bg-[#b09bd8] hover:text-white hover:z-10'}
                        `}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}

                {/* NEXT BUTTON */}
                <li>
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`
                      relative block px-4 py-3 border text-sm font-medium rounded-r-md transition-colors duration-150
                      ${currentPage === totalPages 
                        ? 'bg-white text-gray-300 border-gray-300 cursor-not-allowed' 
                        : 'bg-white text-[#b09bd8] border-gray-300 hover:bg-[#b09bd8] hover:text-white hover:z-10'}
                    `}
                  >
                    <span>&rarr;</span>
                  </button>
                </li>

              </ul>
            </nav>
          </div>
        )}

      </div>
    </div>
  )
}

export default HealerList;