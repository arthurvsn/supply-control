import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { Helper } from './_helpers/helper';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { Service } from "./_services/service";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CarComponent } from './car/car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SupplyComponent } from './supply/supply.component';
import { DatePipe } from '@angular/common';
import { AmountControlComponent } from './amount-control/amount-control.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ContactComponent,
    CarComponent,
    CarDetailComponent,
    SupplyComponent,
    AmountControlComponent,
    ConfirmationDialogComponent,
    PasswordRecoveryComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    DatePipe,
    Service,
    Helper,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],  
  bootstrap: [AppComponent]  
})
export class AppModule { }
