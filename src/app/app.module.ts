import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';




import { AppComponent } from './app.component';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { RoutingApp } from './app.routes';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GlobalService } from './globalService';
import { UserDetails } from './home/userDetails/userDetails';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    UserDetails
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    RoutingApp,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule, SharedModule,
    HttpClientModule,
    HttpModule,
    GrowlModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
