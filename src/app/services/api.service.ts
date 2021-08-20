import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
  getContacts(searchText: string): Observable<any> {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText.trim())
      pipe(
        map((contactos: any) => {
          return contactos;
        }), catchError ( error => {
          return throwError ('Algo anduvo al hacer getContacts a la API...');
        })
      )
   }

  // devuelve el contacto del cuil
  getContact(cuil: string): Observable<any> {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?c=" + cuil)
      pipe(
        map((contacto: any) => {
          return contacto;
        }), catchError ( error => {
          return throwError ('Algo anduvo al hacer getContacts a la API...');
        })
      )
   }

}
