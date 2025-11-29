export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'user' | 'admin';
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type PaymentConfirmationStatus = 'not_submitted' | 'pending_confirmation' | 'confirmed' | 'payment_failed';

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
  currency: string;
  status: OrderStatus;
  payment_confirmation_status: PaymentConfirmationStatus;
  payment_submitted_at: string | null;
  payment_confirmed_at: string | null;
  payment_confirmed_by: string | null;
  payment_notes: string | null;
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

