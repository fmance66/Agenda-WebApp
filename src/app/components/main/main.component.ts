import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private actualizarFormulario = new BehaviorSubject<Contacto>({} as any);    //

  constructor() { }

  ngOnInit(): void {
  }

  // obtiene los datos de una tarjeta
  getContacto$(): Observable<Contacto> {
    return this.actualizarFormulario.asObservable();
  }

  // muestra los datos del contacto
  show(contacto: Contacto): void {
    this.actualizarFormulario.next(contacto);
  }

}
