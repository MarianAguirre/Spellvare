import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activiti-page',
  standalone: true,
  imports: [],
  templateUrl: './activiti-page.component.html',
  styleUrl: './activiti-page.component.css'
})
export class ActivitiPageComponent {
  actividadNombre: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.actividadNombre = this.route.snapshot.paramMap.get('actividad');
  }
}
