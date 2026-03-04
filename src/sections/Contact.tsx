import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { companyInfo } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-info',
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
        '.contact-form',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: `${companyInfo.address}, ${companyInfo.city}, ${companyInfo.state} ${companyInfo.zip}`,
      href: '#',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM (MST)',
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #EAF4FF 100%)' }}
    >
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3B] mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-[#5A6E8F] max-w-2xl mx-auto">
              Have a question or need assistance? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info">
              <h3 className="text-2xl font-bold text-[#0B1C3B] mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[#2979FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#2979FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#5A6E8F]">{item.label}</p>
                      <p className="font-semibold text-[#0B1C3B]">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#2979FF] mx-auto mb-2" />
                    <p className="font-semibold text-[#0B1C3B]">{companyInfo.name}</p>
                    <p className="text-sm text-[#5A6E8F]">{companyInfo.city}, {companyInfo.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-[#0B1C3B] mb-6">Send us a Message</h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0B1C3B] mb-2">Message Sent!</h4>
                    <p className="text-[#5A6E8F]">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                          Your Name
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2979FF] focus:ring-[#2979FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2979FF] focus:ring-[#2979FF]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="How can we help?"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#2979FF] focus:ring-[#2979FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-xl border-gray-200 focus:border-[#2979FF] focus:ring-[#2979FF] resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full btn-primary bg-[#2979FF] hover:bg-[#1E6AE0] h-12 text-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
