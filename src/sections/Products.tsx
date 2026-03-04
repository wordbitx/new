import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Eye, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductsProps {
  onProductClick?: (product: Product) => void;
}

export function Products({ onProductClick }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Social Media', 'Ebook', 'Kids Learning', 'Marketing', 'Design'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-header',
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
        '.product-card-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #EAF4FF 100%)' }}
    >
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="products-header text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#2979FF]/10 text-[#2979FF] rounded-full text-sm font-semibold mb-4">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3B] mb-4">
              Browse Our Digital Collection
            </h2>
            <p className="text-lg text-[#5A6E8F] max-w-2xl mx-auto">
              Choose from our wide range of digital products, ebooks, and learning resources designed to help you grow.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md mx-auto md:mx-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A6E8F]" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#2979FF] focus:ring-[#2979FF]"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#2979FF] text-white'
                      : 'bg-white text-[#5A6E8F] hover:bg-[#2979FF]/10 hover:text-[#2979FF]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card-item product-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer"
                onClick={() => onProductClick && onProductClick(product)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0B1C3B] px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    Quick View
                  </button>

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2979FF] text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#0B1C3B] mb-2 line-clamp-1 group-hover:text-[#2979FF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#5A6E8F] mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#2979FF]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className={`btn-primary rounded-xl ${
                        addedToCart === product.id
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-[#2979FF] hover:bg-[#1E6AE0]'
                      }`}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {addedToCart === product.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy Now
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-[#5A6E8F] mt-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {product.deliveryMethod}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-[#5A6E8F]">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="max-w-2xl">
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#0B1C3B]">
                  {quickViewProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="inline-block px-3 py-1 bg-[#2979FF]/10 text-[#2979FF] text-sm font-semibold rounded-full w-fit mb-4">
                    {quickViewProduct.category}
                  </span>
                  <p className="text-[#5A6E8F] mb-4">{quickViewProduct.description}</p>
                  <p className="text-sm text-[#5A6E8F] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {quickViewProduct.deliveryMethod}
                  </p>
                  <div className="mt-auto">
                    <p className="text-3xl font-bold text-[#2979FF] mb-4">
                      ${quickViewProduct.price.toFixed(2)}
                    </p>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 btn-primary bg-[#2979FF] hover:bg-[#1E6AE0]"
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10"
                        onClick={() => {
                          setQuickViewProduct(null);
                          if (onProductClick) onProductClick(quickViewProduct);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
