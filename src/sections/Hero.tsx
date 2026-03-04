import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.8 }
      );
      gsap.fromTo(
        '.hero-image',
        { opacity: 0, x: 50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EAF4FF 0%, #F6FAFF 100%)',
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-glow-blue rounded-full opacity-60 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glow-blue rounded-full opacity-40 translate-y-1/2 -translate-x-1/4" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-[10%] w-4 h-4 bg-[#2979FF] rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-[15%] w-3 h-3 bg-[#2979FF] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-[#2979FF] rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="section-padding w-full">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={contentRef} className="relative z-10">
              <div className="hero-title">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Digital Products & Services
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1C3B] leading-tight mb-6">
                  Grow Your Brand with{' '}
                  <span className="text-[#2979FF]">Smart Digital Solutions</span>
                </h1>
              </div>

              <p className="hero-subtitle text-lg text-[#5A6E8F] mb-8 max-w-lg">
                Discover our collection of premium digital products, ebooks, and learning resources designed to help you succeed in the digital world.
              </p>

              <div className="hero-cta flex flex-wrap gap-4 mb-10">
                <Button
                  size="lg"
                  className="btn-primary bg-[#2979FF] hover:bg-[#1E6AE0] text-white px-8 py-6 text-lg rounded-xl"
                  onClick={scrollToProducts}
                >
                  Browse Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10 px-8 py-6 text-lg rounded-xl"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>

              <div className="hero-stats flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2979FF]/10 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-[#2979FF]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0B1C3B]">12K+</p>
                    <p className="text-sm text-[#5A6E8F]">Downloads</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2979FF]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#2979FF]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0B1C3B]">5K+</p>
                    <p className="text-sm text-[#5A6E8F]">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div ref={imageRef} className="relative hidden lg:block">
              <div className="hero-image relative">
                {/* Main image container */}
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2979FF]/20 to-[#2979FF]/5 rounded-full blur-3xl" />

                  {/* Product cards floating */}
                  <div className="absolute top-[10%] left-[5%] w-32 h-40 bg-white rounded-2xl shadow-xl p-3 transform -rotate-6 animate-float">
                    <img
                      src="/product1.jpg"
                      alt="Product"
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-[#2979FF]/20 rounded w-1/2 mt-1" />
                  </div>

                  <div className="absolute top-[5%] right-[10%] w-28 h-36 bg-white rounded-2xl shadow-xl p-3 transform rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>
                    <img
                      src="/product3.jpg"
                      alt="Product"
                      className="w-full h-16 object-cover rounded-lg mb-2"
                    />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-[#2979FF]/20 rounded w-1/2 mt-1" />
                  </div>

                  <div className="absolute bottom-[20%] left-[0%] w-36 h-44 bg-white rounded-2xl shadow-xl p-3 transform rotate-6 animate-float" style={{ animationDelay: '1s' }}>
                    <img
                      src="/product16.jpg"
                      alt="Product"
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-[#2979FF]/20 rounded w-1/2 mt-1" />
                  </div>

                  <div className="absolute bottom-[10%] right-[5%] w-32 h-40 bg-white rounded-2xl shadow-xl p-3 transform -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}>
                    <img
                      src="/product20.jpg"
                      alt="Product"
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-[#2979FF]/20 rounded w-1/2 mt-1" />
                  </div>

                  {/* Center element */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[#2979FF] rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <p className="font-bold text-[#0B1C3B]">CODE REACH</p>
                      <p className="text-sm text-[#5A6E8F]">Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotate, 0deg)); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
