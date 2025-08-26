import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss'
})
export class CheckBoxComponent {
  // @Input() value: boolean = false;
  value = model();
  toggle() {
    // this.value = !this.value;
    this.value.update((v) => !v);
    
  }
}
