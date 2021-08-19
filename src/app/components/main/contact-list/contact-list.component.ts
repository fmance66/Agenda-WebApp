import { MainComponent } from './../main.component';
import { Contacto } from './../../../models/contacto';
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
  myContacts = [];
  selectedContact: Contacto = new Contacto();
  selectedContactBoss: Contacto = new Contacto();
  searchText: string = "";


  constructor(private apiService: ApiService,
              private mainComponent: MainComponent) {
        super();
   }

  ngOnInit(): void {
    this.showContacts("mancevich");
    this.myContacts = this.contactos;
  }

  showContacts (searchText: string): void {
    this.apiService.getContacts(searchText).subscribe( data => {
    this.contactos = data.Agentes});

    this.remoteContacts = this.contactos;
    }

  showContactInfo (contact: Contacto): void {

    console.log('--- showContactInfo: ' + contact.cuil.toString() + ' ---');

    this.selectedContact = contact;
    this.selectedContactBoss = new Contacto();

    this.apiService.getContact(contact.cuil.toString()).subscribe( data => {
        this.selectedContact = data});

    // muestra los datos del contacto seleccionado
    this.mainComponent.show(contact);

    console.log(this.selectedContact);

  }

  inputSearchChanged (): void {

    if (this.searchText.trim() == '') {
        this.remoteContacts = this.myContacts;
    } else {
      this.showContacts(this.searchText);
    }
};

// trackByContact: (index: number, contact: Contacto): number => contact.cuil;

}
