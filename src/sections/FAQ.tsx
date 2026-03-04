import { useEffect, useRef } from 'react';
import { faqs } from '@/data/products';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
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
        '.faq-accordion',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-accordion',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F6FAFF 100%)' }}
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Header */}
            <div className="faq-header">
              <span className="inline-block px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3B] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#5A6E8F] mb-6">
                Find answers to common questions about our digital products, delivery, and support.
              </p>
              <p className="text-[#5A6E8F]">
                Can't find what you're looking for? Feel free to{' '}
                <a href="#contact" className="text-[#2979FF] font-semibold hover:underline">
                  contact our support team
                </a>{' '}
                and we'll be happy to help.
              </p>
            </div>

            {/* Accordion */}
            <div className="faq-accordion">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl px-6 border border-gray-100 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#0B1C3B] hover:text-[#2979FF] py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#5A6E8F] pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
