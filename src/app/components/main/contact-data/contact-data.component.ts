import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { MainComponent } from './../main.component';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})

export class ContactDataComponent extends ContactoService implements OnInit {

  suscription: Subscription = new Subscription();

  selectedContact: Contacto = new Contacto();

  constructor(private mainComponent: MainComponent,
              private contactList: ContactListComponent) {

    super();

    // this.selectedContact = this.contactList.selectedContact;

    // console.log('selectedContact en data: ' + this.selectedContact);

  }

  ngOnInit(): void {

    this.suscription = this.mainComponent.getContacto$().subscribe(data => {
      // console.log(data);
      this.selectedContact = data;

    });

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

}
