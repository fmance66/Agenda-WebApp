import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactListComponent } from './components/main/contact-list/contact-list.component';
import { ContactDataComponent } from './components/main/contact-data/contact-data.component';

// Servicios
import { ApiService } from './services/api.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ContactoService } from './services/contacto.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    ContactListComponent,
    ContactDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    ScrollingModule
  ],
  providers: [ApiService,
              ContactListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
