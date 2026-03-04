import { Loader2, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { OrderSummary } from '@/types';
import { useState, useEffect } from 'react';
import { companyInfo } from '@/data/products';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: OrderSummary | null;
  paymentMethod: 'online' | 'bank' | null;
  onOrderComplete: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  orderSummary,
  paymentMethod,
  onOrderComplete,
}: PaymentModalProps) {
  const [step, setStep] = useState<'processing' | 'disabled' | 'success'>('processing');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (isOpen && paymentMethod === 'online') {
      setStep('processing');
      setCountdown(4);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep('disabled');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (isOpen && paymentMethod === 'bank') {
      setStep('success');
    }
  }, [isOpen, paymentMethod]);

  const handleContinueWithOrder = () => {
    setStep('success');
  };

  const handleComplete = () => {
    onOrderComplete();
    onClose();
  };

  if (!orderSummary) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {step === 'processing' && paymentMethod === 'online' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-[#2979FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-[#2979FF] animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-2">
              Redirecting to Payment Gateway...
            </h3>
            <p className="text-[#5A6E8F] mb-4">
              Please wait while we connect you to our secure payment processor.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-[#2979FF] h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((4 - countdown) / 4) * 100}%` }}
              />
            </div>
            <p className="text-sm text-[#5A6E8F]">Redirecting in {countdown} seconds...</p>
          </div>
        )}

        {step === 'disabled' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">
              Payment Information
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-amber-800 text-sm leading-relaxed">
                Automatic online payment is currently disabled. Please place your order and contact our support team to complete the payment.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full btn-primary bg-[#2979FF] hover:bg-[#1E6AE0]"
                onClick={handleContinueWithOrder}
              >
                Continue with Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1C3B] mb-2">
              Order Confirmation
            </h3>
            <p className="text-[#5A6E8F] mb-6">
              Thank You For Your Order! Your order has been successfully placed.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#5A6E8F]">Order Number:</span>
                  <span className="font-semibold text-[#0B1C3B]">{orderSummary.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6E8F]">Total Amount:</span>
                  <span className="font-semibold text-[#2979FF]">${orderSummary.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6E8F]">Payment Status:</span>
                  <span className="font-semibold text-amber-600">Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2979FF]/5 border border-[#2979FF]/20 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-[#0B1C3B] mb-2">Payment Instructions</h4>
              <p className="text-sm text-[#5A6E8F] mb-3">
                Please contact our support team to complete your payment:
              </p>
              <div className="space-y-1 text-sm">
                <p><span className="text-[#5A6E8F]">Email:</span> <span className="text-[#2979FF] font-medium">{companyInfo.email}</span></p>
                <p><span className="text-[#5A6E8F]">Phone:</span> <span className="text-[#2979FF] font-medium">{companyInfo.phone}</span></p>
              </div>
              <p className="text-xs text-[#5A6E8F] mt-3">
                Please mention your order number when contacting support.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full btn-primary bg-[#2979FF] hover:bg-[#1E6AE0]"
                onClick={handleComplete}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
