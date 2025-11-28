import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Cpu 
} from "lucide-react";

function Footer() {
  return (
    <footer 
      style={{ backgroundColor: "#b09bd8" }} 
      className="text-white py-12 md:py-16"
    >
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        
        {/* TOP SECTION: About & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          
          {/* 1. LEFT: About Mystic Healer */}
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold tracking-wide mb-4">
              The Mystic Healers
            </h3>
            <p className="text-white text-sm font-light leading-relaxed max-w-md">
              Your sanctuary for spiritual growth and holistic wellness. 
              Connect with certified experts to heal your mind, body, and soul, 
              and embark on a journey of transformation.
            </p>
          </div>

          {/* 2. RIGHT: Get In Touch */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-xl font-semibold mb-6 tracking-wide border-b border-white/20 pb-2 inline-block md:block">
              Get In Touch
            </h4>
            
            {/* Marketing */}
            <div className="mb-5 flex flex-col md:items-end items-center group">
              <div className="flex items-center gap-2 mb-1 text-white">
                 <span className="text-sm font-medium">Marketing Queries</span>
                 <Mail size={16} />
              </div>
              <a 
                href="mailto:marketing@themystichealers.com" 
                className="text-sm text-white  transition-colors font-light tracking-wide"
              >
                marketing@themystichealers.com
              </a>
            </div>

            {/* Technical */}
            <div className="flex flex-col md:items-end items-center group">
              <div className="flex items-center gap-2 mb-1 text-white/90">
                 <span className="text-sm font-medium">Technical & Grievances</span>
                 <Cpu size={16} />
              </div>
              <a 
                href="mailto:grievances@themystichealers.com" 
                className="text-sm text-white hover:text-white transition-colors font-light tracking-wide"
              >
                grievances@themystichealers.com
              </a>
            </div>

          </div>

        </div>

        {/* MIDDLE SECTION: Social Icons (Bottom Center) */}
        <div className="flex flex-col items-center justify-center py-8 border-t border-white/10">
             <div className="flex items-center gap-6">
                {/* YouTube */}
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-purple-900/20">
                    <Youtube size={22} className="text-white" />
                </a>
                {/* Instagram */}
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-purple-900/20">
                    <Instagram size={22} className="text-white" />
                </a>
                {/* Facebook */}
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-purple-900/20">
                    <Facebook size={22} className="text-white" />
                </a>
                {/* Twitter / X */}
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-purple-900/20">
                    <Twitter size={22} className="text-white" />
                </a>
                 {/* Pinterest */}
                 <a href="#" className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-purple-900/20 flex items-center justify-center w-[50px] h-[50px]">
                   <span className="font-bold text-xl leading-none font-serif">P</span>
                </a>
             </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white font-light">
          <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} The Mystic Healers. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;