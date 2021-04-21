import { Cliente } from './../../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>()
  @Input('nombre') nombre: string
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter()
  @Output('canceloCliente') canceloCliente = new EventEmitter()


  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<any>('clientes').get().subscribe((resultados) => {
      this.clientes.length = 0

      resultados.docs.forEach((item) => {
        let cliente:any = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        cliente.visible = false
        this.clientes.push(cliente)
      })
      // console.log(this.clientes)
    })
  }

  buscarClientes(nombre: string){
    // console.log(nombre)
    this.clientes.forEach((cliente) => {
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase())){
        cliente.visible = true
      }else if((cliente.apellido.toLowerCase().includes(nombre.toLowerCase()))){
        cliente.visible = true
      }
      else{
        cliente.visible = false
      }
    })
  }

  seleccionarCliente(cliente: Cliente){
    this.nombre = cliente.nombre + ' ' + cliente.apellido
    this.clientes.forEach((cliente) => {
      cliente.visible = false
    })
    // console.log(cliente)

    this.seleccionoCliente.emit(cliente)
  }

  cancelarCliente(){
    this.nombre = undefined
    this.canceloCliente.emit()
  }

}
