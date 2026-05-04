// cart.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  variant?: string;
  type?: 'regular' | 'custom';
  customDesign?: {
    productType: string;
    measure: string;
    images: string[];
    totalImages: number;
    specifications?: any;
    basePrice: number;
    imageCost: number;
    designData?: any;
  };
}

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  customerInfo?: CustomerInfo;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total      = 0;
  totalItems = 0;
  highlightedItem: number | null = null;

  showCheckout          = false;
  showOrderConfirmation = false;
  currentOrder?: Order;
  isProcessingPayment   = false;

  customerInfo: CustomerInfo = {
    name: '', email: '', phone: '', address: '', city: '', notes: ''
  };

  private isBrowserEnv: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowserEnv = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotals();
  }

  private loadCart(): void {
    if (!this.isBrowserEnv) return;
    try {
      const saved = localStorage.getItem('shoppingCart');
      if (saved) this.cartItems = JSON.parse(saved);
    } catch { this.cartItems = []; }
  }

  private saveCart(): void {
    if (!this.isBrowserEnv) return;
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
    window.dispatchEvent(new Event('storage'));
  }

  private calculateTotals(): void {
    this.total      = this.cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
    this.totalItems = this.cartItems.reduce((t, i) => t + i.quantity, 0);
  }

  private updateCart(): void {
    this.calculateTotals();
    this.saveCart();
  }

  removeItem(id: number | string): void {
    const idx = this.cartItems.findIndex(i => i.id === id);
    this.highlightedItem = idx;
    setTimeout(() => {
      this.cartItems = this.cartItems.filter(i => i.id !== id);
      this.updateCart();
      this.highlightedItem = null;
    }, 300);
  }

  updateQuantity(id: number | string, qty: number): void {
    if (qty <= 0) { this.removeItem(id); return; }
    const item = this.cartItems.find(i => i.id === id);
    if (item) { item.quantity = qty; this.updateCart(); }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartItems = [];
      this.updateCart();
    }
  }

  // ── CHECKOUT ──
  startCheckout(): void {
    if (!this.cartItems.length) return;
    this.showCheckout = true;
  }

  backToCart(): void {
    this.showCheckout  = false;
    this.customerInfo  = { name: '', email: '', phone: '', address: '', city: '', notes: '' };
  }

  processPayment(): void {
    if (!this.validateInfo()) return;
    this.isProcessingPayment = true;

    // Crear la orden y enviar por WhatsApp directamente
    setTimeout(() => {
      this.createOrder();
      this.showCheckout          = false;
      this.showOrderConfirmation = true;
      this.cartItems = [];
      this.updateCart();
      this.isProcessingPayment   = false;
    }, 800);
  }

  private validateInfo(): boolean {
    const { name, phone, address, city } = this.customerInfo;
    if (!name.trim())    { alert('Please enter your full name');    return false; }
    if (!phone.trim())   { alert('Please enter your phone number'); return false; }
    if (!address.trim()) { alert('Please enter your address');      return false; }
    if (!city.trim())    { alert('Please enter your city');         return false; }
    return true;
  }

  private createOrder(): void {
    const id = 'ORD-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    this.currentOrder = {
      id, date: new Date(),
      items: [...this.cartItems],
      total: this.total,
      customerInfo: { ...this.customerInfo },
      status: 'confirmed'
    };
    this.saveOrderToStorage(this.currentOrder);
    this.generateReceipt(this.currentOrder);
    this.sendOrderToOwner(this.currentOrder);
  }

  private saveOrderToStorage(order: Order): void {
    if (!this.isBrowserEnv) return;
    const orders = this.getStoredOrders();
    orders.push(order);
    localStorage.setItem('storeOrders', JSON.stringify(orders));
  }

  private getStoredOrders(): Order[] {
    if (!this.isBrowserEnv) return [];
    try { return JSON.parse(localStorage.getItem('storeOrders') || '[]'); }
    catch { return []; }
  }

  // ── RECEIPT ──
  generateReceipt(order: Order): void {
    const shipping = order.total > 100 ? 0 : 10;
    const tax      = order.total * 0.19;
    const finalTotal = order.total + tax + shipping;

    const content = `
SOULPRINT — CUSTOM SUBLIMATION
================================
ORDER RECEIPT
--------------------------------
Order #: ${order.id}
Date:    ${new Date(order.date).toLocaleString('en-US')}
Status:  Confirmed

CUSTOMER
--------------------------------
Name:    ${order.customerInfo?.name}
Email:   ${order.customerInfo?.email}
Phone:   ${order.customerInfo?.phone}
Address: ${order.customerInfo?.address}, ${order.customerInfo?.city}
Notes:   ${order.customerInfo?.notes || 'None'}

ITEMS
--------------------------------
${order.items.map((item, i) => {
  let line = `${i + 1}. ${item.name}
   Category: ${item.category}
   Price: $${item.price} × ${item.quantity} = $${item.price * item.quantity}`;
  if (item.variant) line += `\n   Variant: ${item.variant}`;
  if (item.customDesign) line += `
   [CUSTOM] ${item.customDesign.productType} · ${item.customDesign.measure}
   Images: ${item.customDesign.totalImages} · Base: $${item.customDesign.basePrice} · Images cost: $${item.customDesign.imageCost}`;
  return line;
}).join('\n')}

PRICING
--------------------------------
Subtotal: $${order.total.toFixed(2)}
Tax (19%): $${tax.toFixed(2)}
Shipping:  $${shipping.toFixed(2)}
TOTAL:     $${finalTotal.toFixed(2)}

DELIVERY
--------------------------------
Est. time: ${this.getOrderEstimatedDelivery(order.items)}
${this.hasCustomProducts() ? 'NOTE: We will contact you within 24h to confirm custom designs.' : ''}

Thank you for your order!
soulprint.com
`.trim();

    if (this.isBrowserEnv) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `receipt-${order.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  private sendOrderToOwner(order: Order): void {
    const info = order.customerInfo;
    const date = new Date(order.date).toLocaleString('en-US');

    // Línea por producto
    const itemLines = order.items.map((item, i) => {
      let line = `  ${i + 1}. ${item.name}`;
      if (item.variant)      line += ` (${item.variant})`;
      if (item.customDesign) line += ` [CUSTOM: ${item.customDesign.productType} · ${item.customDesign.measure}]`;
      line += `\n     Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`;
      return line;
    }).join('\n');

    const shipping = order.total > 100 ? 0 : 10;
    const tax      = order.total * 0.19;
    const finalTotal = (order.total + tax + shipping).toFixed(2);

    const msg =
`🛍️ *NEW ORDER — SoulPrint*
━━━━━━━━━━━━━━━━━━━━
📋 *Order:* ${order.id}
📅 *Date:* ${date}

👤 *CUSTOMER INFO*
• Name: ${info?.name}
• Phone: ${info?.phone}
• Email: ${info?.email || 'Not provided'}
• Address: ${info?.address}, ${info?.city}
${info?.notes ? `• Notes: ${info.notes}` : ''}
━━━━━━━━━━━━━━━━━━━━
🛒 *PRODUCTS ORDERED*
${itemLines}
━━━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY*
• Subtotal: $${order.total.toFixed(2)}
• Tax (19%): $${tax.toFixed(2)}
• Shipping: $${shipping.toFixed(2)}
• *TOTAL: $${finalTotal}*
━━━━━━━━━━━━━━━━━━━━
📦 Est. delivery: ${order.items.some(i => i.customDesign) ? '5–7 business days' : '2–3 business days'}

Please confirm this order and coordinate payment. Thank you! 🙏`;

    const phone = '573144242953'; // ← Reemplaza con tu número real
    if (this.isBrowserEnv) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  }

  finishOrder(): void {
    this.showOrderConfirmation = false;
    this.currentOrder = undefined;
    this.router.navigate(['/productos']);
  }

  // ── HELPERS ──
  hasCustomProducts(): boolean { return this.cartItems.some(i => i.customDesign); }
  getCustomProducts(): CartItem[] { return this.cartItems.filter(i => i.customDesign); }

  getEstimatedDelivery(): string {
    return this.cartItems.some(i => i.customDesign) ? '5–7 business days' : '2–3 business days';
  }

  getOrderEstimatedDelivery(items: CartItem[]): string {
    return items.some(i => i.customDesign) ? '5–7 business days (custom production)' : '2–3 business days';
  }
}
