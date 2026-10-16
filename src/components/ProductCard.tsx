import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currency?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  currency = 'INR',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount / 105).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowSizePicker(false);
    }, 1200);
  };

  return (
    <article
      className="group relative flex flex-col bg-white rounded-xl transition-all duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#7b3116]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-[#fffaea]/50 cursor-pointer border border-[#ebe0dc]"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badge in top left corner (matches screenshot: e.g. NEW ARRIVAL, MOST WANTED) */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-[#7b3116] shadow-sm rounded-xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Top-right Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-sm transition-all ${
            isWishlisted
              ? 'bg-white text-[#7b3116] shadow-md'
              : 'bg-white/80 text-[#7b3116] hover:bg-white hover:scale-110 shadow-sm'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7b3116]' : ''}`} />
        </button>

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 text-[#7b3116] text-[11px] font-semibold tracking-wider uppercase rounded-md shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSizePicker(!showSizePicker);
            }}
            className="py-2 px-3 bg-[#7b3116] text-white text-[11px] font-semibold rounded-md shadow-md hover:bg-[#632712] flex items-center justify-center transition-colors focus-visible:outline-2"
            title="Choose Size and Add"
            aria-label="Quick Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Size Picker Popover when Quick Add clicked */}
        {showSizePicker && (
          <div 
            className="absolute inset-x-2 bottom-12 z-20 bg-white p-3 rounded-lg shadow-xl border border-[#ebe0dc] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-medium text-[#7b3116] mb-1.5 flex justify-between">
              <span>Select Size:</span>
              <span className="font-bold">{selectedSize}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1 text-[11px] font-medium rounded border transition-colors ${
                    selectedSize === size
                      ? 'bg-[#7b3116] text-white border-[#7b3116]'
                      : 'bg-[#fffaea] text-[#7b3116] border-[#ebdcca] hover:border-[#7b3116]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleQuickAdd}
              disabled={justAdded}
              className="w-full py-1.5 bg-[#7b3116] text-white text-[11px] font-semibold tracking-wider uppercase rounded hover:bg-[#632712] transition-colors flex items-center justify-center gap-1"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <span>Add to Bag</span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Details Section (Typography from Design Catalog) */}
      <div className="pt-3 pb-2 px-1 text-center flex flex-col items-center">
        <h3 
          className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#7b3116] tracking-tight hover:underline cursor-pointer line-clamp-1"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-[12px] sm:text-[13px] font-normal text-[#7b3116] tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-[#7b3116]/50 line-through tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
