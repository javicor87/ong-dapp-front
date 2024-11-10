import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CausaBeneficaComponent } from './pages/causa-benefica/causa-benefica.component';
import { AccionesComponent } from './pages/acciones/acciones.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'causaBenefica', component:CausaBeneficaComponent},
    {path:'acciones', component:AccionesComponent}
];
