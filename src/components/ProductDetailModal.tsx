import React, { useState } from 'react';
import { X, Heart, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currency?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  currency = 'INR',
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'care'>('details');
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount / 105).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Eligible for Free Delivery & COD to ${pincode} by ${new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 200);
  };

  const galleryImages = [
    product.image,
    product.secondaryImage || product.image,
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#ebe0dc] shadow-2xl relative animate-fadeIn flex flex-col md:flex-row text-[#7b3116]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#7b3116] shadow-sm hover:scale-105 transition-all focus-visible:outline-2"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#fffaea]/40 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#ebe0dc]">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] w-full max-w-sm rounded-xl overflow-hidden border border-[#ebe0dc] bg-white shadow-sm">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#7b3116] text-white text-[10px] font-bold tracking-widest uppercase rounded-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnail Pickers */}
          <div className="flex gap-3 mt-4">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-14 h-18 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === img ? 'border-[#7b3116] scale-105' : 'border-[#ebe0dc] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-4 border-t border-[#ebdcca] text-[10px] text-center text-[#7b3116]/80">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#7b3116] mb-1" />
              <span>100% Pure Cotton</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-[#7b3116] mb-1" />
              <span>Free Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-[#7b3116] mb-1" />
              <span>7-Day Easy Exchange</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#7b3116]/70 uppercase tracking-widest mb-1">
                <span>{product.collection} · {product.category}</span>
                <div className="flex items-center gap-1 text-[#7b3116] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#7b3116]" />
                  <span>{product.rating} ({product.reviewCount})</span>
                </div>
              </div>
              <h1 id="product-title" className="text-xl sm:text-2xl font-medium tracking-tight text-[#7b3116]">
                {product.name}
              </h1>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-[#ebe0dc]">
              <span className="text-2xl font-semibold text-[#7b3116] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[11px] text-[#7b3116] bg-[#fffaea] border border-[#ebdcca] px-2 py-0.5 rounded-full font-medium">
                Inclusive of all taxes
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#7b3116]">Select Size</span>
                <span className="text-xs text-[#7b3116]/70 font-light underline cursor-pointer">
                  Size Guide (Bust 34&quot; - 44&quot;)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-[#7b3116] text-white border-[#7b3116] shadow-sm'
                        : 'bg-white text-[#7b3116] border-[#ebe0dc] hover:border-[#7b3116]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold text-[#7b3116]">Quantity:</span>
              <div className="flex items-center border border-[#ebe0dc] rounded-full overflow-hidden bg-[#fffaea]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-semibold text-[#7b3116] hover:bg-white transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-[#7b3116] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-semibold text-[#7b3116] hover:bg-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAdd}
                disabled={isAdding}
                className="flex-1 py-3 px-6 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-2"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-full border transition-all ${
                  isWishlisted 
                    ? 'bg-[#7b3116] text-white border-[#7b3116]' 
                    : 'bg-[#fffaea] text-[#7b3116] border-[#ebdcca] hover:border-[#7b3116]'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Pincode & COD Checker */}
            <div className="pt-3 border-t border-[#ebe0dc]">
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs border border-[#ebe0dc] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b3116]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#fffaea] border border-[#ebdcca] text-[#7b3116] text-xs font-semibold rounded-lg hover:bg-[#ebdcca] transition-colors"
                >
                  Check COD
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] mt-1.5 text-[#7b3116] font-medium">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Collapsible Tabs */}
            <div className="pt-2 border-t border-[#ebe0dc]">
              <div className="flex border-b border-[#ebe0dc] text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-3 font-semibold transition-colors border-b-2 ${
                    activeTab === 'details' ? 'border-[#7b3116] text-[#7b3116]' : 'border-transparent text-gray-500'
                  }`}
                >
                  Fabric & Fit
                </button>
                <button
                  onClick={() => setActiveTab('sizing')}
                  className={`py-2 px-3 font-semibold transition-colors border-b-2 ${
                    activeTab === 'sizing' ? 'border-[#7b3116] text-[#7b3116]' : 'border-transparent text-gray-500'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`py-2 px-3 font-semibold transition-colors border-b-2 ${
                    activeTab === 'care' ? 'border-[#7b3116] text-[#7b3116]' : 'border-transparent text-gray-500'
                  }`}
                >
                  Care Guide
                </button>
              </div>

              <div className="pt-3 text-xs text-[#7b3116]/85 space-y-1.5 min-h-[60px]">
                {activeTab === 'details' && (
                  <div>
                    <p><strong className="font-semibold">Fabric:</strong> {product.fabric}</p>
                    <p><strong className="font-semibold">Fit:</strong> {product.fit}</p>
                    <p><strong className="font-semibold">Origins:</strong> Tailored in Indore, India</p>
                  </div>
                )}
                {activeTab === 'sizing' && (
                  <p className="leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'care' && (
                  <p className="leading-relaxed">{product.care}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
