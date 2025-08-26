import { Component } from '@angular/core';
import { CheckBoxComponent } from '../check-box/check-box.component';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CheckBoxComponent],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {
  isChecked: boolean = false;
}
