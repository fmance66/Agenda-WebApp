import { ContactDataComponent } from './contact-data/contact-data.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private actualizarFormulario = new BehaviorSubject<any>({} as any);    //

  constructor() {

              }

  ngOnInit(): void {

  }

  // obtiene los datos de una tarjeta
  getContacto$(): Observable<any> {
    return this.actualizarFormulario.asObservable();
  }

  // muestra los datos del contacto
  show(contacto: any): void {
    this.actualizarFormulario.next(contacto);
  }

}
