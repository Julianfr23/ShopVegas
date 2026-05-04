// theme.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type AppTheme = 'hogar' | 'gamer';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly STORAGE_KEY = 'sp-theme';
  private isBrowser: boolean;

  private _theme = new BehaviorSubject<AppTheme>('hogar');
  theme$ = this._theme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadFromStorage();
  }

  get current(): AppTheme {
    return this._theme.value;
  }

  setTheme(theme: AppTheme): void {
    this._theme.next(theme);
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, theme);
      // Aplica clase al body para que el CSS global reaccione
      document.body.setAttribute('data-theme', theme);
    }
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    const saved = localStorage.getItem(this.STORAGE_KEY) as AppTheme | null;
    const theme: AppTheme = saved === 'gamer' ? 'gamer' : 'hogar';
    this._theme.next(theme);
    document.body.setAttribute('data-theme', theme);
  }
}
