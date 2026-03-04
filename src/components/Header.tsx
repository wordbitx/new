import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { companyInfo } from '@/data/products';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 bg-[#2979FF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CR</span>
              </div>
              <span className="font-bold text-xl text-[#0B1C3B] hidden sm:block">
                {companyInfo.name}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('products')}
                className="text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium"
              >
                Contact
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="hidden md:flex items-center gap-2 text-[#5A6E8F] hover:text-[#2979FF] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{companyInfo.phone}</span>
              </a>

              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2979FF] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="section-padding py-4">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('products')}
                className="text-left text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium py-2"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium py-2"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-[#5A6E8F] hover:text-[#2979FF] transition-colors font-medium py-2"
              >
                Contact
              </button>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-[#2979FF] font-medium py-2"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
