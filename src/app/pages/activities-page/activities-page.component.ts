import { Component, Inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { ActividadService } from './service/actividad.service';

export class Actividad {
  public nombre: string = '';
  public imagen: string = '';
  public path: string = '';
}
@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css',
})
export class ActivitiesPageComponent {
  constructor(
    private router: Router,
    private actividadService: ActividadService
  ) {}
  public actividades: Actividad[] = [
    {
      nombre: 'Guess the word in braille',
      imagen: '../../../favicon.ico',
      path: 'GussBraille',
    },
    {
      nombre: 'Guess the word in english',
      imagen: '../../../favicon.ico',
      path: 'GussEnglish',
    },
  ];

  goToActivity(actividad: Actividad) {
    this.actividadService.setActividad(actividad);
    this.router.navigate(['/activities', actividad.path]);
  }
}
