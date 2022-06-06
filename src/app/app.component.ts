import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TpClinica';
  spinner = true;

  userLogueado:any;

  constructor(private auth: AuthService, private router: Router){}
  ngOnInit():void{
    this.auth.getUserLogged().subscribe(user =>{
      this.userLogueado = user;
    })
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/bienvenido']);
  }
}
