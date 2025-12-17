import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect } from 'vitest';
import { Widget } from './widget';
import { Component, inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';


export function getByTestId<T extends HTMLElement = HTMLElement>(
  fixture: ComponentFixture<any>,
  testId: string
): T {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  if (!el) {
    throw new Error(`Element with data-testid="${testId}" not found`);
  }
  return el as T;
}





describe.only('Widget', () => {

  //
  // ---------------------------------------------------------
  // 1. INPUT BINDINGS
  // ---------------------------------------------------------
  //
  describe('Testing Inputs', () => {
    it('renders title and description via inputBinding()', async () => {
      const fixture = TestBed.createComponent(Widget, {
        bindings: [
          inputBinding('title', () => 'Test Title'),
          inputBinding('description', () => 'Test Description.'),
        ],
      });

      fixture.detectChanges();
      await fixture.whenStable();

      // const titleEl = fixture.nativeElement.querySelector('[data-testid="title"]');
      // const descEl = fixture.nativeElement.querySelector('[data-testid="description"]');
      const titleEl = getByTestId(fixture, 'title');
      const descEl = getByTestId(fixture, 'description');

      console.log('TITLE TEXT =', titleEl.textContent);
      console.log('DESC TEXT =', descEl.textContent);

      console.log({
        title: fixture.nativeElement.querySelector('[data-testid="title"]'),
        description: fixture.nativeElement.querySelector('[data-testid="description"]'),
      });
      expect(titleEl).toBeTruthy();
      expect(descEl).toBeTruthy();

      expect(titleEl.textContent).toContain('Test Title');
      expect(descEl.textContent).toContain('Test Description.');
    });
  });

  //
  // ---------------------------------------------------------
  // 2. COLLAPSE BUTTON
  // ---------------------------------------------------------
  //
  describe('Testing Collapse Button', () => {
    it('toggles collapse state when collapse button is clicked', async () => {
      const fixture = TestBed.createComponent(Widget, {
        bindings: [
          inputBinding('title', () => 'Test Title'),
          inputBinding('description', () => 'Test Description.'),
        ],
      });

      fixture.detectChanges();
      await fixture.whenStable();

      // const collapseBtn = fixture.nativeElement.querySelector('[data-testid="collapse-btn"]');
      const collapseBtn = getByTestId<HTMLButtonElement>(fixture, 'collapse-btn');
      expect(collapseBtn).toBeTruthy();

      // Initial state
      expect(collapseBtn.textContent).toContain('Collapse');

      // Click to collapse
      collapseBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(collapseBtn.textContent).toContain('Expand');

      const content = fixture.nativeElement.querySelector('.widget-content');
      expect(content.textContent).toContain('No content...');
    });
  });

  //
  // ---------------------------------------------------------
  // 3. CLOSE BUTTON
  // ---------------------------------------------------------
  //
  describe('Testing Close Button', () => {
    it('emits closed event when close button is clicked', async () => {
      const fixture = TestBed.createComponent(Widget, {
        bindings: [
          inputBinding('title', () => 'Test Title'),
          inputBinding('description', () => 'Test Description.'),
        ],
      });

      const instance = fixture.componentInstance;
      const spy = vi.fn();
      instance.closed.subscribe(spy);

      fixture.detectChanges();
      await fixture.whenStable();

      //const closeBtn = fixture.nativeElement.querySelector('[data-testid="close-btn"]');
      const closeBtn = getByTestId<HTMLButtonElement>(fixture, 'close-btn');
      expect(closeBtn).toBeTruthy();

      closeBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

});




