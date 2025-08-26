import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
})
export class EditContactComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditContactComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  modelData = model(this.data.data);

  ngOnInit(): void {
    console.log('Data received in dialog:', this.modelData());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes = signal(true);
}
