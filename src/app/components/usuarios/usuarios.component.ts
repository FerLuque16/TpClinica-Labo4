import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  pacientes:Usuario[] = []; 
  especialistas:Usuario[] = []; 

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}
