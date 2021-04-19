import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym-app';
  usuario: firebase.User;
  cargando: boolean = true

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {

      // setTimeout(() => {
        this.cargando = false
        this.usuario = usuario
        // console.log(usuario)
      // }, 4000)

    })
  }
  login() {
    this.auth.signInWithEmailAndPassword('pkecastillo@gmail.com', '9121088')
  }
  logout() {
    this.auth.signOut();
  }
}
