import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 'http://servint.afip.gob.ar/secure/deinco/agenda/consulta.asp?s=mance'

  apiSite = environment.apiSite;
  apiUrl = environment.apiURL;

  results = [];

  constructor(private http: HttpClient) { }

/*
  // devuelve los contactos que cumplen con searchText
  getContacts(searchText: string) {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText.trim());
   }
*/


  // devuelve los contactos que cumplen con searchText
  getContacts(searchText: string) {

    // return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText.trim())
    //       .toPromise();
    // searchText = searchText.trim();
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?s=" + searchText.trim())
          .pipe(
            debounceTime(450),
            map( (data: any) => {
                return ( data as any);
              }
            ));

   }


  // devuelve el contacto del cuil
  getContact(cuil: string) {
    return this.http.get(this.apiSite + this.apiUrl + "consulta.asp?c=" + cuil);
   }


}
