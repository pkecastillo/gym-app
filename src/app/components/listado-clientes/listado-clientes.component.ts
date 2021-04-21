import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>()
  // Inyectar el elemento AngularFirestore para poder conectar con la DB
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void
  {
    // Se realiza de manera distinta al ejemplo de la documentación para tener más opciones de edicion
    // Con una expresión lamba podemos manejar la variable resultado
    // poder suscribirse a un PROVIDER asignado a una variable llamada resultado
    // UN SOLO ERROR SE PRESENTA, NO SE SABE EL ID DEL DOCUMENTO
    // this.db.collection('clientes').valueChanges().subscribe((resultado) => {
    //   this.clientes = resultado
    // })

    // Me aseguro que el arreglo se encuentre vacio de entrada
    this.clientes.length = 0
    this.db.collection('clientes').get().subscribe((resultado) => {
      // console.log(resultado.docs)

      resultado.docs.forEach((item) => {
        // console.log(item.id)
        // console.log(item.data())
        // console.log(item.ref)

        let cliente:any = item.data()

        // debugger
        // console.log(item.id);
        cliente.id = item.id
        cliente.ref = item.ref
        // cliente['id'] = item.id
        // cliente['ref'] = item.ref
        // console.log(cliente)

        this.clientes.push(cliente)
      })

      // OTRA FORMA DE OBTENER LOS DATOS Y ID
      // for(let item of resultado.docs){
      //   console.log(item.id);
      //   console.log(item.data());
      //   console.log(item.ref);
      // }

    })
  }

}
