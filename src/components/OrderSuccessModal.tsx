import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn text-[#7b3116]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#ebe0dc] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#fffaea] border border-[#ebdcca] rounded-full flex items-center justify-center mx-auto text-[#7b3116] mb-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed · Preparing Shipment
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#7b3116] pt-1">
            Thank you, {order.customer.name}!
          </h2>
          <p className="text-xs text-[#7b3116]/80">
            We have received your order <span className="font-bold text-[#7b3116]">#{order.orderId}</span>. A confirmation SMS with real-time tracking has been sent to {order.customer.phone}.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-6 p-4 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/40 space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#ebdcca] pb-2">
            <span className="text-[#7b3116]/70">Delivery Address:</span>
            <span className="font-semibold text-right max-w-[200px] truncate">
              {order.customer.address}, {order.customer.pincode}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#ebdcca] pb-2">
            <span className="text-[#7b3116]/70">Payment Method:</span>
            <span className="font-semibold uppercase">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#ebdcca] pb-2">
            <span className="text-[#7b3116]/70">Estimated Delivery:</span>
            <span className="font-semibold flex items-center gap-1 text-emerald-700">
              <Truck className="w-3.5 h-3.5" /> 3-5 Business Days
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="font-semibold block text-[11px] uppercase tracking-wider text-[#7b3116]">
              Purchased Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px]">
                <span className="truncate max-w-[240px]">
                  {item.product.name} ({item.selectedSize}) × {item.quantity}
                </span>
                <span className="font-medium tabular-nums">
                  Rs. {(item.product.price * item.quantity).toLocaleString('en-IN')}.00
                </span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-bold pt-2 border-t border-[#ebdcca]">
              <span>Grand Total</span>
              <span className="tabular-nums">Rs. {order.total.toLocaleString('en-IN')}.00</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 space-y-2">
          <button
            onClick={onContinueShopping}
            className="w-full py-3 bg-[#7b3116] hover:bg-[#632712] text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
