import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { pipe, Observable, throwError } from 'rxjs';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 'http://servint.afip.gob.ar/secure/deinco/agenda/consulta.asp?s=mance'

  apiSite = environment.apiSite;
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  // devuelve los contactos que cumplen con searchText
  getContacts(searchText: string) {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText.trim());
   }

  // devuelve el contacto del cuil
  getContact(cuil: string) {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?c=" + cuil);
   }


}
