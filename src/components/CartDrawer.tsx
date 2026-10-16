import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Check, ShoppingBag } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onOrderSuccess: (order: OrderDetails) => void;
  currency?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
  currency = 'INR',
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  // Checkout modal state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount / 105).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);
    const cleaned = promoCode.trim().toUpperCase();

    if (cleaned === 'KKPARTY10' || cleaned === 'SLAY10' || cleaned === 'FIRST10') {
      setAppliedDiscount(10);
      setPromoSuccess('10% anniversary discount applied!');
    } else {
      setPromoError('Invalid code. Try "KKPARTY10" for 10% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerPincode) {
      alert('Please fill all mandatory shipping fields.');
      return;
    }

    setIsSubmittingOrder(true);
    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `KK-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping,
        total: grandTotal,
        paymentMethod,
        customer: {
          name: customerName,
          email: customerEmail || 'customer@slayvana.com',
          phone: customerPhone,
          address: customerAddress,
          city: 'Indore',
          pincode: customerPincode,
        },
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      setIsSubmittingOrder(false);
      setIsCheckingOut(false);
      setCheckoutStep('cart');
      onOrderSuccess(newOrder);
      onClose();
    }, 800);
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
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#ebe0dc] flex items-center justify-between bg-[#fffaea]/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7b3116]" />
            <h2 className="text-base sm:text-lg font-semibold tracking-wide">
              {checkoutStep === 'cart' ? `Shopping Bag (${items.reduce((s, i) => s + i.quantity, 0)})` : 'Quick Express Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7b3116] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress indicator */}
        <div className="bg-[#fffaea] px-5 py-2.5 border-b border-[#ebdcca] text-xs">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You have unlocked FREE shipping across India!</span>
            </div>
          ) : (
            <div>
              <p className="text-[#7b3116] mb-1 font-medium">
                Add <span className="font-bold">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> more for <span className="font-bold">FREE Shipping</span>
              </p>
              <div className="w-full h-1.5 bg-[#ebdcca] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7b3116] transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        {checkoutStep === 'cart' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#fffaea] border border-[#ebdcca] flex items-center justify-center text-[#7b3116]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="text-base font-semibold">Your bag is empty</h3>
                <p className="text-xs text-[#7b3116]/70 max-w-xs">
                  Discover the latest drops in our KK Core and Korakagaz Classics collections.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2 bg-[#7b3116] text-white text-xs font-semibold rounded-full hover:bg-[#632712] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Itemized List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-3 p-3 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/30 transition-all hover:bg-[#fffaea]/60"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg border border-[#ebe0dc] shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-semibold text-[#7b3116] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#7b3116]/70 mt-0.5">
                            Size: <span className="font-semibold">{item.selectedSize}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#ebdcca] rounded-full overflow-hidden bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                              className="px-2 py-0.5 text-xs text-[#7b3116] hover:bg-[#fffaea]"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                              className="px-2 py-0.5 text-xs text-[#7b3116] hover:bg-[#fffaea]"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-[#7b3116] tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#7b3116]/60" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (e.g. KKPARTY10)"
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#ebdcca] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b3116] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#fffaea] border border-[#ebdcca] hover:bg-[#ebdcca] text-[#7b3116] text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1">{promoSuccess}</p>}
                  {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Express Checkout Form Step */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <button
              onClick={() => setCheckoutStep('cart')}
              className="text-xs font-semibold text-[#7b3116] hover:underline flex items-center gap-1 mb-2"
            >
              ← Back to Shopping Bag
            </button>

            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#7b3116] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 text-xs border border-[#ebdcca] rounded-lg focus:ring-1 focus:ring-[#7b3116]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#7b3116] mb-1">
                    Phone (for COD/SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-[#ebdcca] rounded-lg focus:ring-1 focus:ring-[#7b3116]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#7b3116] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                    placeholder="452003"
                    className="w-full px-3 py-2 text-xs border border-[#ebdcca] rounded-lg focus:ring-1 focus:ring-[#7b3116]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#7b3116] mb-1">
                  Shipping Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House/Flat number, Street name, Landmark"
                  className="w-full px-3 py-2 text-xs border border-[#ebdcca] rounded-lg focus:ring-1 focus:ring-[#7b3116]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#7b3116] mb-1.5">
                  Payment Method
                </label>
                <div className="space-y-1.5">
                  <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs ${paymentMethod === 'cod' ? 'border-[#7b3116] bg-[#fffaea]' : 'border-[#ebe0dc]'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#7b3116]"
                      />
                      <span className="font-semibold">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] bg-[#7b3116] text-white px-2 py-0.5 rounded">Most Popular</span>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs ${paymentMethod === 'upi' ? 'border-[#7b3116] bg-[#fffaea]' : 'border-[#ebe0dc]'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-[#7b3116]"
                      />
                      <span className="font-semibold">UPI / Google Pay / PhonePe</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">Instant & Safe</span>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs ${paymentMethod === 'card' ? 'border-[#7b3116] bg-[#fffaea]' : 'border-[#ebe0dc]'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#7b3116]"
                      />
                      <span className="font-semibold">Credit / Debit Card</span>
                    </div>
                    <span className="text-[10px] text-gray-500">All major cards</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Drawer Bottom Bar: Order Breakdown & Checkout CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#ebe0dc] bg-[#fffaea]/40 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7b3116]/80">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Anniversary Promo ({appliedDiscount}%)</span>
                  <span className="font-semibold tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7b3116]/80">
                <span>Shipping (Pan-India)</span>
                <span className="font-semibold">
                  {shipping === 0 ? <span className="text-emerald-700 uppercase font-bold">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#7b3116] pt-2 border-t border-[#ebdcca]">
                <span>Total Amount</span>
                <span className="tabular-nums">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('details')}
                className="w-full py-3 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmittingOrder}
                className="w-full py-3 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmittingOrder ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Place Order · {formatPrice(grandTotal)}</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[10px] text-center text-[#7b3116]/70">
              🔒 256-bit encrypted secure checkout. 7 days exchange policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
