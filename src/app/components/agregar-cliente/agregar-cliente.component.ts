import { MensajesService } from './../../services/mensajes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  // Creación de nuevo Objeto de tipo FormGroup
  formularioCliente: FormGroup
  porcentajeSubida: number = 0
  urlImagen: string = ''
  esEditable: boolean = false
  id: string
  msj: MensajesService

  // Injector en el constructor de inicio con formBuilder
  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Igualacion entre variable objeto e inyector builder de formulario
    this.formularioCliente = this.fb.group({
      // Validaciones de todos los campos de nuestro formulario
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imgUrl: ['', Validators.required]
    })


    // Captura del ID de cliente con la funcion snapshot (clienteID) sacado del  path: 'agregar-cliente/:clienteID',
    // console.log(this.activeRoute.snapshot.params.clienteID)
    this.id = this.activeRoute.snapshot.params.clienteID

    if(this.id != undefined){
      // Para mostrar le boton en el formulario Editar o Agregar
      this.esEditable = true

      this.db.doc<any>('clientes'+'/'+this.id).valueChanges().subscribe((cliente) => {
        // console.log(cliente);
        // Setea cada uno de los VALUES del FORMULARIO con la data JALADA de la DB
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          // fechaNacimiento: cliente.fechaNacimiento,
          // Para poder traducir la fecha de la manera en que es instanciado con el new Date
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
          telefono: cliente.telefono,
          cedula: cliente.cedula,
          imgUrl: ''
        })
        this.urlImagen = cliente.imgUrl
      })
    }



  }

  agregar(){
    // console.log(this.formularioCliente.value)
    // Igualamos el nombre del value imgUrl al contenido de la variable urlImagen
    this.spinner.show()
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.formularioCliente.value.imgUrl = this.urlImagen
    // console.log(this.formularioCliente.value.imgUrl)

    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => {
      // console.log("Registor Creado");
      // NgxSpinner Angular para espera de carga finalizada
      this.formularioCliente.reset()
      this.spinner.hide()
      // Creada la funcion y declarada la variable al principio
      this.msj.mensajeCorrecto('Agregar', 'correctamente')
    })
  }

  editar() {
    this.spinner.show()
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.formularioCliente.value.imgUrl = this.urlImagen

    this.db.doc('clientes/'+this.id).update(this.formularioCliente.value).then(() => {
      // console.log('Cliente editado correctamente');
      this.spinner.hide()
      this.msj.mensajeAdvertencia('Editado', 'correctamente')

    }).catch(() => {
      // console.log('error en la edicion');
      this.spinner.hide()
      this.msj.mensajeError('Error', 'controlar sus datos cargados')
     })
  }


  subirImagen(evento) {
    // Validación de seguridad para evitar problema del lanzamiento de pruebas si es null
    if (evento.target.files.length > 0) {
      let archivo = evento.target.files[0]
      // Se usa la fecha para asignárselo al nombre del archivo
      let nombre = new Date().getTime().toString()
      // Se quita con las funciones toString y tratamiento del lastIndexOf que sea el . para capturar la extension
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))

      // Se indica el Nombre del BUCKET y el nombre del archivo a subir
      // let ruta = 'clientes/'+ archivo.name;
      // o
      let ruta = 'clientes/' + nombre + extension;

      // Se hace una referencia de la ruta del Storage de Firebase
      const referencia = this.storage.ref(ruta);
      // Se realiza la tarea PUT en FireBase
      const tarea = referencia.put(archivo);

      // Confirmación de subida de Imagen y URL de la misma
      tarea.then((objeto) => {
        // console.log('Imagen Subida!!')
        referencia.getDownloadURL().subscribe((url) => {
          // console.log(url)
          this.urlImagen = url
        })
      })

      // capturamos el porcentaje con la funcion percentageChanges
      tarea.percentageChanges().subscribe((porcentaje) => {
        // pasamos a entero para redondear, y a string porque no acepta el cambio directo a parseInt
        this.porcentajeSubida = parseInt(porcentaje.toString())
      })
    }
  }

}
