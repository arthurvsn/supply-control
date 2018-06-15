import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    Service,
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
