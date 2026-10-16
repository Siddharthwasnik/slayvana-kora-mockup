import React from 'react';
import { ASSET_IMAGES } from '../data/products';

interface HeroProps {
  onShopDrop: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopDrop }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#000000] text-white">
      {/* High-res Party Celebration Hero Media */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[82vh] max-h-[860px] overflow-hidden flex items-center justify-center">
        <img
          src={ASSET_IMAGES.heroParty}
          alt="slayvana One Year Celebration Party with slayvana Core"
          loading="eager"
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 scale-100"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Scrim for Perfect WCAG Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30 pointer-events-none" />

        {/* Centered Brand Anniversary Lockup */}
        <div className="absolute inset-x-0 bottom-16 sm:bottom-24 flex flex-col items-center justify-center text-center px-4 z-10 animate-fadeIn">
          <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-4 shadow-lg">
            <span className="text-[#fffaea] text-[12px] sm:text-[13px] tracking-widest uppercase font-medium">
              Anniversary Collection
            </span>
          </div>

          {/* KK CORE Emblem */}
          <div className="mb-4">
            <div className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-[0.2em] font-light text-white drop-shadow-md flex items-center justify-center gap-3">
              <span>SLAYVANA</span>
              <span className="text-[#ebdcca] text-2xl sm:text-3xl">✦</span>
              <span>CORE</span>
            </div>
            <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto mt-2 tracking-wide font-light">
              Crafted for the ones who wore our clothes, danced in our kurtis, and made this journey magic.
            </p>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onShopDrop}
            className="mt-2 px-8 py-3 bg-[#7b3116] hover:bg-[#632712] text-white font-medium text-[13px] tracking-widest uppercase rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            Explore The Drop
          </button>
        </div>
      </div>

      {/* Infinite Party Invitation Marquee Strip */}
      <div 
        className="w-full bg-[#fffaea] border-y border-[#ebdcca] py-2.5 overflow-hidden text-[#7b3116] select-none"
        aria-label="Party announcement ticker"
      >
        <div className="animate-marquee whitespace-nowrap text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase flex items-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="inline-flex items-center mx-4">
              <span>you are invited to the party</span>
              <span className="mx-3 text-[#7b3116] text-[14px]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
