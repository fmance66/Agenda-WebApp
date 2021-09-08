import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 'http://servint.afip.gob.ar/secure/deinco/agenda/consulta.asp?s=mance'

  private apiSite = environment.apiSite;
  private apiUrl = environment.apiURL;

  private results: any;

  constructor(private httpClient: HttpClient) { }

  // devuelve los contactos que cumplen con searchText
  private callApiByS(searchText: string): Observable<any> {

    searchText = searchText.trim();

    if (searchText === "" ) {
      console.log("Api service: el parámetro de búsqueda está vacío");
      return this.httpClient.get(this.apiSite + this.apiUrl + "consulta.asp?c=" + "20182865762")
      .pipe(map(response => {
        // console.log('api.service: ', response);
        // return this.results = response["Agentes"]
        return this.results = response;
      }))
} else {
      // let params = {q: searchText}
      return this.httpClient.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText)
                .pipe(map(response => {
                    // console.log('api.service: ', response);
                    // return this.results = response["Agentes"]
                    return this.results = response;
                  }))
    }
  }

  // devuelve los contactos que cumplen con searchText
  getContactsByNombre (searchText: any) {
    return this.callApiByS(searchText);
  }

  // devuelve el contacto del cuil
  getContactByCuil(cuil: string) {
    return this.httpClient.get(this.apiSite + this.apiUrl + "consulta.asp?c=" + cuil);
   }


}
