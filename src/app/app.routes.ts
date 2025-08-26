import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SignalComponent } from './signal/signal.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reactive-form', component: ReactiveFormComponent },
    { path: 'signal', component: SignalComponent },
    { path: 'contact-list', component: ContactListComponent },
];
