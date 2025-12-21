import { Component, signal } from '@angular/core';
import { Nav } from './common/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-21');
}
