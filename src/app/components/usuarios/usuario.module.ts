import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosComponent,
    EspecialistasComponent,
    PacientesComponent,
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
    RegistroAdminComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
