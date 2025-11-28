import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";


const reviewsOriginal = [
  {
    id: 1,
    name: "Suchismita Biswas",
    profession: "Housewife",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", 

    color: "bg-[#6f42c1]", 
    content:
      "I never thought healing could make such a difference. As a housewife, I often ignored my own emotions, but after taking some healing session, I felt a deep sense of calm and clarity. It’s helped me be more present, more patient, and emotionally stronger in my daily life.",
  },
  {
    id: 2,
    name: "Ranjini Choudhury",
    profession: "Teacher",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    // Using --bs-blue: #0d6efd
    color: "bg-[#0d6efd]", 
    content:
      "Life as a teacher can get overwhelming, and I didn’t realize how much I was bottling up. The healing session helped me release so much emotional stress. I came out of it feeling light, balanced, and far more connected to myself. It’s been a beautiful shift.",
  },
  {
    id: 3,
    name: "Ashna Yadav",
    profession: "International Student",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    // Using --bs-indigo: #6610f2
    color: "bg-[#6610f2]", 
    content:
      "Moving abroad brought so much uncertainty and anxiety into my life. I booked a session out of curiosity, but it turned out to be exactly what I needed. It gave me emotional grounding and helped me deal with the stress in a much healthier way. Truly grateful!",
  },
];

// Duplicate data to create the seamless "circular" buffer
const reviewsData = [...reviewsOriginal, ...reviewsOriginal];

const ReviewCard = ({ review }) => {
  return (
    <div className="h-full px-3 md:px-4">
      <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col p-6 border border-gray-100 relative group">
        
        {/* Quote Icon Background */}
        <Quote className="absolute top-4 right-4 text-gray-50 transform -scale-x-100 group-hover:text-gray-100 transition-colors" size={50} />

        {/* 1. HEADER: Image & Name */}
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

        {/* 2. COLORED DIVIDER LINE */}
        <div className={`w-full h-1 ${review.color} mt-5 mb-5 rounded-full opacity-80`} />

        {/* 3. CONTENT */}
        <div className="relative z-10 flex-grow">
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
  const [isHovered, setIsHovered] = useState(false);
  
  const totalItems = reviewsOriginal.length;

  // --- INFINITE LOOP LOGIC ---
  useEffect(() => {
    if (isHovered) return;

    const slideInterval = setInterval(() => {
        handleNext();
    }, 4000); 

    return () => clearInterval(slideInterval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems) {
      setIsTransitioning(false); 
      setCurrentIndex(0);        
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
        requestAnimationFrame(() => {
            setTimeout(() => setIsTransitioning(true), 50);
        });
    }
  }, [isTransitioning]);


  return (
    // Matching the wrapper style from your snippet
    <div className=" mt-10  bg-white min-h-[500px] relative mb-10 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-24 max-w-[1400px] relative">

        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-4xl font-normal text-gray-800 uppercase tracking-wider">
            Real Stories, Real Transformations
          </h2>
          <p className="text-gray-500 text-sm md:text-lg mt-2 font-light">
            Discover how our platform transformed lives through healing
          </p>
          <div className="w-16 md:w-24 h-1 bg-[#b09bd8] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- CAROUSEL WINDOW --- */}
        <div 
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="overflow-hidden py-4 -mx-4 px-4">
                <div 
                    className="flex"
                    style={{ 
                        // Desktop: 33.33%, Tablet: 50%, Mobile: 100%
                        transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)`,
                        transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {reviewsData.map((review, index) => (
                        <div 
                            key={`${review.id}-${index}`} 
                            className="w-full md:w-1/2 lg:w-1/3 shrink-0"
                        >
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            </div>

            

        </div>
      </div>
    </div>
  );
}

export default Reviews;