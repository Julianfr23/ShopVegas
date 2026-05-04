// product-detail.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface ProductFeature { title: string; desc: string; }

export interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  image: string;
  images?: string[];
  variants?: { label: string; price: number }[];
  features?: ProductFeature[];
  care?: string[];
  inspirate?: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  variant?: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  selectedProduct?: Product;
  selectedImage    = '';
  selectedVariantPrice?: number;
  selectedVariantLabel?: string;
  quantity         = 1;
  isAddingToCart   = false;
  showNotification = false;

  accOpen: { [key: string]: boolean } = {
    features: true,
    care:     false,
    size:     false,
  };

  // ══════════════════════════════════════════════════
  // VARIANTES POR TIPO DE PRODUCTO
  // Solo edita aquí cuando cambien los precios
  // ══════════════════════════════════════════════════
  private variantsByType: { [key: string]: { label: string; price: number }[] } = {
    'MOUSE PAD': [
      { label: 'S',  price: 18.99 },
      { label: 'M',   price: 49.99 },
    ],
    'DESKMAT': [
      { label: 'M ',   price: 32.00 },
      { label: 'L ',   price: 36.00 },
    ],
    'FLEECE BLANKET': [
      { label: 'S ',   price: 25.00 },
      { label: 'M',   price: 36.00 },
      { label: 'L ',   price: 48.00 },
    ],
    'SHERPA BLANKET': [
      { label: 'S',   price: 28.00 },
      { label: 'M ',   price: 45.00 },
      { label: 'L',   price: 56.00 },
    ],
    'APRON': [
      { label: 'One Size',         price: 25.00 },
    ],
  };

  // ══════════════════════════════════════════════════
  // FEATURES POR TIPO DE PRODUCTO
  // ══════════════════════════════════════════════════
  private descriptionByType: { [key: string]: string } = {
    'MOUSE PAD':      'Transform your space with a personalized mouse pad that combines style and functionality. Its smooth polyester surface ensures precision and comfort, while the 3mm non-slip rubber base keeps everything in place. Finished with black stitched edges for extra durability, it\'s built to last. Fully customizable — add your own image, logo, or text, or get inspired by our designs to make it uniquely yours.',
    'DESKMAT':        'Enhance your workspace or gaming setup with a personalized desk mat that blends precision, comfort, and modern style. Designed for smooth mouse movement and daily durability, it features a vibrant, full-color print that makes your setup uniquely yours. The non-slip rubber base ensures stability, while the stitched edges keep it sleek and resistant to wear. Perfect for gaming, editing, or everyday use — where performance meets personality.',
    'FLEECE BLANKET': 'Wrap yourself in warmth and personality with our Custom Fleece Blanket. Crafted from ultra-soft 100% polyester fleece, it\'s lightweight yet cozy — perfect for movie nights, naps, or as a thoughtful personalized gift. Available in three versatile sizes with full-color edge-to-edge printing, it combines comfort and creativity to make every space feel uniquely yours.',
    'SHERPA BLANKET': 'Experience next-level coziness with our Custom Sherpa Fleece Blanket — where warmth meets personal style. The front showcases your custom design on smooth polyester fleece, while the back features ultra-soft, fluffy Sherpa for the ultimate comfort. Available in three versatile sizes and two cozy base colors, it\'s perfect for relaxing on the couch, elevating your bedroom decor, or gifting something truly personal.',
    'APRON':          'Cook, Create & Craft with Personality — Bring style to every project with our Custom All-Over Print Apron. Made from durable yet lightweight 100% polyester canvas, it showcases your design in bold, edge-to-edge color. With five strap color options — black, white, beige, blue, or pink — this apron adds a personalized touch to cooking, baking, grilling, or crafting. Designed for comfort, coverage, and creativity.',
  };

  private featuresByType: { [key: string]: ProductFeature[] } = {
    'MOUSE PAD': [
      { title: 'Smooth polyester surface',  desc: 'Ensures precision and comfort with every mouse movement.'          },
      { title: '3mm non-slip rubber base',  desc: 'Keeps the pad firmly in place on any desk surface.'               },
      { title: 'Black stitched edges',      desc: 'Extra durability — prevents fraying and adds a clean modern look.' },
      { title: 'High-definition print',     desc: 'Full-color edge-to-edge sublimation, sharp and vibrant.'          },
      { title: 'Easy to clean',             desc: 'Wipe clean or hand wash with mild soap and cold water.'           },
    ],
    'DESKMAT': [
      { title: 'Extended desk coverage',    desc: 'Covers keyboard, mouse and accessories in one seamless surface.'  },
      { title: 'Non-slip rubber base',      desc: 'Stays perfectly in place — no sliding, no shifting.'             },
      { title: 'Smooth precision surface',  desc: 'Optimized for both optical and laser mice.'                       },
      { title: 'Reinforced stitched edges', desc: 'Sleek, durable finish that resists fraying over time.'            },
      { title: 'Full sublimation print',    desc: 'Vibrant edge-to-edge color that won\'t fade with use.'            },
    ],
    'FLEECE BLANKET': [
      { title: '100% polyester fleece',     desc: 'Ultra-soft, lightweight and cozy for all seasons.'                },
      { title: 'Edge-to-edge print',        desc: 'Full-color sublimation with no white borders.'                    },
      { title: 'Fade-resistant colors',     desc: 'Vibrant print stays vivid wash after wash.'                       },
      { title: 'Three sizes available',     desc: 'S, M and L to fit any space or need.'                             },
      { title: 'Fully customizable',        desc: 'Upload your photo, logo or choose from our catalog.'              },
    ],
    'SHERPA BLANKET': [
      { title: 'Polyester fleece front',    desc: 'Smooth surface showcases your custom design in vibrant color.'    },
      { title: 'Ultra-soft Sherpa back',    desc: 'Fluffy Sherpa reverse for next-level warmth and comfort.'         },
      { title: 'Two base color options',    desc: 'Available in white or natural to complement any decor.'           },
      { title: 'Three sizes available',     desc: 'S, M and L — perfect for couch, bed or gifting.'                  },
      { title: 'Fully customizable',        desc: 'Your design, photo or artwork printed edge to edge.'              },
    ],
    'APRON': [
      { title: '100% polyester canvas',     desc: 'Durable yet lightweight — built for everyday use.'                },
      { title: 'Edge-to-edge print',        desc: 'Bold full-color sublimation across the entire apron.'             },
      { title: '5 strap color options',     desc: 'Choose black, white, beige, blue, or pink straps.'                },
      { title: 'Adjustable neck strap',     desc: 'Fits all body types comfortably.'                                 },
      { title: 'Fade-resistant colors',     desc: 'Sublimation print stays vibrant wash after wash.'                 },
    ],
  };

  // ══════════════════════════════════════════════════
  // CARE INSTRUCTIONS POR TIPO
  // ══════════════════════════════════════════════════
  private careByType: { [key: string]: string[] } = {
    'MOUSE PAD': [
      'Hand wash with cold water and mild soap.',
      'Do not machine wash or submerge in water.',
      'Air dry flat — do not tumble dry.',
      'Do not iron.',
      'Avoid prolonged exposure to direct sunlight.',
    ],
    'DESKMAT': [
      'Spot clean with a damp cloth and mild soap.',
      'Do not submerge in water or machine wash.',
      'Air dry completely before use.',
      'Do not iron or use harsh chemicals.',
      'Store rolled, not folded, to prevent creasing.',
    ],
    'FLEECE BLANKET': [
      'Machine wash cold on gentle cycle.',
      'Use mild detergent — do not bleach.',
      'Tumble dry on low heat.',
      'Do not iron directly on the printed surface.',
      'Colors are sublimation-locked and fade-resistant.',
    ],
    'SHERPA BLANKET': [
      'Machine wash cold on gentle cycle.',
      'Use mild detergent — do not bleach.',
      'Tumble dry on low heat to preserve Sherpa texture.',
      'Do not iron.',
      'Wash separately for first wash to preserve colors.',
    ],
    'APRON': [
      'Machine wash cold.',
      'Tumble dry low.',
      'Do not bleach.',
      'Do not iron on printed areas.',
      'Colors are fade-resistant under normal washing.',
    ],
  };

  // ══════════════════════════════════════════════════
  // INSPIRATE POR TIPO (imágenes relacionadas)
  // ══════════════════════════════════════════════════
  private inspirateByType: { [key: string]: string[] } = {
    'MOUSE PAD': [
      'assets/images/gamer/mousepad1.PNG',
      'assets/images/gamer/mousepad2.PNG',
      'assets/images/gamer/mousepad3.PNG',
      'assets/images/gamer/mousepad4.PNG',
      'assets/images/gamer/mousepad5.PNG',
      'assets/images/gamer/mousepad6.PNG',
    ],
    'DESKMAT': [
      'assets/images/gamer/deskmat1.png',
      'assets/images/gamer/deskmat2.png',
      'assets/images/gamer/deskmat3.png',
      'assets/images/gamer/deskmat4.png',
      'assets/images/gamer/deskmat5.png',
      'assets/images/gamer/deskmat6.png',
    ],
    'FLEECE BLANKET': [
      'assets/images/home/blanket1.jpg',
      'assets/images/home/blanket2.png',
      'assets/images/home/blanket3.png',
      'assets/images/home/blanket4.jpg',
      'assets/images/home/blanket5.png',
      'assets/images/home/blanket6.jpg',
    ],
    'SHERPA BLANKET': [
      'assets/images/home/blanket7.png',
      'assets/images/home/blanket8.jpg',
      'assets/images/home/blanket9.jpg',
      'assets/images/home/blanket10.png',
      'assets/images/home/blanket11.jpg',
      'assets/images/home/blanket12.jpg',
    ],
    'APRON': [
      'assets/images/home/apron1.png',
      'assets/images/home/apron2.png',
      'assets/images/home/apron3.png',
      'assets/images/home/apron4.png',
      'assets/images/home/apron5.png',
    ],
  };

  // Defaults por si el tipo no está definido arriba
  defaultFeatures: ProductFeature[] = [
    { title: 'Premium materials',     desc: 'High-quality sublimation print for lasting vibrancy.'   },
    { title: 'Custom design',         desc: 'Upload your own image or choose from our catalog.'       },
    { title: 'Vibrant colors',        desc: 'Edge-to-edge full color print that stays vivid.'         },
    { title: 'Durable',               desc: 'Built to last with premium sublimation technology.'      },
  ];

  defaultCare: string[] = [
    'Hand wash recommended with cold water.',
    'Do not bleach or tumble dry.',
    'Air dry flat to maintain shape.',
    'Do not iron directly on the printed surface.',
  ];

  private isBrowser: boolean;

  // ══════════════════════════════════════════════════
  // CATÁLOGO — copia aquí los mismos productos
  // que tienes en product-list.component.ts
  // Solo necesitas: id, name, category, price, image
  // Los variants/features/care/inspirate se asignan
  // automáticamente por tipo en ngOnInit
  // ══════════════════════════════════════════════════
  products: Product[] = [
    // ── GAMING ──
    { id: 1,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad1.PNG'  },
    { id: 2,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad2.PNG'  },
    { id: 3,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad3.PNG'  },
    { id: 4,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad4.PNG'  },
    { id: 5,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad5.PNG'  },
    { id: 6,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad6.PNG'  },
    { id: 7,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad7.PNG'  },
    { id: 8,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad8.png'  },
    { id: 9,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad9.png'  },
    { id: 10, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad10.png' },
    { id: 11, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad11.png' },
    { id: 12, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad12.png' },
    { id: 13, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat1.png'   },
    { id: 14, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat2.png'   },
    { id: 15, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat3.png'   },
    { id: 16, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat4.png'   },
    { id: 17, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat5.png'   },
    { id: 18, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat6.png'   },
    { id: 19, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat7.png'   },
    { id: 20, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat8.png'   },
    { id: 21, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat9.png'   },
    { id: 22, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat10.png'  },
    { id: 23, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat11.png'  },
    { id: 24, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat12.png'  },
    { id: 25, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat13.png'  },
    { id: 26, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat14.png'  },
    { id: 27, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat15.png'  },
    { id: 28, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat16.png'  },
    { id: 29, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat17.png'  },
    { id: 30, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat18.png'  },
    // ── HOME ──
    { id: 31, name: 'APRON',     category: 'Home',   price: 25.00, image: 'assets/images/home/apron1.png'      },
    { id: 32, name: 'APRON',     category: 'Home',   price: 25.00, image: 'assets/images/home/apron2.png'      },
    { id: 33, name: 'APRON',     category: 'Home',   price: 25.00, image: 'assets/images/home/apron3.png'      },
    { id: 34, name: 'APRON',     category: 'Home',   price: 25.00, image: 'assets/images/home/apron4.png'      },
    { id: 35, name: 'APRON',     category: 'Home',   price: 25.00, image: 'assets/images/home/apron5.png'      },
    { id: 36, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket1.jpg'   },
    { id: 37, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket2.png'   },
    { id: 38, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket3.png'   },
    { id: 39, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket4.jpg'   },
    { id: 40, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket5.png'   },
    { id: 41, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket6.jpg'   },
    { id: 42, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket7.png'   },
    { id: 43, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket8.jpg'   },
    { id: 44, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket9.jpg'   },
    { id: 45, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket10.png'  },
    { id: 46, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket11.jpg'  },
    { id: 47, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket12.jpg'  },
    { id: 48, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket13.jpeg' },
    { id: 49, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket14.jpeg' },
    { id: 50, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket15.JPG'  },
    { id: 51, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket16.png'  },
    { id: 52, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket17.png'  },
    { id: 53, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket18.png'  },
    { id: 54, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket19.png'  },
    { id: 55, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket20.jpg'  },
    { id: 56, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket21.png'  },
    { id: 57, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket22.jpg'  },
    { id: 58, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket23.jpg'  },
    { id: 59, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket24.jpg'  },
    { id: 60, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket25.jpg'  },
    { id: 61, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket26.jpg'  },
    { id: 62, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket27.jpg'  },
    { id: 63, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket28.jpg'  },
    { id: 64, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket29.jpg'  },
    { id: 65, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket30.jpg'  },
    { id: 66, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket31.jpg'  },
    { id: 67, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket32.png'  },
    { id: 68, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket33.jpg'  },
    { id: 69, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket34.jpg'  },
    { id: 70, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket35.jpg'  },
    { id: 71, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket36.jpg'  },
    { id: 72, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket37.jpg'  },
    { id: 73, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket38.jpg'  },
    { id: 74, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket39.JPG'  },
    { id: 75, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket40.png'  },
    { id: 76, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket41.png'  },
    { id: 77, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket42.png'  },
  ];

  get allImages(): string[] {
    if (!this.selectedProduct) return [];
    return [this.selectedProduct.image, ...(this.selectedProduct.images ?? [])].filter(Boolean);
  }

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const base = this.products.find(p => p.id === id);

    if (base) {
      this.selectedProduct = {
        ...base,
        description: this.descriptionByType[base.name] ?? base.description,
        variants:    this.variantsByType[base.name]    ?? [],
        features:    this.featuresByType[base.name]    ?? this.defaultFeatures,
        care:        this.careByType[base.name]         ?? this.defaultCare,
        inspirate:   this.inspirateByType[base.name]   ?? [],
      };

      this.selectedImage = base.image;

      if (this.selectedProduct.variants?.length) {
        this.selectedVariantPrice = this.selectedProduct.variants[0].price;
        this.selectedVariantLabel = this.selectedProduct.variants[0].label;
      }
    }
  }

  toggleAcc(key: string): void {
    this.accOpen[key] = !this.accOpen[key];
  }

  selectImage(img: string): void { this.selectedImage = img; }

  nextImage(): void {
    const imgs = this.allImages;
    const idx  = imgs.indexOf(this.selectedImage);
    this.selectedImage = imgs[(idx + 1) % imgs.length];
  }

  prevImage(): void {
    const imgs = this.allImages;
    const idx  = imgs.indexOf(this.selectedImage);
    this.selectedImage = imgs[(idx - 1 + imgs.length) % imgs.length];
  }

  onSelectChange(event: Event): void {
    const val = Number((event.target as HTMLSelectElement).value);
    const v   = this.selectedProduct?.variants?.find(x => x.price === val);
    if (v) {
      this.selectedVariantPrice = v.price;
      this.selectedVariantLabel = v.label;
    }
  }

  increaseQuantity(): void { if (this.quantity < 99) this.quantity++; }
  decreaseQuantity(): void { if (this.quantity > 1)  this.quantity--; }

  get displayedPrice(): number {
    return this.selectedVariantPrice ?? this.selectedProduct?.price ?? 0;
  }

  get hasProductVariants(): boolean {
    return !!(this.selectedProduct?.variants?.length);
  }

  addToCart(): void {
    if (!this.selectedProduct || this.isAddingToCart || !this.isBrowser) return;
    this.isAddingToCart = true;

    const item: CartItem = {
      id:       this.selectedProduct.id,
      name:     this.selectedProduct.name,
      price:    this.displayedPrice,
      quantity: this.quantity,
      image:    this.selectedImage,
      category: this.selectedProduct.category,
      variant:  this.selectedVariantLabel,
    };

    const cart = this.getCart();
    const idx  = cart.findIndex(i => i.id === item.id && i.variant === item.variant);
    if (idx > -1) cart[idx].quantity += item.quantity;
    else cart.push(item);
    this.saveCart(cart);

    this.showNotification = true;
    setTimeout(() => { this.showNotification = false; this.isAddingToCart = false; }, 3000);
  }

  closeNotification(): void { this.showNotification = false; }

  private getCart(): CartItem[] {
    if (!this.isBrowser) return [];
    try { return JSON.parse(localStorage.getItem('shoppingCart') || '[]'); } catch { return []; }
  }

  private saveCart(cart: CartItem[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  }
}
