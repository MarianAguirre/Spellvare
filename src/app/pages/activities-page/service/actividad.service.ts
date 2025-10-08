import { Injectable } from '@angular/core';
import { Actividad } from '../activities-page.component';

@Injectable({providedIn: 'root'})
export class ActividadService {
  private actividadSeleccionada: Actividad | null = null;
  private readonly STORAGE_KEY = 'actividadSeleccionada';

  constructor(){
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if(stored){
      this.actividadSeleccionada = JSON.parse(stored);
    }
  }

  setActividad(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actividad));
  }

  getActividad(): Actividad | null {
    return this.actividadSeleccionada;
  }


}
