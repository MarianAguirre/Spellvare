import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivitiesPageComponent } from '../activities-page/activities-page.component';
import { TraductorPageComponent } from '../traductor-page/traductor-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ActivitiesPageComponent, TraductorPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
