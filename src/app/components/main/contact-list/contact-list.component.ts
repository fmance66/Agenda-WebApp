import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contacto';
import { Subscription } from 'rxjs';

import { MainComponent } from './../main.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent extends ContactoService implements OnInit {

  suscription: Subscription = new Subscription();

  // contactos: any;    // array de contactos
  myContacts: any = [];
  remoteContacts: any = [];
  favs: any = [];

  selectedContact: any = null;
  selectedContactBoss: any = null;

  searchText: string = "";


  constructor(private apiService: ApiService,
              private mainComponent: MainComponent) {
        super();

      }

  ngOnInit(): void {

    // se inicializa con los contactos relacionados del cuil local
    this.myContacts.cuil = "20182865762";
    this.showRelatedContacts(this.myContacts);
    this.myContacts = this.remoteContacts;

    this.suscription = this.mainComponent.getRelacionados$().subscribe(data => {

      this.remoteContacts = data;
      this.myContacts = this.remoteContacts;

    });

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }


//
// busca los contactos en la api segun el searchText
//
showContacts (searchText: string): void {
    this.apiService.getContacts(searchText).subscribe( (data: any) => {
    this.remoteContacts = data.Agentes});

    // this.remoteContacts = this.contactos;
    }

  //
  // muestra la informacion del agente y de su boss
  //
  showContactInfo (contact: any): void {

    var contacto: Contacto = new Contacto();

    // console.log('contact en showContactInfo: ', contact);

    this.selectedContact = contact;
    this.selectedContactBoss = null;

    this.apiService.getContact(contact.cuil.toString()).subscribe( (data: any) => {

      // console.log('data en getContact: ', data);

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

      // console.log('selectedContact: ', this.selectedContact);
      // console.log('selectedContactBoss: ', this.selectedContactBoss);

      contacto.agente = this.selectedContact;
      contacto.titular = this.selectedContactBoss;

      // muestra los datos del contacto seleccionado
      // this.mainComponent.show(contact);
      this.mainComponent.show(contacto);

      });

  }

  //
  // muestra los contactos segun el input search
  //
  inputSearchChanged (): void {

    if (this.searchText.trim() == '') {
        this.remoteContacts = this.myContacts;
    } else {
      this.showContacts(this.searchText);
    }
};

//
// muestra los contactos relacionados con el agente
//
showRelatedContacts (contact: any) {

  if (contact.cuil.toString() == '') return;

  this.apiService.getContact(contact.cuil + '').subscribe( (data: any) => {

    this.remoteContacts = data.Agentes;

    console.log('this.remoteContacts: ', this.remoteContacts);

    this.mainComponent.showRelacionados(this.remoteContacts);


  });

};

// trackByContact: (index: number, contact: Contacto): number => contact.cuil;

}
