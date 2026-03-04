import { ArrowLeft, CreditCard, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { OrderSummary } from '@/types';
import { useState } from 'react';
import { companyInfo } from '@/data/products';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: OrderSummary | null;
  onProceedToPayment: (method: 'online' | 'bank') => void;
  onBackToCart: () => void;
}

export function OrderSummaryModal({
  isOpen,
  onClose,
  orderSummary,
  onProceedToPayment,
  onBackToCart,
}: OrderSummaryModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'bank' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!orderSummary) return null;

  const handleProceed = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onProceedToPayment(selectedMethod);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0B1C3B] flex items-center gap-3">
            <button
              onClick={onBackToCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            Order Summary
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Order Items */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-[#0B1C3B] mb-3">Items ({orderSummary.items.length})</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {orderSummary.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0B1C3B] truncate">{item.name}</p>
                    <p className="text-sm text-[#5A6E8F]">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-[#2979FF]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-[#5A6E8F]">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#5A6E8F]">
              <span>Tax (8%)</span>
              <span>${orderSummary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#0B1C3B] pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#2979FF]">${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-[#0B1C3B] mb-3">Select Payment Method</h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedMethod('online')}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  selectedMethod === 'online'
                    ? 'border-[#2979FF] bg-[#2979FF]/5'
                    : 'border-gray-200 hover:border-[#2979FF]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedMethod === 'online' ? 'bg-[#2979FF]' : 'bg-gray-100'
                }`}>
                  <CreditCard className={`w-6 h-6 ${
                    selectedMethod === 'online' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[#0B1C3B]">Pay Online</p>
                  <p className="text-sm text-[#5A6E8F]">Secure payment via credit/debit card</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'online' ? 'border-[#2979FF]' : 'border-gray-300'
                }`}>
                  {selectedMethod === 'online' && (
                    <div className="w-3 h-3 bg-[#2979FF] rounded-full" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod('bank')}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  selectedMethod === 'bank'
                    ? 'border-[#2979FF] bg-[#2979FF]/5'
                    : 'border-gray-200 hover:border-[#2979FF]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedMethod === 'bank' ? 'bg-[#2979FF]' : 'bg-gray-100'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    selectedMethod === 'bank' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[#0B1C3B]">Bank Transfer</p>
                  <p className="text-sm text-[#5A6E8F]">Pay directly to our bank account</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'bank' ? 'border-[#2979FF]' : 'border-gray-300'
                }`}>
                  {selectedMethod === 'bank' && (
                    <div className="w-3 h-3 bg-[#2979FF] rounded-full" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onBackToCart}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              className="flex-1 btn-primary bg-[#2979FF] hover:bg-[#1E6AE0]"
              disabled={!selectedMethod || isProcessing}
              onClick={handleProceed}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {selectedMethod === 'online' ? 'Pay Online' : 'Proceed with Bank Transfer'}
                </>
              )}
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-[#5A6E8F] pt-4 border-t border-gray-200">
            <p>Need help? Contact us at</p>
            <p className="font-medium text-[#2979FF]">{companyInfo.email}</p>
            <p className="font-medium text-[#2979FF]">{companyInfo.phone}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
