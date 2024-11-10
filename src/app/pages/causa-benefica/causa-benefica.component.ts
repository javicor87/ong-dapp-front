import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { CausaBeneficaService } from '../../services/causa-benefica.service';
import { Router } from '@angular/router';
import { CausaBenefica } from '../../models/CausaBenefica';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-causa-benefica',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './causa-benefica.component.html',
  styleUrl: './causa-benefica.component.scss'
})
export class CausaBeneficaComponent {

  private _snackBar = inject(MatSnackBar);
  private causaBeneficaService = inject(CausaBeneficaService);
  private formBuilder = inject(FormBuilder);

  public formCausaBenefica:FormGroup = this.formBuilder.group({
    nombre: [''],
    wallet: ['']  
  });

  constructor(private router:Router){}

  guardar() {
    const causaBenefica : CausaBenefica = {
      id: 0,
      nombre: this.formCausaBenefica.value.nombre,
      wallet: this.formCausaBenefica.value.wallet,
      cantidad: 0,
      fondosRecibidos: '0'
    }
  
    this.causaBeneficaService.saveCausaBenefica(causaBenefica).subscribe({
      next:(data) =>{
        this.openSnackBar();
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }

  volver(){
    this.router.navigate(["/"]);
  }

  openSnackBar() {
    this._snackBar.open("Causa benéfica creada", "Cerrar");
  }

}
