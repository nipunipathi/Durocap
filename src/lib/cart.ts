import type { CartItem, Product } from "@/types";

const CART_KEY = "roofing_cart";

export const cartUtils = {
  getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  },

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addToCart(product: Product, quantity = 1): CartItem[] {
    const cart = this.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.saveCart(cart);
    return cart;
  },

  removeFromCart(productId: string): CartItem[] {
    const cart = this.getCart().filter((item) => item.id !== productId);
    this.saveCart(cart);
    return cart;
  },

  updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart();
    const item = cart.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      item.quantity = quantity;
      this.saveCart(cart);
    }

    return cart;
  },

  clearCart(): void {
    localStorage.removeItem(CART_KEY);
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
};
