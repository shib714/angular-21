import { Component, computed, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'widget',
  imports: [MatButtonModule],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
})
export class Widget {
  title = input.required<string>();
  description = input.required<string>();

  closed = output<void>();
  collapsed = model(false);

  protected btnText = computed(() => this.collapsed() ? 'Expand' : 'Collapse');

  protected toggleCollapse() {
    this.collapsed.set(!this.collapsed());
  }
  ngOnDestroy() {
    console.log('Widget component destroyed');

  }
}
