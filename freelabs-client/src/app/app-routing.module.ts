import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserPageComponent } from "./components/user-page/user-page.component";
import { CreateLabComponent } from "./components/create-lab/create-lab.component";
import { ViewLabsComponent } from "./components/view-labs/view-labs.component";
import { ViewLabItemComponent } from "./components/view-lab-item/view-lab-item.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'createlab', component: CreateLabComponent, canActivate: [AuthGuard] },
  { path: 'viewlabs', component: ViewLabsComponent },
  { path: 'lab', component: ViewLabItemComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
