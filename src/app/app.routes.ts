import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BraillePageComponent } from './pages/braille-page/braille-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'braille', component: BraillePageComponent }, 
];
