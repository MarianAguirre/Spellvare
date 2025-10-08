import { Injectable } from '@angular/core';
import { Actividad } from '../activities-page.component';

@Injectable({providedIn: 'root'})
export class ActividadService {
  private actividadSeleccionada: Actividad | null = null;

  setActividad(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
  }

  getActividad(): Actividad | null {
    return this.actividadSeleccionada;
  }
}
