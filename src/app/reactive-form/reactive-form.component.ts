import { Component } from '@angular/core';
import { QuillEditorComponent } from '../quill-editor/quill-editor.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      bio: ['', Validators.required] // bound to Quill editor
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    }
  }

}
