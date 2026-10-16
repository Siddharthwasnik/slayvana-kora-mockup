import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  currency,
  onCurrencyChange,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#ebe0dc] text-[#7b3116]">
      {/* Newsletter Signup Row */}
      <div className="bg-[#fffaea] border-b border-[#ebdcca] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-xl">
          <h3 className="text-lg sm:text-xl font-light tracking-widest uppercase mb-2">
            Join the Slayvana Club
          </h3>
          <p className="text-xs sm:text-sm text-[#7b3116]/80 mb-4 font-light">
            Be the first to hear about new chapters, festive drops, secret party invites, and member-only restocks.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#ebdcca] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7b3116] text-[#7b3116]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7b3116] text-white text-xs font-semibold rounded-full hover:bg-[#632712] transition-colors flex items-center gap-1.5 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Joined!</span>
                </>
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7b3116]">
              CONTACT US
            </h4>
            <div className="text-xs text-[#7b3116]/85 space-y-2 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[#7b3116] mt-0.5" />
                <span>Readymade Complex, Pardesipura, Indore- 452003 (M.P.) India</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#7b3116]" />
                <a 
                  href="mailto:support@slayvana.com" 
                  className="hover:underline transition-all"
                >
                  support@slayvana.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#7b3116]" />
                <a 
                  href="tel:+918261911729" 
                  className="hover:underline transition-all"
                >
                  +91 8261-911729
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://facebook.com/korakagaz.india"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full border border-[#ebdcca] hover:bg-[#fffaea] text-[#7b3116] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/korakagaz.india"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-[#ebdcca] hover:bg-[#fffaea] text-[#7b3116] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918261911729"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Support"
                className="p-2 rounded-full border border-[#ebdcca] hover:bg-[#fffaea] text-[#7b3116] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7b3116]">
              ABOUT US
            </h4>
            <ul className="space-y-2 text-xs text-[#7b3116]/85 font-light">
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:underline hover:text-[#7b3116] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('all-products')}
                  className="hover:underline hover:text-[#7b3116] transition-colors"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chapters')}
                  className="hover:underline hover:text-[#7b3116] transition-colors"
                >
                  Chapters & Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('design-catalog')}
                  className="hover:underline text-[#7b3116] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Design Catalog (Tokens & Specs)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7b3116]">
              HELP
            </h4>
            <ul className="space-y-2 text-xs text-[#7b3116]/85 font-light">
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="hover:underline transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="hover:underline transition-colors"
                >
                  Return/ Exchange Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="hover:underline transition-colors"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="hover:underline transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="hover:underline transition-colors"
                >
                  Contact Information
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('order-success')}
                  className="hover:underline font-medium text-[#7b3116] transition-colors"
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Brand Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7b3116]">
              HANDCRAFTED IN INDIA
            </h4>
            <p className="text-xs text-[#7b3116]/80 leading-relaxed font-light">
              Every Slayvana piece is crafted from 100% natural, breathable Indian cottons with mindful finishing in our atelier.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-semibold px-3 py-1 bg-[#fffaea] border border-[#ebdcca] rounded-full text-[#7b3116]">
                Cash on Delivery Available Across India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Currency + Legal + Payment badges */}
        <div className="mt-12 pt-8 border-t border-[#ebe0dc] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7b3116]/80">
          {/* Region / Currency */}
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Region:</span>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent border border-[#ebdcca] rounded-md px-2 py-1 text-xs text-[#7b3116]"
            >
              <option value="INR">🇮🇳 India (INR ₹)</option>
              <option value="USD">🇺🇸 United States (USD $)</option>
              <option value="GBP">🇬🇧 United Kingdom (GBP £)</option>
              <option value="EUR">🇪🇺 European Union (EUR €)</option>
            </select>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-center md:text-left text-[11px] tracking-wide font-medium">
              © 2026 · SLAYVANA (slayvana.com) · ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Payment Badges (Clean SVG-based visual pills) */}
          <div className="flex items-center gap-2">
            {['AMEX', 'APPLE PAY', 'MASTERCARD', 'PAYPAL', 'RUPAY', 'VISA'].map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-[#fffaea] border border-[#ebdcca] text-[9px] font-mono font-bold tracking-wider rounded text-[#7b3116]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
