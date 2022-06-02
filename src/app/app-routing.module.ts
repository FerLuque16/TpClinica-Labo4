import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';

const routes: Routes = [
  {
    path:'bienvenido',
    component:BienvenidoComponent
  },
  {
    path:'auth',
    loadChildren:()=>import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',redirectTo: 'bienvenido', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
