import { Component, computed, input, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-child-signal',
  standalone: true,
  imports: [],
  templateUrl: './child-signal.component.html',
  styleUrl: './child-signal.component.scss'
})
export class ChildSignalComponent {
  parentInput = input(0);

  result = computed(() => this.parentInput() * this.parentInput()); 

}