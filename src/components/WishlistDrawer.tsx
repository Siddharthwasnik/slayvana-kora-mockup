import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
  currency?: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onAddToCart,
  currency = 'INR',
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount / 105).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ebe0dc] relative animate-slideLeft text-[#7b3116]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-[#ebe0dc] flex items-center justify-between bg-[#fffaea]/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#7b3116] text-[#7b3116]" />
            <h2 className="text-base sm:text-lg font-semibold tracking-wide">
              Saved Pieces ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7b3116] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#fffaea] border border-[#ebdcca] flex items-center justify-center text-[#7b3116]">
                <Heart className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="text-base font-semibold">Your wishlist is empty</h3>
              <p className="text-xs text-[#7b3116]/70 max-w-xs">
                Save pieces you love by tapping the heart icon on any kurti or set.
              </p>
            </div>
          ) : (
            items.map((product) => (
              <div 
                key={product.id}
                className="flex gap-3 p-3 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/30 transition-all hover:bg-[#fffaea]/60"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded-lg border border-[#ebe0dc] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-[#7b3116] line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-[#7b3116] tabular-nums mt-1 block">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, product.sizes[0]);
                      onRemove(product.id);
                    }}
                    className="w-full mt-2 py-1.5 px-3 bg-[#7b3116] text-white text-[11px] font-semibold tracking-wider uppercase rounded-md hover:bg-[#632712] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
