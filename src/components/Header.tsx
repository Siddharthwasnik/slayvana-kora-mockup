import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, BookOpen, User, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  currency,
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'CATEGORIES', page: 'categories' },
    { label: 'CHAPTERS', page: 'chapters' },
    { label: 'BEST SELLERS', page: 'best-sellers' },
    { label: 'ALL PRODUCTS', page: 'all-products' },
    { label: 'KORAKAGAZ JOURNAL', page: 'journal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ebe0dc] transition-all">
      {/* Top Banner */}
      <div className="bg-[#7b3116] text-white text-[11px] md:text-[12px] py-1.5 px-4 text-center tracking-wider font-medium flex items-center justify-between">
        <div className="hidden sm:block text-[11px] opacity-80">
          FREE SHIPPING ON PREPAID ORDERS OVER ₹999
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2">
          <span>COD available!</span>
          <span className="opacity-70">|</span>
          <span className="text-[#fffaea] font-semibold">100% Cotton Handcrafted</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('design-catalog')}
            className="flex items-center gap-1 text-[11px] hover:underline text-[#fffaea] transition-opacity"
            title="Inspect Design System Tokens & Catalog"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Design Catalog</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#7b3116] hover:bg-[#fffaea] rounded-full transition-colors focus-visible:outline-2"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Wordmark (Single Text Element) */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-center group text-left cursor-pointer focus-visible:outline-2"
        >
          <span className="text-xl sm:text-2xl font-light tracking-[0.25em] text-[#7b3116] transition-transform group-hover:opacity-90 inline-block font-sans font-semibold">
            K O R A K A G A Z
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav 
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-[13px] font-medium tracking-wider transition-colors py-1 cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'text-[#7b3116] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7b3116]'
                    : 'text-[#7b3116]/80 hover:text-[#7b3116]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Currency / Region Selector */}
          <div className="hidden sm:flex items-center">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="text-[12px] text-[#7b3116] bg-transparent font-medium border-0 py-1 pl-1 pr-4 focus:ring-0 cursor-pointer hover:opacity-80"
              aria-label="Select currency"
            >
              <option value="INR">🇮🇳 India (INR ₹)</option>
              <option value="USD">🇺🇸 US (USD $)</option>
              <option value="GBP">🇬🇧 UK (GBP £)</option>
              <option value="EUR">🇪🇺 Europe (EUR €)</option>
            </select>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#7b3116] hover:bg-[#fffaea] rounded-full transition-colors relative"
            aria-label="Search catalog"
            title="Search products (Cmd+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Design Catalog Link Button */}
          <button
            onClick={() => onNavigate('design-catalog')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full transition-all border ${
              currentPage === 'design-catalog'
                ? 'bg-[#7b3116] text-white border-[#7b3116]'
                : 'bg-[#fffaea] text-[#7b3116] border-[#ebdcca] hover:border-[#7b3116]'
            }`}
            title="Design System & Token Guidance Catalog"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Catalog</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#7b3116] hover:bg-[#fffaea] rounded-full transition-colors relative"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7b3116] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <button
            onClick={() => setShowAccountModal(true)}
            className="p-2 text-[#7b3116] hover:bg-[#fffaea] rounded-full transition-colors relative"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 p-2 text-[#7b3116] hover:bg-[#fffaea] rounded-full transition-colors relative"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7b3116] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ebe0dc] bg-[#fffaea] px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left text-base font-medium tracking-wide py-2 ${
                  currentPage === link.page
                    ? 'text-[#7b3116] font-bold border-l-2 border-[#7b3116] pl-3'
                    : 'text-[#7b3116]/80 pl-1'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#ebdcca] flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate('design-catalog');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#7b3116] text-white rounded-full text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Design System Catalog</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#7b3116] pt-2">
                <span>Select Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="bg-white border border-[#ebe0dc] rounded-md px-2 py-1 text-xs text-[#7b3116]"
                >
                  <option value="INR">🇮🇳 INR ₹</option>
                  <option value="USD">🇺🇸 USD $</option>
                  <option value="GBP">🇬🇧 GBP £</option>
                  <option value="EUR">🇪🇺 EUR €</option>
                </select>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Account Info Modal */}
      {showAccountModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAccountModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#ebe0dc] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-[#7b3116] hover:bg-[#fffaea] p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-[#7b3116] mb-2">Welcome to Korakagaz</h3>
            <p className="text-xs text-[#7b3116]/80 mb-6">
              Track recent orders, manage shipping addresses, and sync your favorite handcrafted pieces.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowAccountModal(false);
                  onNavigate('order-success');
                }}
                className="w-full py-2.5 px-4 bg-[#7b3116] text-white text-xs font-semibold rounded-full hover:opacity-95 transition-opacity"
              >
                Track Past Orders
              </button>
              <button 
                onClick={() => {
                  setShowAccountModal(false);
                  onOpenWishlist();
                }}
                className="w-full py-2.5 px-4 bg-[#fffaea] border border-[#ebdcca] text-[#7b3116] text-xs font-semibold rounded-full hover:bg-[#f5ecdb] transition-colors"
              >
                My Wishlist ({wishlistCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
