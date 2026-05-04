import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';

interface ImageItem {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  naturalWidth: number;
  naturalHeight: number;
  fileName?: string;
}

@Component({
  selector: 'app-product-custom',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './product-custom.component.html',
  styleUrls: ['./product-custom.component.css']
})
export class ProductCustomComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('stageBox') stageBox!: ElementRef<HTMLDivElement>;

  // Precios base por producto
  basePrices: { [key: string]: number } = {
    'Cobija': 120,
    'Taza': 35,
    'Hoody': 80,
    'Camiseta': 60,
    'Otros': 50
  };

  // Costo por imagen adicional
  readonly IMAGE_COST = 10;

  // Datos del producto
  products = ['Cobija', 'Taza', 'Hoody', 'Camiseta', 'Otros'];
  measuresFor: { [key: string]: string[] } = {
    Cobija: ['100x150 cm', '120x180 cm', '150x200 cm'],
    Taza: ['250ml', '350ml'],
    Hoody: ['S', 'M', 'L', 'XL'],
    Camiseta: ['S', 'M', 'L', 'XL'],
    Otros: ['Único'],
  };

  selectedProduct = this.products[0];
  selectedMeasure = this.measuresFor[this.selectedProduct][0];
  quantity = 1;

  // Gestión de imágenes
  images: ImageItem[] = [];
  selectedIndex: number | null = null;

  // Estado para notificaciones
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  // Nueva notificación de éxito
  showSuccessAlert = false;
  successMessage = '';

  // Estado para interacciones
  private isDragging = false;
  private isResizing = false;
  private isRotating = false;
  private activeImageIndex: number | null = null;
  private startX = 0;
  private startY = 0;
  private startImageX = 0;
  private startImageY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startRotation = 0;
  private resizeCorner = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    // Cargar diseño guardado si existe
    this.loadSavedDesign();
  }

  ngAfterViewInit() {
    // Inicialización si es necesaria
  }

  ngOnDestroy() {
    // Guardar diseño automáticamente al salir
    this.saveDesign();
  }

  // Verificar si estamos en el navegador
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Mostrar notificación de error
  private showNotificationMessage(message: string, type: 'success' | 'error' = 'success') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  // Mostrar alerta de éxito
  private showSuccessNotification(message: string) {
    this.successMessage = message;
    this.showSuccessAlert = true;

    // Ocultar automáticamente después de 4 segundos
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 4000);
  }

  // Guardar diseño en localStorage
  private saveDesign() {
    if (this.isBrowser() && this.images.length > 0) {
      const design = {
        productType: this.selectedProduct,
        measure: this.selectedMeasure,
        quantity: this.quantity,
        images: this.images
      };
      localStorage.setItem('currentCustomDesign', JSON.stringify(design));
    }
  }

  // Cargar diseño guardado
  private loadSavedDesign() {
    if (!this.isBrowser()) return;

    try {
      const saved = localStorage.getItem('currentCustomDesign');
      if (saved) {
        const design = JSON.parse(saved);
        this.selectedProduct = design.productType;
        this.selectedMeasure = design.measure;
        this.quantity = design.quantity;
        this.images = design.images;

        // Limpiar después de cargar
        localStorage.removeItem('currentCustomDesign');
      }
    } catch (e) {
      console.error('Error loading saved design:', e);
    }
  }

  // Selección de producto y medida
  selectProduct(product: string) {
    this.selectedProduct = product;
    this.selectedMeasure = this.measuresFor[product][0];
    this.saveDesign();
  }

  selectMeasure(measure: string) {
    this.selectedMeasure = measure;
    this.saveDesign();
  }

  // Gestión de cantidad
  increaseQuantity() {
    if (this.quantity < 99) {
      this.quantity++;
      this.saveDesign();
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.saveDesign();
    }
  }

  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      this.quantity = value;
      this.saveDesign();
    } else {
      input.value = this.quantity.toString();
    }
  }

  // Cálculo de precios
  calculateBasePrice(): number {
    return this.basePrices[this.selectedProduct] || 50;
  }

  calculateImageCost(): number {
    return this.images.length * this.IMAGE_COST;
  }

  calculateTotalPrice(): number {
    return this.calculateBasePrice() + this.calculateImageCost();
  }

  calculateFinalPrice(): number {
    return this.calculateTotalPrice() * this.quantity;
  }

  // Gestión de imágenes
  onFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    // Limitar a 10 imágenes
    if (this.images.length + files.length > 10) {
      this.showNotificationMessage('Máximo 10 imágenes permitidas', 'error');
      input.value = '';
      return;
    }

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        this.showNotificationMessage('Solo se permiten archivos de imagen', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const stageRect = this.stageBox.nativeElement.getBoundingClientRect();
          const maxSize = Math.min(300, stageRect.width * 0.5);

          let width = img.naturalWidth;
          let height = img.naturalHeight;

          // Escalar si es muy grande
          if (width > maxSize || height > maxSize) {
            const ratio = width / height;
            if (ratio > 1) {
              width = maxSize;
              height = width / ratio;
            } else {
              height = maxSize;
              width = height * ratio;
            }
          }

          const newImage: ImageItem = {
            url: e.target?.result as string,
            x: (stageRect.width - width) / 2,
            y: (stageRect.height - height) / 2,
            width: width,
            height: height,
            rotation: 0,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            fileName: file.name
          };

          this.images.push(newImage);
          this.selectedIndex = this.images.length - 1;
          this.saveDesign();
          this.showNotificationMessage('Imagen agregada correctamente');
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(index: number) {
    if (confirm('¿Eliminar esta imagen?')) {
      this.images.splice(index, 1);
      if (this.selectedIndex === index) {
        this.selectedIndex = this.images.length > 0 ? 0 : null;
      } else if (this.selectedIndex !== null && this.selectedIndex > index) {
        this.selectedIndex--;
      }
      this.saveDesign();
      this.showNotificationMessage('Imagen eliminada');
    }
  }

  removeAll() {
    if (this.images.length > 0 && confirm('¿Eliminar todas las imágenes?')) {
      this.images = [];
      this.selectedIndex = null;
      this.saveDesign();
      this.showNotificationMessage('Todas las imágenes han sido eliminadas');
    }
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  clearSelection() {
    this.selectedIndex = null;
  }

  // Interacciones con imágenes
  startDrag(event: PointerEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();

    const img = this.images[index];
    if (!img) return;

    this.isDragging = true;
    this.activeImageIndex = index;
    this.selectedIndex = index;

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startImageX = img.x;
    this.startImageY = img.y;

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  startResize(event: PointerEvent, index: number, corner: string) {
    event.preventDefault();
    event.stopPropagation();

    const img = this.images[index];
    if (!img) return;

    this.isResizing = true;
    this.activeImageIndex = index;
    this.selectedIndex = index;
    this.resizeCorner = corner;

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = img.width;
    this.startHeight = img.height;
    this.startImageX = img.x;
    this.startImageY = img.y;

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  startRotate(event: PointerEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();

    const img = this.images[index];
    if (!img) return;

    this.isRotating = true;
    this.activeImageIndex = index;
    this.selectedIndex = index;

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startRotation = img.rotation;

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.isDragging && !this.isResizing && !this.isRotating) return;
    if (this.activeImageIndex === null) return;

    const img = this.images[this.activeImageIndex];
    if (!img) return;

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;

    if (this.isDragging) {
      img.x = this.startImageX + deltaX;
      img.y = this.startImageY + deltaY;
    }
    else if (this.isResizing) {
      const minSize = 30;
      const maxSize = 800;
      const ratio = img.naturalWidth / img.naturalHeight;

      let newWidth = this.startWidth;
      let newHeight = this.startHeight;
      let newX = this.startImageX;
      let newY = this.startImageY;

      switch (this.resizeCorner) {
        case 'br':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth + deltaX));
          newHeight = newWidth / ratio;
          break;
        case 'bl':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth - deltaX));
          newHeight = newWidth / ratio;
          newX = this.startImageX + (this.startWidth - newWidth);
          break;
        case 'tr':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth + deltaX));
          newHeight = newWidth / ratio;
          newY = this.startImageY + (this.startHeight - newHeight);
          break;
        case 'tl':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth - deltaX));
          newHeight = newWidth / ratio;
          newX = this.startImageX + (this.startWidth - newWidth);
          newY = this.startImageY + (this.startHeight - newHeight);
          break;
        case 'top':
          newHeight = Math.max(minSize, Math.min(maxSize, this.startHeight - deltaY));
          newWidth = newHeight * ratio;
          newY = this.startImageY + (this.startHeight - newHeight);
          newX = this.startImageX + (this.startWidth - newWidth) / 2;
          break;
        case 'bottom':
          newHeight = Math.max(minSize, Math.min(maxSize, this.startHeight + deltaY));
          newWidth = newHeight * ratio;
          newX = this.startImageX + (this.startWidth - newWidth) / 2;
          break;
        case 'left':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth - deltaX));
          newHeight = newWidth / ratio;
          newX = this.startImageX + (this.startWidth - newWidth);
          newY = this.startImageY + (this.startHeight - newHeight) / 2;
          break;
        case 'right':
          newWidth = Math.max(minSize, Math.min(maxSize, this.startWidth + deltaX));
          newHeight = newWidth / ratio;
          newY = this.startImageY + (this.startHeight - newHeight) / 2;
          break;
      }

      img.width = newWidth;
      img.height = newHeight;
      img.x = newX;
      img.y = newY;
    }
    else if (this.isRotating) {
      const stageRect = this.stageBox.nativeElement.getBoundingClientRect();
      const centerX = stageRect.left + img.x + img.width / 2;
      const centerY = stageRect.top + img.y + img.height / 2;

      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) -
                   Math.atan2(this.startY - centerY, this.startX - centerX);

      img.rotation = this.startRotation + (angle * 180 / Math.PI);
    }
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {
    if (this.isDragging || this.isResizing || this.isRotating) {
      this.saveDesign(); // Guardar cambios después de interacción
      try {
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);
      } catch (e) {
        // Ignorar errores de release
      }
    }

    this.isDragging = false;
    this.isResizing = false;
    this.isRotating = false;
    this.activeImageIndex = null;
    this.resizeCorner = '';
  }

  // =============================================
  // 🛒 MÉTODO PARA AGREGAR AL CARRITO - SIMPLIFICADO
  // =============================================

  // Compra - Agregar al carrito
  buy() {
    if (this.images.length === 0) {
      this.showNotificationMessage('Agrega al menos una imagen antes de comprar', 'error');
      return;
    }

    console.log('🛒 Iniciando proceso de agregar al carrito...');

    // Crear el item del carrito
    const customId = 'CUSTOM-' + Date.now();

    const cartItem = {
      id: customId,
      name: `${this.selectedProduct} Personalizado - ${this.selectedMeasure}`,
      price: this.calculateTotalPrice(),
      quantity: this.quantity,
      image: this.images[0]?.url || 'assets/images/custom-product.jpg',
      category: 'Personalizado',
      type: 'custom',
      customDesign: {
        productType: this.selectedProduct,
        measure: this.selectedMeasure,
        images: this.images.map(img => img.url),
        totalImages: this.images.length,
        basePrice: this.calculateBasePrice(),
        imageCost: this.calculateImageCost(),
        specifications: {
          rotations: this.images.map(img => img.rotation),
          positions: this.images.map(img => ({ x: img.x, y: img.y })),
          dimensions: this.images.map(img => ({ width: img.width, height: img.height }))
        },
        designData: {
          product: this.selectedProduct,
          measure: this.selectedMeasure,
          totalImages: this.images.length,
          createdAt: new Date()
        }
      }
    };

    console.log('📦 Item creado:', cartItem);

    // Agregar directamente al carrito
    try {
      // Obtener carrito actual
      let currentCart: any[] = [];
      if (this.isBrowser()) {
        const savedCart = localStorage.getItem('shoppingCart');
        currentCart = savedCart ? JSON.parse(savedCart) : [];
      }

      console.log('🛍️ Carrito actual:', currentCart);

      // Agregar nuevo item
      const updatedCart = [...currentCart, cartItem];

      console.log('🛍️ Carrito actualizado:', updatedCart);

      // Guardar en localStorage
      if (this.isBrowser()) {
        localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));

        // Verificar que se guardó
        const verifiedCart = localStorage.getItem('shoppingCart');
        console.log('✅ Carrito verificado:', verifiedCart);
      }

      // Mostrar alerta de éxito
      this.showSuccessNotification(`¡${this.selectedProduct} personalizado agregado al carrito! 🎉`);

      console.log('✅ Producto agregado al carrito exitosamente');

      // Limpiar diseño y redirigir
      setTimeout(() => {
        this.images = [];
        this.selectedIndex = null;

        if (this.isBrowser()) {
          localStorage.removeItem('currentCustomDesign');
        }

        // Redirigir al carrito
        setTimeout(() => {
          this.router.navigate(['/cart']);
        }, 2000);
      }, 1500);

    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);
      this.showNotificationMessage('Error al agregar al carrito. Intenta nuevamente.', 'error');
    }
  }

  // Métodos auxiliares
  hasImages(): boolean {
    return this.images.length > 0;
  }

  getTotalImages(): number {
    return this.images.length;
  }
}
