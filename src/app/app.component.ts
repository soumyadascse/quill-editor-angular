import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
import { NavbarComponent } from './navbar/navbar.component';
const ColorClass = Quill.import('attributors/class/color') as any;
const SizeStyle = Quill.import('attributors/style/size') as any;
var AlignStyle = Quill.import('attributors/style/align') as any;
Quill.register(AlignStyle, true);

Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuillModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  rawEditorContent: string = '';
  constructor() {}
  // Quill editor modules (toolbar and other settings)
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Basic text formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['link', 'image'],
      [{ align: [] }], // Links and images
      [{ header: [1, 2, 3, false] }], // Header levels
      [{ color: [] }, { background: [] }], // Text color and background
    ],
  };
}
