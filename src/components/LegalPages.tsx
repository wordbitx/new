import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { companyInfo } from '@/data/products';

interface LegalPagesProps {
  currentPage: string | null;
  onClose: () => void;
}

export function LegalPages({ currentPage, onClose }: LegalPagesProps) {
  if (!currentPage) return null;

  const pages: Record<string, { title: string; content: React.ReactNode }> = {
    terms: {
      title: 'Terms of Service',
      content: (
        <div className="space-y-6 text-[#5A6E8F]">
          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the services provided by {companyInfo.name} ("we," "us," or "our"), 
              you agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use our services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">2. Description of Services</h3>
            <p>
              {companyInfo.name} provides digital products including but not limited to ebooks, 
              templates, guides, and educational materials. All products are delivered digitally 
              via email or download links.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">3. Purchase and Payment</h3>
            <p>
              All prices are listed in US dollars. Payment must be made in full before product 
              delivery. We accept major credit cards and PayPal. By making a purchase, you 
              represent that you have the legal right to use the payment method provided.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">4. Intellectual Property</h3>
            <p>
              All content, products, and materials available on our website are the property of 
              {companyInfo.name} and are protected by copyright, trademark, and other intellectual 
              property laws. Purchase of a product grants you a personal, non-exclusive, 
              non-transferable license to use the product.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">5. Prohibited Uses</h3>
            <p>You may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Resell, redistribute, or share our products without authorization</li>
              <li>Modify, adapt, or create derivative works from our products</li>
              <li>Use our products for any illegal or unauthorized purpose</li>
              <li>Remove copyright notices or watermarks from our products</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">6. Limitation of Liability</h3>
            <p>
              {companyInfo.name} shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of our products or services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">7. Contact Information</h3>
            <p>
              For any questions regarding these Terms of Service, please contact us at:<br />
              Email: {companyInfo.email}<br />
              Phone: {companyInfo.phone}<br />
              Address: {companyInfo.address}, {companyInfo.city}, {companyInfo.state} {companyInfo.zip}
            </p>
          </section>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-6 text-[#5A6E8F]">
          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">1. Information We Collect</h3>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and billing information when you make a purchase.</li>
              <li><strong>Payment Information:</strong> Credit card details processed securely through our payment processors.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website and products.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">2. How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process and deliver your orders</li>
              <li>Send order confirmations and product delivery emails</li>
              <li>Provide customer support</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">3. Information Sharing</h3>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may 
              share your information with trusted service providers who assist us in operating 
              our website and conducting our business.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information. 
              All payment transactions are processed through secure, encrypted connections.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">5. Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">6. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
              Email: {companyInfo.email}<br />
              Phone: {companyInfo.phone}
            </p>
          </section>
        </div>
      ),
    },
    cookies: {
      title: 'Cookie Policy',
      content: (
        <div className="space-y-6 text-[#5A6E8F]">
          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">1. What Are Cookies</h3>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our site.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">2. Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">3. How to Manage Cookies</h3>
            <p>
              You can control and manage cookies through your browser settings. Please note that 
              disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">4. Third-Party Cookies</h3>
            <p>
              We may use third-party services that place cookies on your device. These include 
              analytics providers and payment processors. These third parties have their own 
              privacy and cookie policies.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">5. Contact Us</h3>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:<br />
              Email: {companyInfo.email}
            </p>
          </section>
        </div>
      ),
    },
    refund: {
      title: 'Refund Policy',
      content: (
        <div className="space-y-6 text-[#5A6E8F]">
          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">1. Overview</h3>
            <p>
              At {companyInfo.name}, we strive to ensure your satisfaction with every purchase. 
              Due to the digital nature of our products, we have specific guidelines for refunds.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">2. Refund Eligibility</h3>
            <p>We offer refunds under the following conditions:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The product was not delivered due to technical issues</li>
              <li>The product description was significantly inaccurate</li>
              <li>The product files are corrupted or inaccessible</li>
              <li>Refund request is made within 30 days of purchase</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">3. Non-Refundable Items</h3>
            <p>Refunds will not be provided for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Products that have been downloaded and accessed</li>
              <li>Change of mind after purchase</li>
              <li>Compatibility issues not related to product defects</li>
              <li>Products purchased more than 30 days ago</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">4. How to Request a Refund</h3>
            <p>To request a refund:</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Contact us at {companyInfo.email} with your order number</li>
              <li>Explain the reason for your refund request</li>
              <li>Include any relevant screenshots or documentation</li>
              <li>Allow 3-5 business days for our team to review your request</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">5. Refund Processing</h3>
            <p>
              Approved refunds will be processed to the original payment method within 5-10 
              business days. The timing may vary depending on your payment provider.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#0B1C3B] mb-3">6. Contact Information</h3>
            <p>
              For refund inquiries, please contact us at:<br />
              Email: {companyInfo.email}<br />
              Phone: {companyInfo.phone}
            </p>
          </section>
        </div>
      ),
    },
  };

  const page = pages[currentPage];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="section-padding py-8">
        <div className="container-max max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-[#0B1C3B]">{page.title}</h1>
          </div>
          <div className="prose prose-lg max-w-none">
            {page.content}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
