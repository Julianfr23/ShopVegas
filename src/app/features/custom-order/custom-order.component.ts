// custom-order.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-custom-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.css'],
})
export class CustomOrderComponent {

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  form = {
    product:      '',
    productLabel: '',
    size:         '',
    sizePrice:    0,
    quantity:     1,
    description:  '',
    name:         '',
    phone:        '',
    email:        '',
  };

  products = [
    {
      id: 'MOUSE PAD', label: 'Mouse Pad', icon: 'bi-mouse', fromPrice: 18.99,
      sizes: [
        { label: 'S — 11" x 8.5"', price: 18.99 },
        { label: 'M — 14" x 11"',  price: 49.99 },
      ]
    },
    {
      id: 'DESKMAT', label: 'Desk Mat', icon: 'bi-display', fromPrice: 32.00,
      sizes: [
        { label: 'M — 24" x 14"', price: 32.00 },
        { label: 'L — 36" x 18"', price: 36.00 },
      ]
    },
    {
      id: 'FLEECE BLANKET', label: 'Fleece Blanket', icon: 'bi-house-heart', fromPrice: 25.00,
      sizes: [
        { label: 'S — 30" x 40"', price: 25.00 },
        { label: 'M — 50" x 60"', price: 36.00 },
        { label: 'L — 60" x 80"', price: 48.00 },
      ]
    },
    {
      id: 'SHERPA BLANKET', label: 'Sherpa Blanket', icon: 'bi-snow', fromPrice: 28.00,
      sizes: [
        { label: 'S — 30" x 40"', price: 28.00 },
        { label: 'M — 50" x 60"', price: 45.00 },
        { label: 'L — 60" x 80"', price: 56.00 },
      ]
    },
    {
      id: 'APRON', label: 'Apron', icon: 'bi-scissors', fromPrice: 25.00,
      sizes: [
        { label: 'One Size', price: 25.00 },
      ]
    },
  ];

  currentSizes: { label: string; price: number }[] = [];

  selectProduct(p: typeof this.products[0]): void {
    this.form.product      = p.id;
    this.form.productLabel = p.label;
    this.form.size         = '';
    this.form.sizePrice    = 0;
    this.currentSizes      = p.sizes;
    if (p.sizes.length === 1) this.selectSize(p.sizes[0]);
  }

  selectSize(s: { label: string; price: number }): void {
    this.form.size      = s.label;
    this.form.sizePrice = s.price;
  }

  changeQty(delta: number): void {
    const next = this.form.quantity + delta;
    if (next >= 1 && next <= 99) this.form.quantity = next;
  }

  get estimatedFrom(): string {
    return (this.form.sizePrice * this.form.quantity).toFixed(2);
  }

  sendToWhatsApp(): void {
    if (!this.form.product || !this.form.size || !this.form.name || !this.form.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

        const DIV = '\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC';

    const lines = [
      '\u2728 CUSTOM ORDER REQUEST \u2014 SoulPrint \u2728',
      DIV,
      '\u{1F4E6} Request Date: ' + today,
      '\u{1F464} CUSTOMER DETAILS',
      '\u00BB Name: '  + this.form.name,
      '\u00BB Phone: ' + this.form.phone,
      this.form.email ? '\u00BB Email: ' + this.form.email : '',
      DIV,
      '\u{1F6CD} PRODUCT DETAILS',
      '\u00BB Product: '   + this.form.productLabel,
      '\u00BB Size: '      + this.form.size,
      '\u00BB Quantity: '  + this.form.quantity + ' unit' + (this.form.quantity !== 1 ? 's' : ''),
      '\u00BB Price: from $' + this.form.sizePrice.toFixed(2) + ' per unit',
      DIV,
      '\u{1F4B0} ESTIMATED TOTAL: from $' + this.estimatedFrom,
      '\u2139 Final price depends on design complexity.',
      DIV,
      '\u{1F3A8} DESIGN DESCRIPTION',
      this.form.description || '(No description \u2014 will discuss via WhatsApp)',
      DIV,
      '\u{1F4CE} If you have a reference image, send it in this chat!',
      '\u26A0 This is an estimate. Final quote confirmed after design review.',
      '\u2728 Thank you for choosing SoulPrint.',
      "We'll contact you shortly to confirm your design and finalize the price.",
      '\u2014 SoulPrint Team \u{1F49C}',
    ].filter(Boolean).join('\n');

    const phone = '573144242953';
    if (this.isBrowser) {
      window.open('https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent(lines), '_blank');
    }
  }
}
