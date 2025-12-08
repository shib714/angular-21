import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Home } from './home';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatCardModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should render buttons with correct labels and attributes', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-flat-button]'));
    expect(buttons.length).toBe(3);

    expect(buttons[0].nativeElement.textContent.trim()).toBe('Open');
    expect(buttons[0].attributes['aria-label']).toBe('Open dialog button');

    expect(buttons[1].nativeElement.textContent.trim()).toBe('Accent');
    expect(buttons[1].attributes['aria-label']).toBe('Accent button');

    expect(buttons[2].nativeElement.textContent.trim()).toBe('Warn');
    expect(buttons[2].attributes['aria-label']).toBe('Warn button');
  });
    it('should render input field with correct placeholder and aria-label', () => {
    const inputField = fixture.debugElement.query(By.css('input[matInput]'));
    expect(inputField).toBeTruthy();
    expect(inputField.attributes['placeholder']).toBe('Enter some information');
    expect(inputField.attributes['aria-label']).toBe('Input field for information');
  });
    it('should render checkbox with correct label', () => {
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(checkbox).toBeTruthy();
    expect(checkbox.nativeElement.textContent.trim()).toBe('Check this box!');
    expect(checkbox.attributes['aria-label']).toBe('Check this box');
  });
  
  it('should render expansion panel with correct content', () => {
    const expansionPanel = fixture.debugElement.query(By.css('mat-expansion-panel'));
    expect(expansionPanel).toBeTruthy();

    const panelTitle = expansionPanel.query(By.css('mat-panel-title'));
    expect(panelTitle.nativeElement.textContent.trim()).toBe('Expansion title');

    const panelDescription = expansionPanel.query(By.css('mat-panel-description'));
    expect(panelDescription.nativeElement.textContent.trim()).toBe('This is a summary of the content');

    const panelContent = expansionPanel.query(By.css('p'));
    expect(panelContent.nativeElement.textContent.trim()).toBe('This is the primary content of the panel.');
  });
    it('should render card with correct title, subtitle, image, and actions', () => {
    const card = fixture.debugElement.query(By.css('mat-card'));
    expect(card).toBeTruthy();

    const cardTitle = card.query(By.css('mat-card-title'));
    expect(cardTitle.nativeElement.textContent.trim()).toBe('Shiba Inu');

    const cardSubtitle = card.query(By.css('mat-card-subtitle'));
    expect(cardSubtitle.nativeElement.textContent.trim()).toBe('Dog Breed');

    const cardImage = card.query(By.css('img[mat-card-image]'));
    expect(cardImage).toBeTruthy();
    expect(cardImage.attributes['src']).toBe('https://material.angular.io/assets/img/examples/shiba2.jpg');
    expect(cardImage.attributes['alt']).toBe('Photo of a Shiba Inu');

    const cardActions = card.queryAll(By.css('button[mat-button]'));
    expect(cardActions.length).toBe(2);
    expect(cardActions[0].nativeElement.textContent.trim()).toBe('LIKE');
    expect(cardActions[1].nativeElement.textContent.trim()).toBe('SHARE');
  });
});
