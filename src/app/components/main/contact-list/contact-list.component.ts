import { ContactDataComponent } from './../contact-data/contact-data.component';
import { MainComponent } from './../main.component';
// import { Contacto } from './../../../models/contacto';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent extends ContactoService implements OnInit {

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
    this.showRelatedContacts("20182865762");
    this.myContacts = this.remoteContacts;
  }

  showContacts (searchText: string): void {
    this.apiService.getContacts(searchText).subscribe( (data: any) => {
    this.remoteContacts = data.Agentes});

    // this.remoteContacts = this.contactos;
    }

  showContactInfo (contact: any): void {

    var contacto: Contacto = new Contacto();

    console.log('contact en showContactInfo: ', contact);

    this.selectedContact = contact;
    this.selectedContactBoss = null;

    this.apiService.getContact(contact.cuil.toString()).subscribe( (data: any) => {

      console.log('data en getContact: ', data);

      if (data.Titular != undefined && data.Agentes != undefined) {

          var bossId = data.Titular.cuil + "";

          if (bossId != (this.selectedContact.cuil + "")) {

              for (var i in data.Agentes) {

                var id = data.Agentes[i].cuil + "";

                if (id == bossId) {

                      this.selectedContactBoss = data.Agentes[i];

                      console.log('id == bossId ---> break!!!');

                      break;
                  }
              }
          }
      }

      console.log('selectedContact: ', this.selectedContact);
      console.log('selectedContactBoss: ', this.selectedContactBoss);

      contacto.agente = this.selectedContact;
      contacto.titular = this.selectedContactBoss;

      // muestra los datos del contacto seleccionado
      // this.mainComponent.show(contact);
      this.mainComponent.show(contacto);

      });

  }

  inputSearchChanged (): void {

    if (this.searchText.trim() == '') {
        this.remoteContacts = this.myContacts;
    } else {
      this.showContacts(this.searchText);
    }
};

showRelatedContacts (cuil: any) {

  if (cuil.trim() == '') return;

  this.apiService.getContact(cuil.toString()).subscribe( (data: any) => {

    this.remoteContacts = data.Agentes;


  // http.get(url + contact.cuil)
  //     .then(function (response) {
  //             remoteContactsFullReply = response.data;
  //             remoteContacts = response.data.Agentes;
  //             searchRequestsCount--;
  //             if (searchRequestsCount <= 0) {
  //                 searchingContacts = false;
  //             }
  //         },
  //         function (error) {
  //             showConnectionError();
  //             searchRequestsCount--;
  //             if (searchRequestsCount <= 0) {
  //                 searchingContacts = false;
  //             }
  //         });

});

};

// trackByContact: (index: number, contact: Contacto): number => contact.cuil;

}
