import { Component, computed, effect, ElementRef, OnInit, signal, viewChild } from '@angular/core';
import { ChildSignalComponent } from '../child-signal/child-signal.component';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from '../model/model.component';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [ChildSignalComponent, FormsModule, ModelComponent],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
})
export class SignalComponent implements OnInit {
  textInput = viewChild<ElementRef>('inputRef')
  count = signal(0);
  colors = signal(['red', 'green', 'blue']);
  length = signal(20);
  breadth = signal(40);
  area = computed(() => this.length() * this.breadth());
  signalData: any = signal({ name: 'Soumya', age: 25 });
  squarevalue: number = 4;

  constructor() {
    effect(() => {
      console.log('Count changed to: ', this.count());
    });
    effect(() => {
      console.log('Count changed to: ', this.area());
    });
  }
  ngOnInit(): void {
    console.log(this.count());
  }
  increase() {
    // this.count.set(this.count() + 1);
    this.count.update((n) => n + 1);
    this.colors.update((colors) => [...colors, 'yellow']);
    this.breadth.set(50);
  }

  focusInput() {
    this.textInput()?.nativeElement.focus();
  }
}
