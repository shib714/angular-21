import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Theme } from './common/nav/theme';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      providers: [Theme],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-21');
  // });
});
