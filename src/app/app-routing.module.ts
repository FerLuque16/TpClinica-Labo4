import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path:'bienvenido',
    component:BienvenidoComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'usuarios',
    loadChildren:()=>import('./components/usuarios/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'perfil',
    component:PerfilComponent
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
