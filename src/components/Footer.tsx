import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { companyInfo } from '@/data/products';

interface FooterProps {
  onLegalClick: (page: string) => void;
}

export function Footer({ onLegalClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'Social Media Tools', href: '#products' },
      { label: 'Ebooks', href: '#products' },
      { label: 'Kids Learning', href: '#products' },
      { label: 'Marketing', href: '#products' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Terms of Service', page: 'terms' },
      { label: 'Privacy Policy', page: 'privacy' },
      { label: 'Cookie Policy', page: 'cookies' },
      { label: 'Refund Policy', page: 'refund' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0B1C3B] text-white">
      <div className="section-padding py-16">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#2979FF] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CR</span>
                </div>
                <span className="font-bold text-2xl">{companyInfo.name}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Premium digital products and services designed to help you grow your brand, 
                learn new skills, and achieve your goals.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2979FF] transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold text-lg mb-4">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-[#2979FF] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-[#2979FF] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onLegalClick(link.page)}
                      className="text-gray-400 hover:text-[#2979FF] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>{companyInfo.address}</span>
              <span>•</span>
              <span>{companyInfo.city}, {companyInfo.state} {companyInfo.zip}</span>
              <span>•</span>
              <span>EIN: {companyInfo.ein}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
