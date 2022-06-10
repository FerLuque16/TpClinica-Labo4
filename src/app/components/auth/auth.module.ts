import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';





@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    VerificarEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class AuthModule { }
