import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
// import { NgModel } from '@angular/forms';

import { MainComponent } from 'src/app/components/main/main.component';
import { ApiService } from 'src/app/services/api.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contacto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent extends ContactoService implements OnInit {

  suscription: Subscription = new Subscription();

  // searchText = new Subject<string>();
  searchText = new Subject<any>();
  // loading: boolean = false;
  errorMessage: any;

  // my contacts son los contactos del usuario (busqueda vacía) como un "home"
  myContacts: any = [];
  // contactos de la lista
  remoteContacts: any = [];
  // contactos favoritos (no implementado)
  favs: any = [];

  selectedContact: any = null;
  selectedContactBoss: any = null;

  searchForm = new FormGroup({
    // search: new FormControl("", Validators.required),
    search: new FormControl(""),
  })

  constructor(private apiService: ApiService,
              private mainComponent: MainComponent) {
        super();

      }

  ngOnInit(): void {

    // se inicializa con los contactos relacionados del cuil local
    this.showFavorites();

    // observable de contactos relacionados
    this.suscription = this.mainComponent.getRelacionados$()
        .subscribe(data => {

          this.remoteContacts = data;
          this.myContacts = this.remoteContacts;

        });


    // muestra los contactos segun search text
    this.showContacts();

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

//
// busca los contactos en la api segun el searchText
//
showContacts (): void {

    this.searchText.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value;
      }),
      debounceTime(450),
      distinctUntilChanged(),
      switchMap(term => {
        // this.loading = true;
        console.log(term);
        return this.apiService.getContactsByNombre(term);
      }),
      catchError((e) => {
        console.log(e);
        // this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      }),
    ).subscribe(v => {
      // this.loading = true;
      // this.remoteContacts = v;
      // console.log('showContacts: ', v.Agentes);
      this.remoteContacts = v.Agentes;
    })
  }

  //
  // muestra la informacion del agente y de su boss
  //
  showContactInfo (contact: any): void {

    var contacto: Contacto = new Contacto();

    // console.log('contact en showContactInfo: ', contact);

    this.selectedContact = contact;
    this.selectedContactBoss = null;

    this.apiService.getContactByCuil(contact.cuil.toString()).subscribe( (data: any) => {

      if (data.Titular != undefined && data.Agentes != undefined) {

          var bossId = data.Titular.cuil + "";

          if (bossId != (this.selectedContact.cuil + "")) {

              for (var i in data.Agentes) {

                var id = data.Agentes[i].cuil + "";

                if (id == bossId) {
                      this.selectedContactBoss = data.Agentes[i];
                      break;
                  }
              }
          }
      }

      contacto.agente = this.selectedContact;
      contacto.titular = this.selectedContactBoss;

      // muestra los datos del contacto seleccionado
      // this.mainComponent.show(contact);
      this.mainComponent.show(contacto);

      });

  }

//
// muestra los contactos relacionados del cuil
//
showRelatedContacts (cuil: any) {

  console.log('showRelatedContacts: ', cuil);

  if (cuil.toString() === '') return;

    this.apiService.getContactByCuil(cuil + '').subscribe( (data: any) => {

      this.remoteContacts = data.Agentes;

      // console.log('this.remoteContacts: ', this.remoteContacts);

      this.mainComponent.showRelacionados(this.remoteContacts);

    });

  };

//
// muestra los contactos favoritos
//
showFavorites () {

  this.apiService.getFavorites()
      .subscribe((data: any) => {
        // console.log('showFavorites: ', data.Agentes);
        this.remoteContacts = data.Agentes;
      })

  };

}

