import React, { useEffect } from "react";
import Hero from "./Pages/Hero";
import HealerList from "./Pages/HealerList";
import Review from "./Pages/Review";
import Faq from "./Pages/Faq";
import Footer from "./Pages/Footer";
import Lenis from "lenis";

function App() {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <HealerList />
      <Review />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
