import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }


  // registrar(email:string,contraseña:string){
  //   return  this.afAuth
  //           .createUserWithEmailAndPassword(email,contraseña)
  //           .then(result =>{
  //             this.
  //           })
  // }

  // enviarMailVerificacion(){
  //   return  this.afAuth.currentUser
  //           .then(user =>{
  //             return user?.sendEmailVerification();
  //           })
  // }

}
