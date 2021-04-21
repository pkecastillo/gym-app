import { DocumentReference } from '@angular/fire/firestore';
export class Inscripcion{
  fecha: Date
  fechaFinal: Date
  cliente: DocumentReference
  precios: DocumentReference
  iva:number
  subTotal: number
  total: number

  constructor(){
    this.fecha = null
    this.fechaFinal = null
    this.cliente = this.cliente
    this.precios = this.precios
    this.iva = this.iva
    this.subTotal = this.subTotal
    this.total = this.total
  }

  validar(): any{
    let respuesta = {
      esValido: false,
      mensaje: ''
    }

    if(this.cliente == null || this.cliente == undefined)
    {
      respuesta.esValido = false
      respuesta.mensaje = 'Por favor seleccione un Cliente'
      return respuesta
    }

    if(this.precios == null || this.precios == undefined)
    {
      respuesta.esValido = false
      respuesta.mensaje = 'No ha selccionado un precio'
      return respuesta
    }

    if(this.fecha == null || this.fecha == undefined)
    {
      respuesta.esValido = false
      respuesta.mensaje = 'No tiene fecha de inicio'
      return respuesta
    }

    if(this.subTotal <= 0 || this.subTotal == undefined)
    {
      respuesta.esValido = false
      respuesta.mensaje = 'No ha podido calcular el SubTotal'
      return respuesta
    }
    if(this.total <= 0 || this.total == undefined)
    {
      respuesta.esValido = false
      respuesta.mensaje = 'No ha podido calcular el Total'
      return respuesta
    }
    respuesta.esValido = true
    return respuesta
  }
}
