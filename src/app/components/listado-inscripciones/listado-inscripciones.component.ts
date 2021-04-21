import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from './../../models/inscripcion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = []

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('inscripcion').get().subscribe((resultado) => {

      resultado.forEach((inscripcion)=>{
        let inscripcionObtenida:any = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        // console.log(inscripcionObtenida)
        // CONSULTAR QUE SUCEDE con cliente.path
        // this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{
        //   inscripcionObtenida.clienteObtenido = cliente.data();
        //   inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
        //   inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds *1000);

        //   this.inscripciones.push(inscripcionObtenida);
          // console.log(inscripcionObtenida)
          // console.log(cliente)
        // })
      })
    })
  }

}
