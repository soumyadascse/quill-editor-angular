import { Component, forwardRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
const ColorClass = Quill.import('attributors/class/color') as any;
const SizeStyle = Quill.import('attributors/style/size') as any;
var AlignStyle = Quill.import('attributors/style/align') as any;
Quill.register(AlignStyle, true);

Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [QuillModule, FormsModule, CommonModule],
  templateUrl: './quill-editor.component.html',
  styleUrl: './quill-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true,
    },
  ],
})
export class QuillEditorComponent {
  rawEditorContent: string = '';
  constructor() {}
  // Quill editor modules (toolbar and other settings)
  // editorModules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline'], // Basic text formatting
  //     [{ list: 'ordered' }, { list: 'bullet' }], // Lists
  //     ['link', 'image'],
  //     [{ align: [] }], // Links and images
  //     [{ header: [1, 2, 3, false] }], // Header levels
  //     [{ color: [] }, { background: [] }], // Text color and background
  //   ],
  // };

  @ViewChild('editorContainer') editorContainer!: any;
  private quill!: Quill;
  private onChange = (value: string) => {};
  private onTouched = () => {};
  private value = '';

  ngAfterViewInit() {
    this.quill = new Quill(this.editorContainer.nativeElement, {
      theme: 'snow',
      placeholder: 'Write something...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // Basic text formatting
          // [{ 'size': ['small', 'large', 'huge'] }],
          // [{ 'font': [] }],
          [{ list: 'ordered' }, { list: 'bullet' }], // Lists
          ['link', 'image', 'video'],
          [{ align: [] }], // Links and images
          [{ header: [1, 2, 3, false] }], // Header levels
          [{ color: [] }, { background: [] }], // Text color and background
        ],
      },
    });

    const editorElement =
      this.editorContainer.nativeElement.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.style.minHeight = '200px'; // or whatever height you want
    }

    // Handle text changes
    this.quill.on('text-change', () => {
      const html =
        this.editorContainer.nativeElement.querySelector(
          '.ql-editor'
        ).innerHTML;
      this.value = html === '<p><br></p>' ? '' : html;
      this.onChange(this.value);
    });
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.value = value || '';
    if (this.quill) {
      this.quill.root.innerHTML = this.value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.quill) {
      this.quill.enable(!isDisabled);
    }
  }
}
