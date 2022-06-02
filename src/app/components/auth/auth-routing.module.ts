import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes:Routes = [{
  path:'',
  children:[
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'registro',
      component:RegistroComponent
    },
    {
      path:'verificar-email',
      component:VerificarEmailComponent
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
