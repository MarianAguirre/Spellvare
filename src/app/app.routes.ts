import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BraillePageComponent } from './pages/braille-page/braille-page.component';
import { ActivitiPageComponent } from './pages/activities-page/components/activiti-page/activiti-page.component';
import { GuessWordComponent } from './pages/activities-page/components/guess-word/guess-word.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'braille', component: BraillePageComponent },
  { path: 'activities/:actividad', component: ActivitiPageComponent},
  { path: 'guss', component: GuessWordComponent}

];
