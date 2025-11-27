import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const BG_IMAGE = "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1764226820/mystic-landing-bg_iccxpc.jpg";
const LOGO_URL = "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1757405404/Untitled_design_58_udmbsi.png";

// Mock Data for Modalities (12 items)
const MODALITIES_DATA = [
  { id: 1, title: "Pranic Healing", image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "Reiki Healing", image: "https://images.unsplash.com/photo-1515023115689-589c33041697?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "Chakra Healing", image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "Tarot Reading", image: "https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&q=80&w=600" },
  { id: 5, title: "Akashic Reading", image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600" },
  { id: 6, title: "Hypnotherapy", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600" },
  { id: 7, title: "Animal Communication", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600" },
  { id: 8, title: "Neuro Linguistic Programming", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600" },
  { id: 9, title: "Numerology", image: "https://images.unsplash.com/photo-1544367563-12123d8975bd?auto=format&fit=crop&q=80&w=600" },
  
];

// --- STATS COMPONENT ---
function StatsSection() {
  const [counts, setCounts] = useState({ healers: 0, sessions: 0, customers: 0 });
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      // Animation helper
      const animateValue = (key, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCounts(prev => ({
            ...prev,
            [key]: Math.floor(progress * (end - start) + start)
          }));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      animateValue("healers", 0, 20, 1500);
      animateValue("sessions", 0, 200, 2000);
      animateValue("customers", 0, 800, 2500);
    }
  }, [hasStarted]);

  return (
    <div ref={sectionRef} className="py-4  flex flex-col items-center justify-center w-full  border-b border-gray-300">
      <div className="flex flex-nowrap justify-center items-center gap-4 md:gap-16 text-center w-full px-2">
        
        {/* Stat Item 1 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-xl md:text-5xl font-bold text-[var(--purple)] whitespace-nowrap">
            {counts.healers}+
          </span>
          <span className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-[10px] md:text-sm">
            Healers
          </span>
        </div>

        {/* Separator - Hidden on very small screens if needed, but keeping generally */}
        <div className="h-8 md:h-16 w-[1px] bg-gray-300"></div>

        {/* Stat Item 2 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-xl md:text-5xl font-bold text-[var(--purple)] whitespace-nowrap">
            {counts.sessions}+
          </span>
          <span className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-[10px] md:text-sm">
            Sessions
          </span>
        </div>

        <div className="h-8 md:h-16 w-[1px] bg-gray-300"></div>

        {/* Stat Item 3 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-xl md:text-5xl font-bold text-[var(--purple)] whitespace-nowrap">
            {counts.customers}+
          </span>
          <span className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-[10px] md:text-sm">
            Happy Clients
          </span>
        </div>

      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); 

  // Handle Resize for Responsive Pagination
  useEffect(() => {
    const handleResize = () => {
      // Mobile breakpoint
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(MODALITIES_DATA.length / itemsPerPage);

  // Ensure currentPage is valid if window is resized
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentModalities = MODALITIES_DATA.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle scroll event to toggle header styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-[full] relative font-montserrat text-slate-800 bg-white">
      {/* Injecting Font and Custom CSS Variables */}
    

      {/* ----------------------------
        HEADER (Sticky & Glass Effect) 
        ----------------------------
      */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-md py-2' 
            : 'bg-transparent py-6'
          }
        `}
      >
        <div className="w-full flex justify-around items-center">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
             <img 
               src={LOGO_URL} 
               alt="The Mystic Healers" 
               className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}
             />
          </div>

          {/* Book Now Button */}
          <div>
            <button 
              className="btn-purple text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition-transform active:scale-95 uppercase tracking-wide text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------
        HERO SECTION 
        ----------------------------
      */}
      <div className="relative w-full h-[40vh]">
        {/* Background Image - Half Screen */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        >
           {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-white text-lg md:text-xl font-medium tracking-wider uppercase drop-shadow-md">
              Access The World’s Finest Holistic Healers Online
            </h2>
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-4 font-light drop-shadow-md">
              Find holistic spiritual practitioners with The Mystic Healers, and explore the power of spirituality and healing - all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------
        MODALITIES SECTION (Paginated)
        ----------------------------
      */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-3xl font-normal text-gray-800">
             With Mystic Healers you get modalities 
          </h2>
          <div className="w-24 h-1 bg-[var(--purple)] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {currentModalities.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-40 md:h-42 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-200"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>

              {/* Overlay - Darkens on hover */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/60"></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                
                {/* Title - Moves up on hover */}
                <h3 className="text-white text-base md:text-xl font-bold transition-transform duration-300 transform group-hover:-translate-y-4 drop-shadow-md">
                  {item.title}
                </h3>

                {/* Read More Button - Appears on hover */}
                <button className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white border border-white px-3 py-1 rounded-full text-xs font-medium hover:bg-white hover:text-black mt-1">
                  Read More &gt;
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Numbered Pagination Controls */}
        <div className="flex justify-center">
          <nav aria-label="Page navigation">
            <ul className="flex list-none rounded-sm">
              
              {/* Previous Button */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-l-md"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                   <span>&larr;</span>
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, idx) => {
                 const pageNum = idx + 1;
                 return (
                   <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                     <button 
                        className="page-link" 
                        onClick={() => paginate(pageNum)}
                     >
                        {pageNum}
                     </button>
                   </li>
                 );
              })}

              {/* Next Button */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-r-md"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                   <span>&rarr;</span>
                </button>
              </li>

            </ul>
          </nav>
        </div>

      </section>
      <StatsSection />

    </div>
  );
}