import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactListComponent } from './components/main/contact-list/contact-list.component';
import { ContactDataComponent } from './components/main/contact-data/contact-data.component';
import { ListSearchComponent } from './components/main/contact-list/list-search/list-search.component';
import { ListResultComponent } from './components/main/contact-list/list-result/list-result.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    ContactListComponent,
    ContactDataComponent,
    ListSearchComponent,
    ListResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
