import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #EAF4FF 100%)' }}
    >
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="testimonials-header text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3B] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#5A6E8F] max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our digital products.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#2979FF]/10 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-[#2979FF]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#0B1C3B] mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2979FF] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1C3B]">{testimonial.name}</p>
                    <p className="text-sm text-[#5A6E8F]">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
