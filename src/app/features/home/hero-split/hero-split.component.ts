// hero-split.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, AppTheme } from '../../../core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-split',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-split.component.html',
  styleUrls: ['./hero-split.component.css'],
})
export class HeroSplitComponent implements OnInit, OnDestroy {

  activeTheme: AppTheme = 'hogar';
  private themeSub!: Subscription;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.theme$.subscribe(t => {
      this.activeTheme = t;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSub) this.themeSub.unsubscribe();
  }

  selectTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }
}
