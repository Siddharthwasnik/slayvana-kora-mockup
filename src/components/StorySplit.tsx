import React from 'react';
import { ASSET_IMAGES } from '../data/products';

interface StorySplitProps {
  onExploreMore: () => void;
}

export const StorySplit: React.FC<StorySplitProps> = ({ onExploreMore }) => {
  return (
    <section className="w-full bg-[#ffffff] py-12 sm:py-16 lg:py-24 border-b border-[#ebe0dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column: Polaroid Strings Collage */}
          <div className="relative group overflow-hidden rounded-2xl bg-[#fffaea] border border-[#ebe0dc] p-2 sm:p-4 shadow-sm">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <img
                src={ASSET_IMAGES.storyPolaroid}
                alt="Slayvana community polaroid memory wall"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[11px] sm:text-xs">
                <span className="font-medium tracking-wider bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  1 Year Celebration · Pop-up
                </span>
                <span className="opacity-90">October 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-[#7b3116] leading-tight">
              FOR THE PEOPLE WHO MADE IT <span className="font-serif italic font-bold">ONE</span>
            </h2>

            <p className="text-[#7b3116]/85 text-base sm:text-lg leading-relaxed font-light">
              This little corner at our one-year celebration was dedicated to you—the people who wore our clothes, supported our little ideas, sent us pictures and kept coming back.
            </p>

            <p className="text-[#7b3116]/90 text-base sm:text-lg font-medium">
              Because Slayvana wouldn&apos;t be Slayvana without you.
            </p>

            <div className="py-2 text-center my-1">
              <p className="text-xs uppercase tracking-widest text-[#7b3116]/70 mb-2">
                And that&apos;s exactly what
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#7b3116]/30 bg-[#fffaea] text-[#7b3116] font-serif text-xl sm:text-2xl tracking-[0.2em]">
                <span>SLAYVANA</span>
                <span className="text-sm">✦</span>
                <span>CORE</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-[#7b3116]/70 mt-2">
                means to us.
              </p>
            </div>

            <p className="text-[#7b3116]/85 text-base sm:text-lg leading-relaxed font-light">
              A collection that brings together the pieces, ideas and little details that feel <span className="italic font-serif font-semibold">most like us</span>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={onExploreMore}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-full transition-colors focus-visible:outline-2"
              >
                Read The Journal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
