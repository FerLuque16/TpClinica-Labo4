import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userUid!:string;
  userRol!:string | undefined;
  user!:Usuario | undefined;

  urlImagen:string = '';
  constructor(private authService: AuthService, private userService: UsuarioService, private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(async data =>{
      this.user = await this.userService.obtenerUsuario(data?.uid);
      this.userRol = this.user?.rol;

      this.imagenService.descargarImagen(this.user?.imagen1).subscribe(url =>{
        this.urlImagen = url;

        console.log(this.urlImagen);
      })
    })
    // this.mostrarRol();
    // awaitthis.mostrarRol();
    
    
    
  }
  

}
