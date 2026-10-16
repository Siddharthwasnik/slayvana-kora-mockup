import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategoriesViewProps {
  products: Product[];
  initialCategory?: string;
  initialCollection?: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  currency?: string;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  products,
  initialCategory = 'All',
  initialCollection = 'All',
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  currency = 'INR',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('All');

  const categories = ['All', 'Short Kurti', 'Kurta Set', 'Shirt', 'Tunic'];
  const collections = ['All', 'KK Core', 'Korakagaz Classics', 'The Mithai Box'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedCollection !== 'All' && item.collection !== selectedCollection) return false;
      if (selectedSize !== 'All' && !item.sizes.includes(selectedSize as any)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedCollection, selectedSize, sortBy]);

  return (
    <div className="w-full bg-[#ffffff] min-h-screen py-8 sm:py-12 text-[#7b3116]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="border-b border-[#ebe0dc] pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#7b3116]/70">
              Handcrafted Collection
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-[#7b3116] mt-1">
              {selectedCollection !== 'All' ? selectedCollection : selectedCategory !== 'All' ? selectedCategory : 'All Products'}
            </h1>
          </div>
          <span className="text-xs text-[#7b3116]/80 font-light">
            Showing {filteredProducts.length} pieces · 100% Breathable Cotton
          </span>
        </div>

        {/* Filters and Controls Toolbar */}
        <div className="bg-[#fffaea]/50 border border-[#ebdcca] rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b3116] mr-2 shrink-0">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#7b3116] text-white'
                      : 'bg-white text-[#7b3116] border border-[#ebdcca] hover:border-[#7b3116]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-[#7b3116]/70" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#7b3116]">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-white border border-[#ebdcca] text-[#7b3116] rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#7b3116]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Line (Collections & Sizes) */}
          <div className="pt-3 border-t border-[#ebdcca]/60 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#7b3116]">Drop:</span>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedCollection === col
                      ? 'bg-[#7b3116] text-white'
                      : 'text-[#7b3116]/80 hover:text-[#7b3116] hover:underline'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#7b3116]">Size:</span>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-7 h-7 flex items-center justify-center rounded border text-[10px] font-semibold transition-colors ${
                    selectedSize === s
                      ? 'bg-[#7b3116] text-white border-[#7b3116]'
                      : 'bg-white text-[#7b3116] border-[#ebe0dc] hover:border-[#7b3116]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#fffaea]/30 rounded-2xl border border-[#ebe0dc]">
            <h3 className="text-base font-semibold text-[#7b3116] mb-1">No pieces match your filters</h3>
            <p className="text-xs text-[#7b3116]/70 mb-4">Try clearing one or more active filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCollection('All');
                setSelectedSize('All');
              }}
              className="px-6 py-2 bg-[#7b3116] text-white text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
