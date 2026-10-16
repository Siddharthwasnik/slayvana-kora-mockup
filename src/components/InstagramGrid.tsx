import React, { useState } from 'react';
import { Heart, MessageCircle, Play, X, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';

export const InstagramGrid: React.FC = () => {
  const [activePost, setActivePost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <section className="w-full bg-[#ffffff] py-12 sm:py-16 border-t border-[#ebe0dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] text-[#7b3116] uppercase">
            SLAYVANA ON INSTAGRAM
          </h2>
          <a
            href="https://instagram.com/slayvana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#7b3116]/80 hover:text-[#7b3116] hover:underline mt-2 tracking-wider lowercase transition-colors"
          >
            <span>join our community @slayvana</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3x3 Instagram Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 max-w-5xl mx-auto">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer bg-[#fffaea] border border-[#ebe0dc] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {post.isTextPost ? (
                /* Text post card */
                <div 
                  className="w-full h-full p-4 sm:p-6 flex items-center justify-center text-center select-none"
                  style={{ backgroundColor: post.bgColor || '#7b3116' }}
                >
                  <p className="text-white font-serif font-black text-xs sm:text-sm md:text-base lg:text-lg leading-snug tracking-wider">
                    {post.title}
                  </p>
                </div>
              ) : (
                /* Image / Video post */
                <>
                  <img
                    src={post.image}
                    alt={post.caption || 'Korakagaz Instagram story'}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Reel Badge if applicable */}
                  {post.isVideo && (
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white p-1.5 rounded-full z-10">
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </div>
                  )}

                  {/* Text Overlay if provided */}
                  {post.caption && (
                    <div className="absolute inset-x-2 bottom-2 bg-black/45 backdrop-blur-xs text-white p-2 rounded text-[11px] font-medium line-clamp-2 sm:line-clamp-none">
                      {post.caption}
                    </div>
                  )}
                </>
              )}

              {/* Hover overlay with Like/Comment stats */}
              <div className="absolute inset-0 bg-[#7b3116]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Post Detail Modal */}
      {activePost && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePost(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#ebe0dc] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-[#7b3116] p-1.5 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square w-full bg-[#fffaea] flex items-center justify-center overflow-hidden">
              {activePost.isTextPost ? (
                <div 
                  className="w-full h-full p-8 flex items-center justify-center text-center"
                  style={{ backgroundColor: activePost.bgColor }}
                >
                  <p className="text-white font-serif font-black text-xl leading-relaxed">
                    {activePost.title}
                  </p>
                </div>
              ) : (
                <img
                  src={activePost.image}
                  alt={activePost.caption || 'Korakagaz community post'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-[#7b3116] mb-3">
                <span className="font-bold tracking-wide">@slayvana</span>
                <span className="text-gray-400">Instagram Community Post</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7b3116]/90 mb-4 leading-relaxed">
                {activePost.caption || activePost.title}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#ebe0dc] text-xs text-[#7b3116]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold">
                    <Heart className="w-4 h-4 fill-[#7b3116]" /> {activePost.likes}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <MessageCircle className="w-4 h-4" /> {activePost.comments}
                  </span>
                </div>
                <a
                  href="https://instagram.com/slayvana"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold hover:underline"
                >
                  View on Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
