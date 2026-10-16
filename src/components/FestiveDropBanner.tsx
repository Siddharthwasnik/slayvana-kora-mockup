import React from 'react';
import { ASSET_IMAGES } from '../data/products';

interface FestiveDropBannerProps {
  onShopDrop: () => void;
}

export const FestiveDropBanner: React.FC<FestiveDropBannerProps> = ({ onShopDrop }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#7b3116] my-10 sm:my-16">
      {/* Background Visual Container */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] overflow-hidden flex items-center justify-center">
        <img
          src={ASSET_IMAGES.festiveMithai}
          alt="The Mithai Box Festive Drop by Korakagaz"
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25 pointer-events-none" />

        {/* Centered Festive Typography Lockup */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <span className="text-[#fffaea] text-xs sm:text-sm tracking-[0.25em] lowercase font-light mb-2">
            [ festive drop ]
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.15em] font-light text-white drop-shadow-md mb-6 uppercase">
            THE MITHAI BOX
          </h2>

          <button
            onClick={onShopDrop}
            className="px-8 sm:px-10 py-3 border border-white text-white hover:bg-white hover:text-[#7b3116] transition-all duration-200 text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-none focus-visible:outline-2 focus-visible:outline-white"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
};
