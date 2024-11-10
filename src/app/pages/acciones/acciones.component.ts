import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder,FormGroup,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { CausaBeneficaService } from '../../services/causa-benefica.service';
import { CausaBenefica } from '../../models/CausaBenefica';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-acciones',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatButtonModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule,MatListModule,FormsModule],
  templateUrl: './acciones.component.html',
  styleUrl: './acciones.component.scss'
})
export class AccionesComponent {

  private _snackBar = inject(MatSnackBar);
  private causaBeneficaServicio = inject(CausaBeneficaService);
  public listaCausasBeneficas:CausaBenefica[] = [];
  private formBuilder = inject(FormBuilder);
  public direccionDonante = '';
  public listaCausasDonadas:string[] = [];
  public balanceContrato:string = '';

  public formDonacion:FormGroup = this.formBuilder.group({
    indexcb: [''],
    wallet: [''],
    cant: ['']  
  });

  constructor(private router:Router) {
    this.obtenerCausasBeneficas();
    this.getBalance();
  }

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

  donar() {
    const causaBenefica : CausaBenefica = {
      id: this.formDonacion.value.indexcb,
      nombre: '0',
      wallet: this.formDonacion.value.wallet,
      cantidad: this.formDonacion.value.cant,
      fondosRecibidos: '0'
    }
    this.causaBeneficaServicio.donar(causaBenefica).subscribe({
      next:(data) => {
        this.getBalance();
        this.openSnackBar("Hemos recibido tu donación. Muchas gracias.");
      }, 
      error(err) {
        console.error(err.message);  
      },
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, "Cerrar");
  }

  volver(){
    this.router.navigate(["/"]);
  }

  cargarCausasDonadas() {
    this.causaBeneficaServicio.getCausasDonadas(this.direccionDonante).subscribe({
      next:(data) => {
        if (data.length > 0) {
          this.listaCausasDonadas = data;          
        }
      }, 
      error(err) {
        console.error(err.message);  
      },
    })
  }

  getBalance() {    
    this.causaBeneficaServicio.getBalance().subscribe({
      next:(data) => {      
        if (data >= 0) {
          this.balanceContrato = data.toString();        
        }
      }, 
      error(err) {
        console.error(err.message);  
      },
    })
  }

  distribuirFondos() {
    this.causaBeneficaServicio.distribuirFondos().subscribe({
      next:(data) => {
        this.getBalance();
        this.openSnackBar("Los fondos han sido transferidos a sus cuentas.");
      }, 
      error(err) {
        console.error(err.message);  
      },
    })
  }

}
