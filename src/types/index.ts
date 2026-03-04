export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  deliveryMethod: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderNumber?: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ein: string;
  website: string;
  email: string;
  phone: string;
}
