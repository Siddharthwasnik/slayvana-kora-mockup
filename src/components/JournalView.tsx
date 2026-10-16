import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { PageView } from '../types';

interface JournalViewProps {
  onNavigate: (page: PageView) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen py-8 sm:py-16 text-[#7b3116]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7b3116] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Article Header */}
        <div className="text-center space-y-4 mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#7b3116]/70">
            KORAKAGAZ JOURNAL · CHAPTER 01
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#7b3116] leading-tight">
            Why We Did Our Brand&apos;s Birthday Shoot the Old School Way
          </h1>
          <p className="text-xs sm:text-sm text-[#7b3116]/80 font-light max-w-xl mx-auto">
            Published October 2026 · By the Korakagaz Founders &amp; Atelier Team in Indore
          </p>
        </div>

        {/* Hero Article Image */}
        <div className="rounded-2xl overflow-hidden border border-[#ebe0dc] shadow-md mb-12">
          <img
            src={ASSET_IMAGES.heroParty}
            alt="Korakagaz birthday celebration party"
            className="w-full h-auto object-cover"
          />
          <div className="bg-[#fffaea] p-4 text-[11px] text-[#7b3116]/80 italic text-center border-t border-[#ebdcca]">
            Real smiles, real friends, and unedited joy. The Korakagaz 1st anniversary celebration.
          </div>
        </div>

        {/* Editorial Body */}
        <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-[#7b3116]/90 font-light">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#7b3116] first-letter:float-left first-letter:mr-3">
            When we launched Korakagaz from a tiny room in Readymade Complex, Pardesipura, Indore, we had one simple promise to ourselves: clothes that breathe like paper, twirl like poetry, and feel comfortable enough to dance the entire night in.
          </p>

          <p>
            One year later, as algorithms and synthetic models filled every feed, we asked ourselves how we wanted to celebrate. The answer was instantaneous: invite the actual women who supported our little ideas from day one, order celebratory mithai, turn on the disco ball, and shoot real polaroids on golden tinsel strings.
          </p>

          <div className="my-8 p-6 bg-[#fffaea] rounded-2xl border border-[#ebdcca] text-center space-y-2">
            <Sparkles className="w-6 h-6 text-[#7b3116] mx-auto" />
            <blockquote className="text-base sm:text-lg font-serif italic text-[#7b3116] font-medium">
              &ldquo;Because Korakagaz wouldn&apos;t be Korakagaz without you. And that&apos;s exactly what KK ✦ CORE means to us.&rdquo;
            </blockquote>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-[#7b3116] pt-4">
            The Philosophy Behind KK ✦ CORE
          </h2>
          <p>
            KK Core isn&apos;t just another seasonal drop. It is our permanent archive of comfort-first silhouettes. From our scalloped Adaa kurtis to the bell-sleeved Neel denim shirt and pristine Sukoon Chikankari kurta set, every silhouette is tested for movement, pocket depth, and fabric softness after dozens of washes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <div className="rounded-xl overflow-hidden border border-[#ebe0dc]">
              <img src={ASSET_IMAGES.storyPolaroid} alt="Polaroids" className="w-full h-48 object-cover" />
              <div className="p-3 bg-[#fffaea] text-[11px] text-[#7b3116] font-medium">
                Pardesipura Studio Polaroids
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#ebe0dc]">
              <img src={ASSET_IMAGES.festiveMithai} alt="The Mithai Box Drop" className="w-full h-48 object-cover" />
              <div className="p-3 bg-[#fffaea] text-[11px] text-[#7b3116] font-medium">
                The Festive Mithai Box Drop
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-[#7b3116] pt-4">
            A Note of Gratitude
          </h2>
          <p>
            To everyone who took a mirror selfie in our kurtis, told their friends about us, and sent us loving DMs: thank you for making our first year so unforgettable. We promise to keep crafting honest, breathable clothes that celebrate you every single day.
          </p>

          <div className="pt-6 border-t border-[#ebe0dc] flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-[#7b3116]">
              With warmth &amp; love, The Korakagaz Family
            </span>
            <button
              onClick={() => onNavigate('all-products')}
              className="px-6 py-2.5 bg-[#7b3116] text-white text-xs font-semibold rounded-full hover:bg-[#632712] transition-colors"
            >
              Shop KK Core Drop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
