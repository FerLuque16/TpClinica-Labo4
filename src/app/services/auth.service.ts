import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user : any;
  usuario : any;

  rolUsuario: any;

  

  constructor(private afAuth: AngularFireAuth, private router:Router, private userService:UsuarioService) { }


  registrar(email:string,password:string){
    return  this.afAuth
            .createUserWithEmailAndPassword(email,password)
            .then(result =>{
              this.usuario = result.user;
              console.log(this.usuario)
              // console.log(this.user)
              this.enviarMailVerificacion();
            })
  }

  enviarMailVerificacion(){
    return  this.afAuth.currentUser
            .then(user =>{
              return user?.sendEmailVerification();
            })
            .then(()=>{
              // this.router.navigate(['/auth/verificar-email'])
            })
  }

  login(email:string,password:string){
    return  this.afAuth.signInWithEmailAndPassword(email,password)
            .then(result =>{            
                if(result.user?.emailVerified !== true){
                  this.enviarMailVerificacion();
                  alert('Por favor verfique su email');
                }
                else{
                  this.router.navigate(['/home'])
                }
              }            
            )
  }

  loginSinVerificacion(email:string,password:string){
    return  this.afAuth.signInWithEmailAndPassword(email,password)
            .then( async result =>{
                  console.log(result.user?.uid)
                  // this.userService.obtenerUsuario(result.user?.uid).subscribe(doc =>{
                  //   this.rolUsuario = doc.data()?.rol;
                  //   // console.log(this.rolUsuario.rol)
                  // });
                  this.rolUsuario = await this.userService.obtenerUsuario(result.user?.uid);
                  console.log(this.rolUsuario)
                  this.router.navigate(['/home'])
            })
              

              
            
  }

  logout(){
    return this.afAuth.signOut();
  }

  getUserLogged(){
    return this.afAuth.authState;
  }

  verificarUser(email:string|null|undefined):boolean{
    if(email !== 'admin@test.com'){
      return true;
    }

    return false;
  }
}
