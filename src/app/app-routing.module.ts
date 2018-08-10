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
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './_guards/auth.guard';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'logout', component: LoginComponent },
	{ path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
	{ path: 'car', component: CarComponent, canActivate: [AuthGuard] },
	{ path: 'car/detail/:id', component: CarDetailComponent, canActivate: [AuthGuard] },
	{ path: 'password/recovery', component: PasswordRecoveryComponent },
	{ path: 'password/reset/:token', component: PasswordResetComponent },
	{ path: '**', component: Error404Component },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), CommonModule],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule { }
