import { Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, generateOrderNumber } from '@/store/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { OrderSummary } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (orderSummary: OrderSummary) => void;
}

export function CartDrawer({ isOpen, onClose, onProceedToCheckout }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getOrderSummary, clearCart } = useCartStore();

  const handleCheckout = () => {
    const summary = getOrderSummary();
    const orderNumber = generateOrderNumber();
    const summaryWithOrderNumber = { ...summary, orderNumber };
    onProceedToCheckout(summaryWithOrderNumber);
    onClose();
  };

  const orderSummary = getOrderSummary();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-bold text-[#0B1C3B]">
            <ShoppingBag className="w-6 h-6 text-[#2979FF]" />
            Your Cart
            <span className="text-sm font-normal text-[#5A6E8F]">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-[#2979FF]/10 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-[#2979FF]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-2">Your cart is empty</h3>
            <p className="text-[#5A6E8F] mb-6">Add some products to get started!</p>
            <Button
              onClick={onClose}
              className="btn-primary bg-[#2979FF] hover:bg-[#1E6AE0]"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#0B1C3B] truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-[#5A6E8F] mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2979FF]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 pt-4 mt-auto">
              <div className="space-y-2 mb-4">
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

              <div className="space-y-2">
                <Button
                  className="w-full btn-primary bg-[#2979FF] hover:bg-[#1E6AE0] py-6 text-lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-red-500 hover:text-red-600 py-2"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
