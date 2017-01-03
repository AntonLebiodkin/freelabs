import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ReflectiveInjector, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Ng2PaginationModule} from 'ng2-pagination';

import { HeaderComponent } from './components/fl-header/fl-header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { CreateLabComponent } from './components/create-lab/create-lab.component';

import { AlertService } from "./services/alert.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { SignupService } from "./services/signup.service";
import { LabService } from "./services/lab.service";

import { MyDatePickerModule } from 'mydatepicker';
import { ViewLabsComponent } from './components/view-labs/view-labs.component';
import { LabItemComponent } from './components/lab-item/lab-item.component';
import {ProfileService} from "./services/profile.service";
import { ViewLabItemComponent } from './components/view-lab-item/view-lab-item.component';
import { LabSearchFormComponent } from './components/lab-search-form/lab-search-form.component';

import { SubjectPipe } from './pipes/subject.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    UserPageComponent,
    CreateLabComponent,
    LoginComponent,
    RegisterComponent,
    ViewLabsComponent,
    LabItemComponent,
    ViewLabItemComponent,
    LabSearchFormComponent,
    SubjectPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    AppRoutingModule,
    Ng2PaginationModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "uk-UA" },
    SignupService,
    AuthGuard,
    AlertService,
    AuthService,
    LabService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
