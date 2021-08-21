import { ContactDataComponent } from './../contact-data/contact-data.component';
import { MainComponent } from './../main.component';
// import { Contacto } from './../../../models/contacto';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';

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

    this.selectedContact = contact;
    this.selectedContactBoss = null;

    this.apiService.getContact(contact.cuil.toString()).subscribe( (data: any) => {

        // this.selectedContact = data;
        console.log('--- data.Titular ---');
        console.log(data.Titular);
        console.log('--- data.Agentes ---');
        console.log(data.Agentes);

        if (data.Titular != undefined &&
            data.Agentes != undefined) {

          var bossId = data.Titular.cuil + "";

          if (bossId != (this.selectedContact.cuil + "")) {

              for (var i in data.Agentes) {

                var id = data.Agentes[i].cuil + "";

                console.log('--- id / bossId ---');
                console.log(id, bossId);

                if (id == bossId) {
                      this.selectedContactBoss = data.Agentes[i];
                      // this.contactData.selectedContactBoss = data.Agentes[i];
                      break;
                  }
              }
          }
      }

      });

    console.log('--- selectedContact en showContactInfo ---');
    console.log(this.selectedContact);

    console.log('--- selectedContactBoss showContactInfo ---');
    console.log(this.selectedContactBoss);

    // muestra los datos del contacto seleccionado
    this.mainComponent.show(contact);

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
