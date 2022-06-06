import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { merge } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  // Guarda un usuario en la coleccion usuarios, con el id pasado
  // por parametros
  guardarUsuario(usuario: Usuario | any,id:string){
    this.firestore.collection('usuarios').doc(id).set(usuario,{merge:true});
  }

  // Guarda un dato pasado por prametro en el usuario con el id pasado
  // por parametros
  actualizarUsuario(data: any, id: string){
    this.firestore.collection('usuarios').doc(id).set(data,{merge:true});
  }
}
