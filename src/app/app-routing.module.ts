import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { PreciosComponent } from './components/precios/precios.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'inscripcion', pathMatch: 'full'
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    // Se coloca la ruta principal y la que solicita parámetros tambien abajo
    path: 'agregar-cliente', component: AgregarClienteComponent
  },
  {
    path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent
  },
  {
    path: 'precios', component: PreciosComponent
  },
  {
    path: 'listado-inscripciones', component: ListadoInscripcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
