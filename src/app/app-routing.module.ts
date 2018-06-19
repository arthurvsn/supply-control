import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { ContactComponent } from "./contact/contact.component";
import { CarComponent } from './car/car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

const routes: Routes = [
  /* { path: '', component: AppComponent }, */
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'profile', component: UserComponent },
  { path: 'car/detail/:id', component: CarDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
