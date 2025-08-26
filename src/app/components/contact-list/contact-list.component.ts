import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../api.service';
import { UtilityService } from '../../utility.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent implements OnInit {
  isLoading = signal(true);
  userCount = computed(() => this.contacts().length);
  emptyColumns = ['empty'];
  readonly dialogue = inject(MatDialog);

  constructor() {
    effect(() => {
      console.log('User count changed:', this.userCount());
    });
  }

  // constructor(private apiService: ApiService, public utilityService: UtilityService) {}
  apiService = inject(ApiService);
  utilityService = inject(UtilityService);

  deleteUser(id: any) {
    this.openDialog('delete', id, null);
    // this.contacts.update((users) => users.filter((user) => user.id !== +id));
  }
  editUser(id:any, data:any) {
    this.openDialog('edit', id, data);
  }

  openDialog(type: string, id: string, data?: any): void {
    if (type === 'edit') {
      const dialogRef = this.dialogue.open(EditContactComponent, {
        width: '600px',
        data: { type, id, data },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result) {
          console.log('Edited contact data:', result);
          // Update the contact in the list
          this.contacts.update((contacts) =>
            contacts.map((contact) =>
              contact.id === result.id ? { ...contact, ...result } : contact
            )
          );
        }
      });
    } else if (type === 'delete') {
      const dialogRef = this.dialogue.open(CustomDialogComponent, {
        data: {},
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result) {
          this.contacts.update((users) =>
            users.filter((user) => user.id !== +id)
          );
        }
      });
    }
  }
  contacts = signal<Contact[]>([]);

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'actions',
  ];
  dataSource = this.contacts();

  ngOnInit(): void {
    this.apiService.getContacts().subscribe({
      next: (data) => {
        this.contacts.set(data);
        // this.dataSource = this.contacts();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching contacts', err);
        this.isLoading.set(false);
      },
    });
  }
}
