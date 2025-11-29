export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'user' | 'admin';
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type PaymentConfirmationStatus = 'not_submitted' | 'pending_confirmation' | 'confirmed' | 'payment_failed';
export type PaymentMethod = 'razorpay' | 'manual' | 'qr_code';
export type Currency = 'USD' | 'INR';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  location: string | null;
  category: string | null;
  year: number | null;
  completion_date: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  product_id?: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  items: OrderItem[];
  total_amount: number;
  currency?: Currency;
  status: OrderStatus;
  payment_method?: PaymentMethod;
  payment_confirmation_status: PaymentConfirmationStatus;
  payment_submitted_at: string | null;
  payment_confirmed_at: string | null;
  payment_confirmed_by: string | null;
  payment_notes: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  exchange_rate: number | null;
  amount_in_usd: number | null;
  amount_in_inr: number | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  related_id: string | null;
  related_type: string | null;
  is_read: boolean;
  created_for_admin: boolean;
  created_at: string;
}

export interface RevenueStats {
  total_revenue: number;
  confirmed_orders: number;
  pending_orders: number;
  average_order_value: number;
  razorpay_revenue?: number;
  razorpay_count?: number;
  manual_revenue?: number;
  manual_count?: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}


