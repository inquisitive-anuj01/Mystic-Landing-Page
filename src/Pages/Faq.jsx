import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

// --- 1. DATA (Sorted by Order) ---
const faqData = [
  {
    _id: "687ca28bd7345d6584be81c5",
    question: "What can I expect to feel after a healing session?",
    answer:
      "Most people experience a sense of calm and clarity. With this clearer perspective, burdens feel lighter and easier to manage. From the first healing session, you will start to experience a sense of stability and control, contributing to your holistic well-being.",
    order: 1,
  },
  {
    _id: "687ca2a2d7345d6584be81c8",
    question: "How will these healing sessions improve my daily life?",
    answer:
      "Experiencing a sense of calm will lead to a more fulfilling and balanced life. Reducing stress will improve your focus allowing you to think clearly. Releasing emotional and mental blockages will pave the way for personal growth and transformation, improving your relationships with yourself and loved ones along the healing journey.",
    order: 2,
  },
  {
    _id: "687ca2bbd7345d6584be81cc",
    question: "I feel stuck in life. Can the healing sessions help?",
    answer:
      "Absolutely! These sessions aim to bring about a positive shift in your life. By transforming limiting beliefs, they will help clear negativity and encourage a more optimistic outlook, opening new pathways for joy, confidence, and personal growth.",
    order: 3,
  },
  {
    _id: "687ca2d0d7345d6584be81cf",
    question: "Will I see results after just one session?",
    answer:
      "Healing is a journey where you may be able to see results right away or they may take some time to be more evident, depending on specific circumstances. However, in the long run, it will absolutely offer the results you’ve been looking for.",
    order: 4,
  },
  {
    _id: "687ca2e4d7345d6584be81d2",
    question: "Can energy healing help with stress and anxiety?",
    answer:
      "Absolutely! Our sessions aim to bring balance and a sense of inner peace. By releasing emotional tension and calming the nervous system, your ability to cope with daily challenges improves, making you feel lighter and more centered.",
    order: 5,
  },
  // {
  //   _id: "687ca2f9d7345d6584be81d6",
  //   question: "What if I don't believe in energy healing?",
  //   answer:
  //     "Healing is not necessarily about believing but about being open to the process. By being open to the journey of self-discovery, you will experience a positive shift in energy, emotions and patterns.",
  //   order: 6,
  // },
  // {
  //   _id: "687ca379d7345d6584be81db",
  //   question: "Will this help me let go of emotional and physical wounds?",
  //   answer:
  //     "Definitely! Our healers will guide you to release past trauma and negative emotions, providing you with more space for healing and growth. This process encourages self-love and acceptance, helping you create a brighter self-image. Energy healing is not just limited to emotional wounds but also physical ones.\n\nSpiritual Healing acts as a complementary practice that accelerates emotional, physical, and mental well-being. Embracing this journey will lead you to find a renewed sense of purpose in life, helping you reach your true potential.",
  //   order: 7,
  // },
];

// --- 2. SINGLE ACCORDION ITEM COMPONENT ---
const FaqItem = ({ item, isOpen, toggleOpen }) => {
  return (
    <div
      className={`border rounded-xl mb-4 transition-all duration-300 overflow-hidden  ${
        isOpen
          ? "border-[#b09bd8] bg-purple-50/30 shadow-sm"
          : "border-gray-200 bg-white hover:border-purple-200"
      }`}
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none group"
      >
        <span
          className={`text-base md:text-lg font-medium transition-colors duration-300 ${
            isOpen ? "text-[#6f42c1]" : "text-gray-700 group-hover:text-[#6f42c1]"
          }`}
        >
          {item.question}
        </span>
        <div
          className={`ml-4 p-1 rounded-full transition-all duration-300 shrink-0 ${
            isOpen ? "bg-[#6f42c1] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-[#b09bd8] group-hover:text-white"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 md:p-5 pt-0 text-gray-500 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
function Faq() {
  const [openIndex, setOpenIndex] = useState(0); // Set to 0 to open first item by default, or null for all closed

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-10 mb-10 bg-white relative">
      <div className="container mx-auto px-4 md:px-24 max-w-[1000px]">
        
        {/* HEADING (Matches your standard layout) */}
        <div className="text-center mb-10 md:mb-14">
            <h2 className="text-xl md:text-3xl font-normal text-gray-800 uppercase tracking-wider">
                Find answers to common inquiries.
            </h2>
            <p className="text-gray-500 text-sm md:text-lg mt-2 font-light">
                Everything you need to know about your healing journey
            </p>
            <div className="w-16 md:w-24 h-1 bg-[#b09bd8] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* FAQ LIST */}
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <FaqItem
              key={item._id}
              item={item}
              isOpen={openIndex === index}
              toggleOpen={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;