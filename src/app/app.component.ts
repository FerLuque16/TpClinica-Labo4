import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TpClinica';
  spinner = true;

  userLogueado:any;

  constructor(private auth: AuthService, private router: Router, private userService: UsuarioService){}
  ngOnInit():void{
    this.auth.getUserLogged().subscribe(async user =>{
      this.userLogueado = await this.userService.obtenerUsuario(user?.uid);
      console.log(this.userLogueado)
    })
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/bienvenido']);
  }
}
