import { TestBed } from "@angular/core/testing";
import { Theme } from "./theme";
import { describe, it, expect, beforeEach, vi } from 'vitest';




describe('Theme Service', () => {
  let themeService: Theme;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Theme],
    });
    themeService = TestBed.inject(Theme);
  });

  it('should return all themes', () => {
    const themes = themeService.getThemes();
    expect(themes).toEqual([
      { name: 'light', icon: 'light_mode' },
      { name: 'dark', icon: 'dark_mode' },
      { name: 'system', icon: 'desktop_windows' },
    ]);
  });
   it('should set the theme and update selectedTheme', () => {
    themeService.setTheme('dark');
    expect(themeService.selectedTheme()).toEqual({
      name: 'dark',
      icon: 'dark_mode',
    });
  });
    it('should default to "system" theme', () => {
    expect(themeService.selectedTheme()).toEqual({
      name: 'system',
      icon: 'desktop_windows',
    });
  });
//   it('should update document.body.style.colorScheme when theme changes', () => {
//     // Mock `document.body.style.colorScheme`
//     Object.defineProperty(document.body.style, 'colorScheme', {
//       value: '',
//       writable: true,
//     });

//     themeService.setTheme('light');
//     expect(document.body.style.colorScheme).toBe('light');

//     themeService.setTheme('dark');
//     expect(document.body.style.colorScheme).toHaveBeenCalledWith('dark');

//     themeService.setTheme('system');
//     expect(document.body.style.colorScheme).toHaveBeenCalledWith('light dark');
//   });
});