import { Precio } from './../../models/precio';
import { MensajesService } from './../../services/mensajes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup
  precios:any[] = new Array<any>()
  esEditable: boolean = false
  id: string

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msj: MensajesService
    ) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.mostrarPrecios()

  }

  mostrarPrecios(){
    this.db.collection('precios').get().subscribe((resultado) => {
      this.precios.length = 0
      resultado.docs.forEach((dato) => {
        // Recordar esta parte de la declaración si no le pongo ANY no me reconoce el tipo
        let precio:any = dato.data()
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)

      })
    })
  }

  agregar(){
    // console.log(this.formularioPrecio.value)
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(() => {
      this.msj.mensajeCorrecto('Agregado', 'correctamente')
      this.formularioPrecio.reset()
      this.mostrarPrecios()
    }).catch(() => {
      this.msj.mensajeError('Error','problema en la carga')
    })
  }

  editarPrecio(precio: Precio){
    this.esEditable = true
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id
  }

  editar() {
    // console.log(this.formularioPrecio.value)
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(() => {
      this.msj.mensajeCorrecto('Editado', 'correctamente')
      this.formularioPrecio.reset()
      this.esEditable = false
      this.mostrarPrecios()
    }).catch(() => {
      this.msj.mensajeError('Error', 'problema en la edición')
    })
  }

}
