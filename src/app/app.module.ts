import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ContactListComponent } from './components/main/contact-list/contact-list.component';
import { ContactDataComponent } from './components/main/contact-data/contact-data.component';

// Servicios
import { ApiService } from './services/api.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';

// toastr, mensajes tipo emergentes
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    ContactListComponent,
    ContactDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ScrollingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ApiService,
              ContactListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
