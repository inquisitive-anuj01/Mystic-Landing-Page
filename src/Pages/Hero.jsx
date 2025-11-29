import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const BG_IMAGE =
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1764226820/mystic-landing-bg_iccxpc.jpg";
const LOGO_URL =
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1757405404/Untitled_design_58_udmbsi.png";

const MODALITIES_DATA = [
  {
    id: 1,
    title: "Pranic Healing",
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Reiki Healing",
    image:
      "https://images.unsplash.com/photo-1515023115689-589c33041697?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Chakra Healing",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Tarot Reading",
    image:
      "https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    title: "Akashic Reading",
    image:
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    title: "Hypnotherapy",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    title: "Animal Communication",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    title: "Neuro Linguistic Programming",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 9,
    title: "Numerology",
    image:
      "https://images.unsplash.com/photo-1544367563-12123d8975bd?auto=format&fit=crop&q=80&w=600",
  },
];

// --- STATS COMPONENT ---
function StatsSection() {
  const [counts, setCounts] = useState({
    healers: 0,
    sessions: 0,
    customers: 0,
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    let timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // RESET COUNTS
          setCounts({ healers: 0, sessions: 0, customers: 0 });

          // slight delay to avoid multiple triggers
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            startAnimation();
          }, 150);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const startAnimation = () => {
    const animateValue = (key, start, end, duration) => {
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        setCounts((prev) => ({
          ...prev,
          [key]: Math.floor(progress * (end - start) + start),
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
  };

  return (
    <div
      ref={sectionRef}
      className="py-4 flex flex-col items-center justify-center w-full border-b border-gray-300"
    >
      <div className="flex flex-nowrap justify-center items-center gap-4 md:gap-16 text-center w-full px-2">
        {/* HEALERS */}
        <div className="flex flex-col items-center min-w-20">
          <span className="text-xl md:text-2xl font-bold text-(--purple) whitespace-nowrap">
            {counts.healers}+
          </span>
          <span className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-[10px] md:text-sm">
            Healers
          </span>
        </div>

        <div className="h-6 md:h-16 w-px bg-gray-300"></div>

        {/* SESSIONS */}
        <div className="flex flex-col items-center min-w-20">
          <span className="text-xl md:text-2xl font-bold text-(--purple) whitespace-nowrap">
            {counts.sessions}+
          </span>
          <span className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-[10px] md:text-sm">
            Sessions
          </span>
        </div>

        <div className="h-6 md:h-16 w-px bg-gray-300"></div>

        {/* CUSTOMERS */}
        <div className="flex flex-col items-center min-w-20">
          <span className="text-xl md:text-2xl font-bold text-(--purple) whitespace-nowrap">
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

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Desktop configuration
  const itemsPerPageDesktop = 4;
  const maxIndexDesktop = MODALITIES_DATA.length - itemsPerPageDesktop;

  // Header Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop Navigation Handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPageDesktop, 0));
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + itemsPerPageDesktop, maxIndexDesktop)
    );
  };

  // --------- Mobile carousel animation logic ----------
  const mobileRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    let children = Array.from(el.querySelectorAll(".mobile-card"));
    let containerRect = null;

    function updateChildrenList() {
      children = Array.from(el.querySelectorAll(".mobile-card"));
    }

    function calcOnce() {
      containerRect = el.getBoundingClientRect();
    }

    function applyTransforms() {
      if (!containerRect) calcOnce();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenterX - containerCenterX);
        const norm = Math.min(dist / (containerRect.width / 2), 1);

        const opacity = 1;
        const scale = 1 - norm * 0.06;
        const rotation = (cardCenterX < containerCenterX ? -1 : 1) * norm * 6;
        const borderRadius = 12 + norm * 24; // more curved when farther
        const translateY = norm * 8; // subtle vertical parallax

        child.style.opacity = String(opacity);
        child.style.borderRadius = `${borderRadius}px`;
        child.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`;

        child.style.boxShadow =
          norm < 0.4
            ? "0 12px 30px rgba(15,23,42,0.12)"
            : "0 6px 18px rgba(15,23,42,0.06)";
      });
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        calcOnce();
        applyTransforms();
        rafRef.current = null;
      });
    }

    // initial apply
    calcOnce();
    updateChildrenList();
    applyTransforms();

    el.addEventListener("scroll", onScroll, { passive: true });

    // handle resize
    const ro = new ResizeObserver(() => {
      calcOnce();
      updateChildrenList();
      applyTransforms();
    });
    ro.observe(el);

    // also recalc on orientationchange, window resize
    window.addEventListener("resize", applyTransforms);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", applyTransforms);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="h-full relative text-slate-800">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full flex justify-around items-center">
          <div className="shrink-0 cursor-pointer">
            <img
              src={LOGO_URL}
              alt="The Mystic Healers"
              className={`transition-all duration-300 ${
                isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
              }`}
            />
          </div>
          <div>
            <button className="bg-(--purple) text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:opacity-90 transition-transform active:scale-95 uppercase tracking-wide text-xs md:text-sm">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[45vh]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-white text-lg md:text-2xl font-medium tracking-wider uppercase drop-shadow-md">
              Access The World’s Finest Holistic Healers Online
            </h2>
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-4 font-light drop-shadow-md">
              Find holistic spiritual practitioners with The Mystic Healers, and
              explore the power of spirituality and healing.
            </p>
          </div>
        </div>
      </div>

      {/* --- MODALITIES SECTION --- */}
      <section className="mt-12 w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-3xl font-normal text-gray-800">
            With Mystic Healers you get modalities
          </h2>
          <div className="w-24 h-1 bg-(--purple) mx-auto mt-4 rounded-full"></div>
        </div>

        {/* MOBILE: animated rounded/fade effect */}
        <div className="md:hidden w-full ">
          <div
            ref={mobileRef}
            className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory pr-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollPadding: "0 20px" }}
          >
            {MODALITIES_DATA.map((item) => (
              <div
                key={item.id}
                className="mobile-card min-w-[40%] snap-center shrink-0 transition-all duration-300"
                style={{
                  height: "128px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#e5e7eb",
                  position: "relative",
                  transitionProperty:
                    "transform, opacity, border-radius, box-shadow",
                  transitionTimingFunction: "cubic-bezier(.2,.9,.3,1)",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <h3 className="text-white text-xs font-bold drop-shadow-md">
                    {item.title}
                  </h3>
                  <div className="mt-1 w-8 h-0.5 bg-white/70 rounded-full opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block relative w-full px-24">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300 shadow-md text-gray-800 hover:bg-gray-300 transition-all active:scale-95 ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPageDesktop)
                }%)`,
              }}
            >
              {MODALITIES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / itemsPerPageDesktop}%` }}
                >
                  <div className="group relative h-42 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-200">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/60"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                      <h3 className="text-white text-xl font-bold transition-transform duration-300 transform group-hover:-translate-y-4 drop-shadow-md">
                        {item.title}
                      </h3>
                      <button className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white border border-white px-3 py-1 rounded-full text-xs font-medium hover:bg-white hover:text-black mt-1">
                        Read More &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndexDesktop}
            className={`absolute right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300 shadow-md text-gray-800 hover:bg-gray-300 transition-all active:scale-95 ${
              currentIndex >= maxIndexDesktop
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>

      <StatsSection />
    </div>
  );
}
