import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
// BOOTSTRAPP https://valor-software.com/ngx-bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// FireBase Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
// Enviroment de Prueba (Actualizar a produccion de ser necesario)
import { environment } from 'src/environments/environment';

// Spiner Module
import { NgxSpinnerModule } from 'ngx-spinner';

// Components del sistema
import { LoginComponent } from './components/login/login.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule,
    BsDropdownModule.forRoot()

  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
