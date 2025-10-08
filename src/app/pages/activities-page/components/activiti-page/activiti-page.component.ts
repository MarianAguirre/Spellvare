import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../activities-page.component';
import { ActividadService } from '../../service/actividad.service';
import { ButtonHomeComponent } from "../../../../components/button-home/button-home.component";

@Component({
  selector: 'app-activiti-page',
  standalone: true,
  imports: [ButtonHomeComponent],
  templateUrl: './activiti-page.component.html',
  styleUrl: './activiti-page.component.css'
})
export class ActivitiPageComponent {
  actividad = this.actividadService.getActividad();

  constructor(private actividadService: ActividadService) {}

}
