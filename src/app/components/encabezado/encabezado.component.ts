import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  cargando: boolean = true

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {

  }


  logout() {
    this.auth.signOut();
  }

}
