import { Component } from '@angular/core';
import { ActivitiesPageComponent } from '../activities-page/activities-page.component';
import { TraductorPageComponent } from '../traductor-page/traductor-page.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActivitiesPageComponent, TraductorPageComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
