import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';//imports for apollo-angular
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';//imports for apollo-angular
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppComponent } from './app.component';
import { EmployeeGridComponent } from './employee-grid/employee-grid.component';
import { TableModule } from 'primeng/table';

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    TableModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
      apollo.create({
        link: httpLink.create({uri: 'http://localhost:4000/graphql'}),
        cache: new InMemoryCache()
      });
    }
 }
