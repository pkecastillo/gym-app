import { DocumentReference } from "@angular/fire/firestore"

export class Cliente{
  id:string
  nombre:string
  apellido:string
  correo:string
  fechaNacimiento:Date
  imgUrl: string
  telefono:number
  cedula:string
  ref: DocumentReference
  visible: boolean

  constructor(){
  //   let cliente = new Cliente()
  //   this.nombre = cliente.nombre
  //   this.apellido = cliente.apellido
  //   this.correo = cliente.correo
  //   this.fechaNacimiento = cliente.fechaNacimiento
  //   this.imgUrl = cliente.imgUrl
  //   this.telefono = cliente.telefono
  //   this.cedula = cliente.cedula
  }
}
