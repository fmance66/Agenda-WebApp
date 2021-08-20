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

  contactos: any;    // array de contactos
  remoteContacts = [];
  favs = [];
  // myContacts = [];
  // selectedContact: Contacto = new Contacto();
  // selectedContactBoss: Contacto = new Contacto();
  selectedContact: any = null;
  selectedContactBoss: any = null;
  searchText: string = "";


  constructor(private apiService: ApiService,
              private mainComponent: MainComponent) {
        super();

      }

  ngOnInit(): void {
    this.showContacts("mancevich");
    // this.myContacts = this.contactos;
    // this.remoteContacts = this.myContacts;
    this.remoteContacts = this.contactos;
  }

  showContacts (searchText: string): void {
    this.apiService.getContacts(searchText).subscribe( data => {
    this.contactos = data.Agentes});

    this.remoteContacts = this.contactos;
    }

  showContactInfo (contact: any): void {

    this.selectedContact = contact;
    this.selectedContactBoss = null;

    this.apiService.getContact(contact.cuil.toString()).subscribe( data => {

        this.selectedContact = data;

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
                      break;
                  }
              }
          }
      }

      });

    // muestra los datos del contacto seleccionado
    this.mainComponent.show(contact);

    console.log('--- selectedContact en showContactInfo ---');
    console.log(this.selectedContact);

    console.log('--- selectedContactBoss showContactInfo ---');
    console.log(this.selectedContactBoss);

  }

  inputSearchChanged (): void {

    if (this.searchText.trim() == '') {
        this.remoteContacts = this.contactos;
    } else {
      this.showContacts(this.searchText);
    }
};

// trackByContact: (index: number, contact: Contacto): number => contact.cuil;

}
