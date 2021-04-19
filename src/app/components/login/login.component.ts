import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = true
  textoError: string

  constructor(private creadorformulario: FormBuilder, public auth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorformulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar(){

    if(this.formularioLogin.valid){
      this.datosCorrectos = true
      this.spinner.show()
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario) => {
        // console.log(usuario)
        this.spinner.hide()
      }).catch((error) => {
        // console.log(error)
        this.datosCorrectos = false
        if(error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
          this.textoError = 'No hay ningún registro de usuario que corresponda a este. Es posible que se haya eliminado al usuario.'
        }else if(error.message == 'The password is invalid or the user does not have a password.'){
          this.textoError = 'La contraseña no es válida o el usuario no tiene contraseña.'
        }
        else{
        this.textoError = error.message
        }
        this.spinner.hide()
      })
    }else{
      this.datosCorrectos = false
      this.textoError = 'Revise e ingrese los datos correctos'
    }
  }

}
