import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CausaBeneficaService } from '../../services/causa-benefica.service';
import { CausaBenefica } from '../../models/CausaBenefica';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  private causaBeneficaServicio = inject(CausaBeneficaService);
  public listaCausasBeneficas:CausaBenefica[] = [];
  public displayedColumns:string[] = ['nombre', 'wallet', 'fondosRecibidos'];

  obtenerCausasBeneficas() {
    this.causaBeneficaServicio.getCausasBeneficas().subscribe({
      next:(data) => {
        if (data.length > 0) {
          this.listaCausasBeneficas = data;
        }
      }, 
      error(err) {
        console.error(err.message);  
      },
    })
  }

  constructor(private router:Router) {
    this.obtenerCausasBeneficas();
  }

  nuevo() {
    this.router.navigate(['/causaBenefica']);
  }

  acciones() {
    this.router.navigate(['/acciones']);
  }

}
