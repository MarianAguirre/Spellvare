import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export class Actividad{
  public nombre : string = "";
  public imagen : string = "";
}
@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css'
})


export class ActivitiesPageComponent {
  public actividades: Actividad[] = [{nombre: "Guess the word in braille", imagen: '../../../favicon.ico'}, {nombre: "Guess the word in english", imagen: '../../../favicon.ico'}];

}
