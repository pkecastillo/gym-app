import { Precio } from './../../models/precio';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from './../../models/cliente';
import { Inscripcion } from './../../models/inscripcion';
import { Component, OnInit } from '@angular/core';
import { MensajesService } from './../../services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  idPrecio: string = 'null';
  precios: Precio[] = new Array< Precio>();

  constructor(private db: AngularFirestore, private msj: MensajesService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((item) => {
        let precio:any = item.data() as Precio
        precio.id = item.id
        precio.ref = item.ref
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente = undefined
  }

  guardar(){
    // console.log(this.inscripcion);
    if(this.inscripcion.validar().esValido == true){
      // console.log('Guardado');
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        iva: this.inscripcion.iva,
        subTotal: this.inscripcion.subTotal,
        total: this.inscripcion.total
      }
      this.db.collection('inscripcion').add(inscripcionAgregar).then((resultado) => {
        // console.log('guardado Correctamente')
        this.inscripcion = new Inscripcion()
        this.clienteSeleccionado = new Cliente()
        this.precioSeleccionado = new Precio()
        this.msj.mensajeCorrecto('Guardado', 'correctamente')
      })

    }else{
      // console.log(this.inscripcion.validar().mensaje);
      this.msj.mensajeAdvertencia('Advertencia', this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(id: string){
    this.precioSeleccionado = this.precios.find(x => x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref
    // console.log(this.precioSeleccionado);

    this.inscripcion.subTotal = this.precioSeleccionado.costo;
    // para calcular algun impuesto específico
    this.inscripcion.iva = this.inscripcion.subTotal * 0.21;
    this.inscripcion.total = this.inscripcion.subTotal  + this.inscripcion.iva;

    this.inscripcion.fecha = new Date()

    if(id != "null" || this.precioSeleccionado.ref != undefined)
    {
      if(this.precioSeleccionado.tipoDuracion == 1)
      {
        // Fecha Final = precioSeleccionado.duracion * 1
        let dias: number = this.precioSeleccionado.duracion;
        let fechaFinal =
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;

      }
      if(this.precioSeleccionado.tipoDuracion == 2)
      {
        // Fecha Final = precioSeleccionado.duracion * 7
        let dias: number = this.precioSeleccionado.tipoDuracion * 7;
        let fechaFinal =
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.duracion == 3)
      {
        // Fecha Final = precioSeleccionado.duracion * 15
        let dias: number = this.precioSeleccionado.tipoDuracion * 15;
        let fechaFinal =
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 4)
      {
        // Fecha Final = this.inscripcion.fecha agregar un mes this.precioSeleccionado.duracion
        let anio: number = this.inscripcion.fecha.getFullYear();
        let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal =
        new Date(anio, meses ,dia )
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 5)
      {
        // Fecha Final = this.inscripcion.fecha agregar un mes this.precioSeleccionado.duracion
        let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
        let meses = this.inscripcion.fecha.getMonth();
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal =
        new Date(anio, meses ,dia )
        this.inscripcion.fechaFinal = fechaFinal;
      }
    }else{
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.precios = null;
      this.inscripcion.subTotal = 0;
      // this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }

  }

}
