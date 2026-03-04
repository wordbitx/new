import { useEffect, useRef } from 'react';
import { Target, Lightbulb, Heart, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companyInfo } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.about-image',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide high-quality digital products that empower individuals and businesses to achieve their goals.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly evolve our products to stay ahead of trends and deliver cutting-edge solutions.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your success is our priority. We are committed to providing exceptional support and value.',
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'All our products are delivered instantly via email, so you can start using them right away.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F6FAFF 100%)' }}
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Content */}
            <div className="about-content">
              <span className="inline-block px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-4">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3B] mb-6">
                Welcome to {companyInfo.name}
              </h2>
              <p className="text-lg text-[#5A6E8F] mb-6">
                We are a digital products company dedicated to creating high-quality resources 
                that help individuals and businesses grow. From social media tools to educational 
                materials for children, our products are designed with care and expertise.
              </p>
              <p className="text-lg text-[#5A6E8F] mb-8">
                Based in Denver, Colorado, we serve customers worldwide with instant digital 
                delivery and exceptional customer support. Our team is passionate about creating 
                products that make a real difference in people's lives.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <p className="text-3xl font-bold text-[#2979FF]">20+</p>
                  <p className="text-[#5A6E8F]">Digital Products</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <p className="text-3xl font-bold text-[#2979FF]">12K+</p>
                  <p className="text-[#5A6E8F]">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="about-image relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2979FF]/20 to-[#2979FF]/5 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 aspect-square flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-[#2979FF] rounded-3xl flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-5xl">CR</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1C3B] mb-2">{companyInfo.name}</h3>
                  <p className="text-[#5A6E8F] text-center mb-4">
                    {companyInfo.address}<br />
                    {companyInfo.city}, {companyInfo.state} {companyInfo.zip}
                  </p>
                  <div className="text-center text-sm text-[#5A6E8F]">
                    <p>EIN: {companyInfo.ein}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#2979FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-[#2979FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1C3B] mb-2">{value.title}</h3>
                <p className="text-[#5A6E8F]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
