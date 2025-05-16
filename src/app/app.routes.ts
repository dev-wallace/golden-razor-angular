import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { BarberPanelComponent } from './components/barber-panel/barber-panel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'servicos', component: ServicesComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {path: 'barber', component: BarberPanelComponent},
  { path: 'cadastro', component: RegisterComponent },
  { path: 'user', component: UserPanelComponent },
  { path: '**', redirectTo: '' }
];