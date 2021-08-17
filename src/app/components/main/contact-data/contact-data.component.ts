import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})

export class ContactDataComponent extends ContactoService implements OnInit {

  selectedContact: Contacto = new Contacto();

  constructor(contactList: ContactListComponent) {

    super();

    this.selectedContact = contactList.selectedContact;

  }

  ngOnInit(): void {

  }

}
