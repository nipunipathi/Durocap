import { supabase } from "./supabase";
import type { Product, Service, Project, Order, ContactInquiry, Profile, Notification, RevenueStats } from "@/types";

export const api = {
  products: {
    async getAll(activeOnly = false) {
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async getByCategory(category: string, activeOnly = true) {
      let query = supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getCategories() {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .eq("is_active", true);
      
      if (error) throw error;
      const categories = Array.isArray(data) 
        ? [...new Set(data.map(p => p.category))]
        : [];
      return categories;
    },

    async create(product: Omit<Product, "id" | "created_at" | "updated_at">) {
      const { data, error } = await supabase
        .from("products")
        .insert({
          ...product,
          stock: product.stock || 0,
          is_active: product.is_active ?? true,
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<Product>) {
      const { data, error } = await supabase
        .from("products")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },

  services: {
    async getAll(activeOnly = false) {
      let query = supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async create(service: Omit<Service, "id" | "created_at" | "updated_at">) {
      const { data, error } = await supabase
        .from("services")
        .insert({
          ...service,
          is_active: service.is_active ?? true,
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<Service>) {
      const { data, error } = await supabase
        .from("services")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },

  projects: {
    async getAll(featuredOnly = false) {
      let query = supabase
        .from("projects")
        .select("*")
        .order("completion_date", { ascending: false });
      
      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async create(project: Omit<Project, "id" | "created_at" | "updated_at">) {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          ...project,
          is_featured: project.is_featured ?? false,
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<Project>) {
      const { data, error } = await supabase
        .from("projects")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },

  orders: {
    async getAll() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getByUserId(userId: string) {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async updateStatus(id: string, status: string) {
      const { data, error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },

    async submitPaymentConfirmation(orderId: string) {
      const { data, error } = await supabase.rpc("submit_payment_confirmation", {
        order_id: orderId,
      });
      if (error) throw error;
      return data;
    },

    async confirmPayment(orderId: string, notes?: string) {
      const { data, error } = await supabase.rpc("confirm_payment", {
        order_id: orderId,
        notes: notes || null,
      });
      if (error) throw error;
      return data;
    },

    async rejectPayment(orderId: string, notes?: string) {
      const { data, error } = await supabase.rpc("reject_payment", {
        order_id: orderId,
        notes: notes || null,
      });
      if (error) throw error;
      return data;
    },

    async getRevenueStats(startDate?: string, endDate?: string) {
      const { data, error } = await supabase.rpc("get_revenue_stats", {
        start_date: startDate || null,
        end_date: endDate || null,
      });
      if (error) throw error;
      return data;
    },
  },

  notifications: {
    async getAll() {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getUnread() {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("is_read", false)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async markAsRead(id: string) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
    },

    async markAllAsRead() {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("is_read", false);
      if (error) throw error;
    },
  },

  contactInquiries: {
    async getAll() {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async create(inquiry: Omit<ContactInquiry, "id" | "created_at" | "status">) {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .insert({
          ...inquiry,
          status: "new",
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async updateStatus(id: string, status: string) {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .update({ status })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from("contact_inquiries")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },

  profiles: {
    async getAll() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async updateRole(id: string, role: string) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<Profile>) {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  },

  payment: {
    async createCheckout(items: any[], token?: string) {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await supabase.functions.invoke("create_stripe_checkout", {
        body: JSON.stringify({ items }),
        headers,
      });

      if (response.error) {
        const errorMsg = await response.error?.context?.text();
        throw new Error(errorMsg || "Failed to create checkout session");
      }

      return response.data;
    },

    async verifyPayment(sessionId: string) {
      const response = await supabase.functions.invoke("verify_stripe_payment", {
        body: JSON.stringify({ sessionId }),
      });

      if (response.error) {
        const errorMsg = await response.error?.context?.text();
        throw new Error(errorMsg || "Failed to verify payment");
      }

      return response.data;
    },
  },
};
