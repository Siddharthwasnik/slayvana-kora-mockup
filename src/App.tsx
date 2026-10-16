import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySplit } from './components/StorySplit';
import { ProductCard } from './components/ProductCard';
import { FestiveDropBanner } from './components/FestiveDropBanner';
import { InstagramGrid } from './components/InstagramGrid';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DesignCatalogView } from './components/DesignCatalogView';
import { CategoriesView } from './components/CategoriesView';
import { JournalView } from './components/JournalView';

import { PRODUCTS } from './data/products';
import { Product, CartItem, PageView, OrderDetails } from './types';
import { storageCache } from './services/cache';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currency, setCurrency] = useState<string>(() => storageCache.get('currency', 'INR'));

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Cart & Wishlist states with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => 
    storageCache.get<CartItem[]>('cart_items', [
      { product: PRODUCTS[0], selectedSize: 'M', quantity: 1 }
    ])
  );

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => 
    new Set(storageCache.get<string[]>('wishlist_ids', ['kc-01']))
  );

  // Sync state to cache
  useEffect(() => {
    storageCache.set('cart_items', cartItems);
  }, [cartItems]);

  useEffect(() => {
    storageCache.set('wishlist_ids', Array.from(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    storageCache.set('currency', currency);
  }, [currency]);

  // Handlers
  const handleAddToCart = (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setCartItems([]);
  };

  // Filtered collections for homepage
  const kkCoreProducts = PRODUCTS.filter(p => p.collection === 'KK Core');
  const classicsProducts = PRODUCTS.filter(p => p.collection === 'Korakagaz Classics');
  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#fffaea] selection:text-[#7b3116]">
      {/* Universal Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* 1. Hero Section */}
            <Hero onShopDrop={() => {
              const el = document.getElementById('kk-core-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* 2. Story Highlight Split */}
            <StorySplit onExploreMore={() => {
              setCurrentPage('journal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* 3. KK CORE Collection Grid */}
            <section id="kk-core-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ebe0dc]">
              <div className="text-center mb-10">
                <span className="text-xs tracking-[0.2em] uppercase text-[#7b3116]/70 block mb-1">
                  [ new arrivals ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-[0.15em] text-[#7b3116] flex items-center justify-center gap-2">
                  <span>KK</span>
                  <span className="text-sm">✦</span>
                  <span>CORE</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {kkCoreProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlistIds.has(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    currency={currency}
                  />
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setCurrentPage('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-none transition-colors"
                >
                  VIEW ALL
                </button>
              </div>
            </section>

            {/* 4. KORAKAGAZ CLASSICS Collection */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-light tracking-[0.15em] text-[#7b3116] uppercase">
                  KORAKAGAZ CLASSICS
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {classicsProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlistIds.has(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    currency={currency}
                  />
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setCurrentPage('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-none transition-colors"
                >
                  VIEW ALL
                </button>
              </div>
            </section>

            {/* 5. Festive Drop: The Mithai Box */}
            <FestiveDropBanner onShopDrop={() => {
              setCurrentPage('chapters');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* 6. Instagram Community Grid */}
            <InstagramGrid />
          </div>
        )}

        {/* Categories / All Products view */}
        {(currentPage === 'categories' || currentPage === 'all-products' || currentPage === 'best-sellers' || currentPage === 'chapters') && (
          <CategoriesView
            products={currentPage === 'best-sellers' ? PRODUCTS.filter(p => p.isBestseller) : PRODUCTS}
            initialCollection={currentPage === 'chapters' ? 'KK Core' : 'All'}
            onQuickView={setSelectedProduct}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            currency={currency}
          />
        )}

        {/* Journal / Our Story view */}
        {currentPage === 'journal' && (
          <JournalView onNavigate={setCurrentPage} />
        )}

        {/* Design System & Token Guidance Catalog View */}
        {currentPage === 'design-catalog' && (
          <DesignCatalogView />
        )}

        {/* Order tracking view */}
        {currentPage === 'order-success' && (
          <div className="max-w-2xl mx-auto py-16 px-4 text-center text-[#7b3116]">
            <h2 className="text-2xl font-light tracking-wide mb-2">Track Your Korakagaz Order</h2>
            <p className="text-xs text-[#7b3116]/80 mb-6">
              Enter your 6-digit Order ID sent via SMS or WhatsApp to view real-time courier updates.
            </p>
            <div className="flex max-w-sm mx-auto gap-2 mb-8">
              <input
                type="text"
                placeholder="e.g. KK-481920"
                className="flex-1 px-4 py-2 border border-[#ebdcca] rounded-full text-xs text-[#7b3116]"
              />
              <button 
                onClick={() => alert('Order status: Shipment dispatch in progress from Indore atelier. Expected delivery within 3-4 business days.')}
                className="px-6 py-2 bg-[#7b3116] text-white rounded-full text-xs font-semibold"
              >
                Track
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={setCurrentPage}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Floating Design Catalog Switcher Pill for reviewer/engineer convenience */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            setCurrentPage(currentPage === 'design-catalog' ? 'home' : 'design-catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#7b3116] text-white text-xs font-semibold rounded-full shadow-2xl hover:bg-[#632712] transition-all transform hover:scale-105 border border-white/20"
          title="Toggle between Live Storefront and Token-driven Design Catalog"
        >
          <Sparkles className="w-4 h-4 text-[#fffaea]" />
          <span>{currentPage === 'design-catalog' ? 'Back to Store' : 'Design Catalog'}</span>
        </button>
      </div>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        currency={currency}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOrderSuccess={handleOrderSuccess}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistedProducts}
        onRemove={(id) => {
          setWishlistIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }}
        onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
        currency={currency}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={setSelectedProduct}
        currency={currency}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onContinueShopping={() => {
          setConfirmedOrder(null);
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
