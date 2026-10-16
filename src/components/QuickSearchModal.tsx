import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currency?: string;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currency = 'INR',
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.collection.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount / 105).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden border border-[#ebe0dc] shadow-2xl relative text-[#7b3116]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#ebe0dc] flex items-center gap-3 bg-[#fffaea]/50">
          <Search className="w-5 h-5 text-[#7b3116]/70 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kurtis, sets, fabrics (e.g. Scallop, Bell Sleeve, Cotton)..."
            className="flex-1 bg-transparent text-sm text-[#7b3116] focus:outline-none placeholder:text-[#7b3116]/50"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#7b3116]/70 hover:text-[#7b3116]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white text-[#7b3116]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7b3116]/70 block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Bell Sleeved', 'Scallop Kurti', 'Cotton Set', 'Mohini', 'Noor Kurti', 'Festive Drop'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 bg-[#fffaea] border border-[#ebdcca] rounded-full text-xs text-[#7b3116] hover:bg-[#ebdcca] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7b3116]/70 block mb-2">
                  Featured Drops
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {products.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        onClose();
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg border border-[#ebe0dc] hover:bg-[#fffaea] text-left transition-colors"
                    >
                      <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#7b3116] truncate">{item.name}</p>
                        <p className="text-[11px] text-[#7b3116]/70 tabular-nums">{formatPrice(item.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-[#7b3116]/80 font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#7b3116]/60 mt-1">Try searching for &quot;Kurti&quot;, &quot;Sukoon&quot;, or &quot;Embroidered&quot;.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7b3116]/70 block mb-2">
                Found {filtered.length} products
              </span>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#ebe0dc] hover:bg-[#fffaea] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-md" />
                    <div>
                      <p className="text-xs font-semibold text-[#7b3116]">{item.name}</p>
                      <p className="text-[11px] text-[#7b3116]/70">{item.collection} · {item.category}</p>
                      <p className="text-xs font-bold text-[#7b3116] tabular-nums mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7b3116]/60" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
