import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { OrderSummaryModal } from '@/components/OrderSummaryModal';
import { PaymentModal } from '@/components/PaymentModal';
import { LegalPages } from '@/components/LegalPages';
import { Hero } from '@/sections/Hero';
import { Products } from '@/sections/Products';
import { About } from '@/sections/About';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';
import { useCartStore } from '@/store/cartStore';
import type { OrderSummary, Product } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'online' | 'bank' | null>(null);
  
  const { orderSummary, setOrderSummary, clearCart, setCurrentOrderNumber } = useCartStore();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleProceedToCheckout = (summary: OrderSummary) => {
    setOrderSummary(summary);
    setIsCartOpen(false);
    setIsOrderSummaryOpen(true);
  };

  const handleProceedToPayment = (method: 'online' | 'bank') => {
    setSelectedPaymentMethod(method);
    setIsOrderSummaryOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setOrderSummary(null);
    setCurrentOrderNumber(null);
    setIsPaymentModalOpen(false);
    toast.success('Order placed successfully! Check your email for details.');
  };

  const handleBackToCart = () => {
    setIsOrderSummaryOpen(false);
    setIsCartOpen(true);
  };

  const handleProductClick = (_product: Product) => {
    // Scroll to products section and highlight the product
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLegalClick = (page: string) => {
    setCurrentLegalPage(page);
    window.scrollTo(0, 0);
  };

  const handleCloseLegal = () => {
    setCurrentLegalPage(null);
  };

  // If a legal page is open, show only that page
  if (currentLegalPage) {
    return (
      <LegalPages
        currentPage={currentLegalPage}
        onClose={handleCloseLegal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF4FF]">
      <Header onCartClick={handleCartClick} />
      
      <main>
        <Hero />
        <Products onProductClick={handleProductClick} />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer onLegalClick={handleLegalClick} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={isOrderSummaryOpen}
        onClose={() => setIsOrderSummaryOpen(false)}
        orderSummary={orderSummary}
        onProceedToPayment={handleProceedToPayment}
        onBackToCart={handleBackToCart}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderSummary={orderSummary}
        paymentMethod={selectedPaymentMethod}
        onOrderComplete={handleOrderComplete}
      />

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
