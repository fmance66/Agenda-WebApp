import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ContactListComponent } from '../contact-list/contact-list.component';
import { MainComponent } from './../main.component';

import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})

export class ContactDataComponent extends ContactoService implements OnInit {

  suscription: Subscription = new Subscription();

  // selectedContact: Contacto = new Contacto();
  // selectedContactBoss: Contacto = new Contacto();
  selectedContact: any = null;
  selectedContactBoss: any = null;

  constructor(private mainComponent: MainComponent,
              private contactList: ContactListComponent,
              private contactoService: ContactoService,
              private toast: ToastrService) {

    super();

    this.selectedContact = null;
    this.selectedContactBoss = null;

  }

  ngOnInit(): void {

    this.suscription = this.mainComponent.getContacto$().subscribe(data => {

    this.selectedContact = data.agente;
    this.selectedContactBoss = data.titular;

    // console.log('data en Contact-Data: ', data);

    });

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  showContactInfo (contact: any): void {
    this.contactList.showContactInfo(contact);
  }

  capitalize (str: string) {
    return this.contactoService.capitalize(str);
  }

  downloadVCardForContact (contact: any) {

      try {

        var names = contact.nombre.trim().split(',');

        var card = require('vcard-parser');

        // var card: vCard = new(vCard);

        // var card: vCard = {
        //     tel: []
        // };

        var tel: any = [];

        // card = { tel: [] };

        console.log('contact: ', contact);

        for (var i = 0; contact.Telefonos != undefined && i < contact.Telefonos.length; i++) {

            var telDic = contact.Telefonos[i];

            console.log('telDic: ', telDic);

            for (var property in telDic) {

              if (property.startsWith('$')) continue;

              if (telDic.hasOwnProperty(property)) {

                  if (telDic[property] == undefined) continue;

                  if (telDic[property].length <= 3) continue;

                  console.log('telDic[property]: ', telDic[property], ', property: ', property + '');

                  // card.tel.push({value: telDic[property], meta: {type: [property + '']}});
                  tel.push({value: telDic[property], meta: {type: [property + '']}});
                }
            }
        }

        card.tel = tel;
        // card.email = [{value: contact.email.toLowerCase(), namespace: 'item1', meta: {type: ['INTERNET']}}];
        card.email = [{value: contact.email.toLowerCase(), meta: {type: ['INTERNET']}}];
        card.note = [{value: this.contactoService.capitalize(contact.funcion)}];
        card.fn = [{value: this.contactoService.capitalize(contact.nombre)}];
        card.n = [{value: [this.contactoService.capitalize(names[0]),
                           this.contactoService.capitalize(names[1])]}];
                          //  this.contactoService.capitalize(names[1]), '', '', '']}];

        console.log('card:', card);

        var content = card.generate(card);

        var blob = new Blob([content], {type: 'text/x-vcard=UTF-8'});

          this.downloadFile(contact.nombre + '.vcf', content, 'text/x-vcard=UTF-8');

      } catch (ex) {
          console.log(ex);
          this.toast.error('Create .vcf file error',
                  'Esta función no esta soportada en tu versión del sistema...',
                  {
                    timeOut: 4500,
                  }
          );
      }
  };

  //
  // abre cliente de correo predeterminado para mandar mail
  //
  sendEmailToContact (contact: any) {
      // console.log('sendEmailToContact ---> ',contact);
      window.open("mailto:" + contact.email.toLowerCase(), "_self");
  };

  downloadFile (fileName: any, data: any, strMimeType: any): any {
      var D = document;
      var a = D.createElement('a');
      strMimeType = strMimeType || 'application/octet-stream;charset=utf-8';
      var rawFile;

      // IE10+
      if (navigator.msSaveBlob) {
          return navigator.msSaveBlob(new Blob([data], {
              type: strMimeType
          }), fileName);
      }

      //html5 A[download]
      if ('download' in a) {
          var blob = new Blob([data], {
              type: strMimeType
          });
          rawFile = URL.createObjectURL(blob);
          a.setAttribute('download', fileName);
      } else {
          rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(data);
          a.setAttribute('target', '_blank');
      }

      a.href = rawFile;
      a.setAttribute('style', 'display:none;');
      D.body.appendChild(a);
      setTimeout(function () {
          if (a.click) {
              a.click();
              // Workaround for Safari 5
          } else if (document.createEvent) {
              var eventObj = document.createEvent('MouseEvents');
              eventObj.initEvent('click', true, true);
              a.dispatchEvent(eventObj);
          }
          D.body.removeChild(a);

      }, 100);
  };


  showRelatedContacts (contact: any) {
    this.contactList.showRelatedContacts(contact);

  };

}
