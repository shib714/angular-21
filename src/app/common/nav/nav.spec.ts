import { TestBed } from '@angular/core/testing';
import { Nav } from './nav';
import { Theme } from './theme';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';

import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { provideRouter } from '@angular/router';

describe('NavComponent', () => {
  let fixture: any;
  let component: Nav;
  let themeService: Theme;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [
        Nav,

        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
      ],
      providers: [provideRouter([]), Theme],
    }).compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    themeService = TestBed.inject(Theme);
    fixture.detectChanges();
  });

  it('should create the nav component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the toolbar with menu, logout, and theme buttons', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();

    const menuButton = fixture.debugElement.query(By.css('button[aria-label="nav icon-button with menu icon"]'));
    expect(menuButton).toBeTruthy();

    const logoutButton = fixture.debugElement.query(By.css('button[aria-label="nav icon-button with share icon"]'));
    expect(logoutButton).toBeTruthy();

    const themeButton = fixture.debugElement.query(By.css('button[aria-label="nav icon-button with theme"]'));
    expect(themeButton).toBeTruthy();
  });

  it('should display the correct themes in the theme menu', () => {
    const themes = themeService.getThemes();
    const themeMenuItems = fixture.debugElement.queryAll(By.css('button[aria-label="nav mat-menu-item"]'));

    expect(themeMenuItems.length).toBe(themes.length);

    themes.forEach((theme, index) => {
      const themeItem = themeMenuItems[index];
      const icon = themeItem.query(By.css('mat-icon')).nativeElement.textContent.trim();
      const name = themeItem.query(By.css('span')).nativeElement.textContent.trim();

      expect(icon).toBe(theme.icon);
      expect(name).toBe(theme.name.charAt(0).toUpperCase() + theme.name.slice(1)); // Titlecase
    });
  });

  it('should call themeService.setTheme() when a theme is selected', () => {
    const setThemeSpy = vi.spyOn(themeService, 'setTheme');
    const themeMenuItems = fixture.debugElement.queryAll(By.css('button[aria-label="nav mat-menu-item"]'));

    themeMenuItems[1].nativeElement.click(); // Simulate clicking the second theme
    expect(setThemeSpy).toHaveBeenCalledWith('dark');
  });

  it('should toggle the drawer when the menu button is clicked', () => {
    const drawer = fixture.debugElement.query(By.directive(MatDrawer)).componentInstance as MatDrawer;
    const toggleSpy = vi.spyOn(drawer, 'toggle');

    const menuButton = fixture.debugElement.query(By.css('button[aria-label="nav icon-button with menu icon"]'));
    menuButton.nativeElement.click();

    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should close the drawer when the content is clicked', () => {
    const drawer = fixture.debugElement.query(By.directive(MatDrawer)).componentInstance as MatDrawer;
    const closeSpy = vi.spyOn(drawer, 'close');

    const drawerContent = fixture.debugElement.query(By.css('mat-drawer-content'));
    drawerContent.nativeElement.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should have correct router links', () => {
    const homeLink = fixture.debugElement.query(By.css('mat-list-item[routerLink="home"]'));
    const dynamicAppLink = fixture.debugElement.query(By.css('mat-list-item[routerLink="dynamic-app"]'));

    expect(homeLink).toBeTruthy();
    expect(dynamicAppLink).toBeTruthy();
  });
});