import { debounce} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  private actualizarFormList = new BehaviorSubject<any>({} as any);    //
  private actualizarFormData = new BehaviorSubject<any>({} as any);    //

  constructor() {}

  ngOnInit(): void {

  }

  // obtiene los datos de un contacto
  getContacto$(): Observable<any> {
    return this.actualizarFormData.asObservable();
  }

  // muestra los datos del contacto
  show(lista: any): void {
    this.actualizarFormData.next(lista);
  }

  // obtiene la lista de los contactos relacionados al agente
  getRelacionados$(): Observable<any> {
    return this.actualizarFormList.asObservable();
  }

  // muestra la lista de los relacionados
  showRelacionados(lista: any): void {
    this.actualizarFormList.next(lista);
  }

}
