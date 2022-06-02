import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router) { }


  registrar(email:string,contraseña:string){
    return  this.afAuth
            .createUserWithEmailAndPassword(email,contraseña)
            .then(result =>{
              this.enviarMailVerificacion();
            })
  }

  enviarMailVerificacion(){
    return  this.afAuth.currentUser
            .then(user =>{
              return user?.sendEmailVerification();
            })
            .then(()=>{
              this.router.navigate(['/auth/verificar-email'])
            })
  }

  login(email:string,contraseña:string){
    return  this.afAuth.signInWithEmailAndPassword(email,contraseña)
            .then(result =>{
              if(result.user?.emailVerified !== true){
                this.enviarMailVerificacion();
                alert('Por favor verfique su email');
              }
              else{
                this.router.navigate(['/home'])
              }
            })
  }

}
