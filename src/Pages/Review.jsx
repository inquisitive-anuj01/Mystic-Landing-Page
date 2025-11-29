import React, { useState, useEffect, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviewsOriginal = [
  {
    id: 1,
    name: "Suchismita Biswas",
    profession: "Housewife",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    color: "bg-[#6f42c1]",
    content:
      "I never thought healing could make such a difference. As a housewife, I often ignored my own emotions, but after taking some healing session, I felt a deep sense of calm and clarity. It’s helped me be more present, more patient, and emotionally stronger in my daily life.",
  },
  {
    id: 2,
    name: "Ranjini Choudhury",
    profession: "Teacher",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    color: "bg-[#0d6efd]",
    content:
      "Life as a teacher can get overwhelming, and I didn’t realize how much I was bottling up. The healing session helped me release so much emotional stress. I came out of it feeling light, balanced, and far more connected to myself. It’s been a beautiful shift.",
  },
  {
    id: 3,
    name: "Ashna Yadav",
    profession: "International Student",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    color: "bg-[#6610f2]",
    content:
      "Moving abroad brought so much uncertainty and anxiety into my life. I booked a session out of curiosity, but it turned out to be exactly what I needed. It gave me emotional grounding and helped me deal with the stress in a much healthier way. Truly grateful!",
  },
];

const reviewsData = [...reviewsOriginal, ...reviewsOriginal];

const ReviewCard = ({ review }) => {
  return (
    <div className="h-full px-2 md:px-4">
      <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col p-6 border border-gray-100 relative group">
        <Quote
          className="absolute top-4 right-4 text-gray-50 transform -scale-x-100 group-hover:text-gray-100 transition-colors"
          size={50}
        />
        {/* Header */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-50 shrink-0 shadow-sm">
            <img
              src={review.image}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
              {review.name}
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
              {review.profession}
            </p>
          </div>
        </div>
        {/* Divider */}
        <div
          className={`w-full h-1 ${review.color} mt-5 mb-5 rounded-full opacity-80`}
        />
        {/* Content */}
        <div className="relative z-10 grow">
          <p className="text-gray-600 text-sm leading-relaxed font-light italic">
            "{review.content}"
          </p>
        </div>
      </div>
    </div>
  );
};

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // To handle the "5 seconds inactivity" logic
  const autoPlayTimeoutRef = useRef(null);

  // Touch handling for Mobile Swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalItems = reviewsOriginal.length;

  // 1. DETERMINE ITEMS PER SCREEN (Responsive)
  // Mobile = 1 item, Tablet = 2 items, Desktop = 3 items
  const getItemsPerScreen = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  // Force a re-render on resize to adjust math
  const [itemsPerScreen, setItemsPerScreen] = useState(3);
  useEffect(() => {
    const handleResize = () => setItemsPerScreen(getItemsPerScreen());
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Moves to next slide
  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Moves to prev slide
  const handlePrev = () => {
    setIsTransitioning(true);

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalItems);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(totalItems - 1);
        });
      });
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - totalItems);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setTimeout(() => setIsTransitioning(true), 50);
      });
    }
  }, [isTransitioning]);

  // 3. AUTO SCROLL & INACTIVITY TIMER
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 4000); // Normal scroll speed
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]); // Dependencies ensure it resets on manual interaction

  // Reset the 5-second inactivity timer
  const resetInactivityTimer = () => {
    setIsAutoPlaying(false); // Stop auto-scroll immediately on interaction

    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);

    // Wait 5 seconds, then restart auto-play
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  // 4. TOUCH / SWIPE HANDLERS (Manual Scroll for Mobile)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    resetInactivityTimer();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="mt-10 bg-white min-h-[500px] relative mb-10 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-24 max-w-[1400px] relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-4xl font-normal text-gray-800 uppercase tracking-wider">
            Real Stories, Real Transformations
          </h2>
          <p className="text-gray-500 text-sm md:text-lg mt-2 font-light">
            Discover how our platform transformed lives through healing
          </p>
          <div className="w-16 md:w-24 h-1 bg-[#b09bd8] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- DESKTOP NAV BUTTONS (Manual Control) --- */}
        <div className="hidden md:block">
          <button
            onClick={() => {
              handlePrev();
              resetInactivityTimer();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-[#6f42c1] transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => {
              handleNext();
              resetInactivityTimer();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-[#6f42c1] transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* --- CAROUSEL WINDOW --- */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => resetInactivityTimer()}
          // Touch events for Mobile Swipe
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden py-8 -mx-4 px-4">
            <div
              className="flex"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerScreen)
                }%)`,
                transition: isTransitioning
                  ? "transform 700ms ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {reviewsData.map((review, index) => {
                // Logic to determine if this specific card is the "Active" one visually
                // We check the modulo to map clones to originals
                const isActive =
                  index % totalItems === currentIndex % totalItems;

                return (
                  <div
                    key={`${review.id}-${index}`}
                    className={`
                                    shrink-0 transition-all duration-500
                                    ${
                                      itemsPerScreen === 1
                                        ? "w-full"
                                        : itemsPerScreen === 2
                                        ? "w-1/2"
                                        : "w-1/3"
                                    }
                                    
                                    
                                    ${
                                      itemsPerScreen === 1 && !isActive
                                        ? "opacity-50 scale-90"
                                        : "opacity-100 scale-100"
                                    }
                                `}
                  >
                    <ReviewCard review={review} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Reviews;
