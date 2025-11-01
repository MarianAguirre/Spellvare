import { Component } from '@angular/core';
import { ActividadService } from '../../service/actividad.service';
import { ButtonHomeComponent } from '../../../../components/button-home/button-home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-activiti-page',
  standalone: true,
  imports: [ButtonHomeComponent, CommonModule, FormsModule],
  templateUrl: './activiti-page.component.html',
  styleUrl: './activiti-page.component.css',
})
export class ActivitiPageComponent {
  public actividad = this.actividadService.getActividad();

  constructor(private actividadService: ActividadService) {}

}
