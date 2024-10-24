import { Routes } from '@angular/router';
import { TranslationComponent } from '../components/translator/components';
import { AlphabetComponent } from '../components/alphabet/alphabet.component';
import { AboutComponent } from '../components/about/about.component';

export const routes: Routes = [
  { path: 'traductor', component: TranslationComponent },
  { path: 'abecedario', component: AlphabetComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/traductor', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/traductor' } // Ruta wildcard
];
