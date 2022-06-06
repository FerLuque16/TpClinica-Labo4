import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario!:Usuario;
  spinner = true;

  //TODO: Hacer todas las validaciones del form
  especialidades: any[]=[
    {value:'Kinesiologia'},
    {value:'Pediatria'},
    {value: 'Otro'}
  ]
  selectedFile1: any = null;
  imagenPath1:string = '';


  selectedFile2: any = null;
  imagenPath2:string = '';

  selected = '';

  hide = true;

  tipoUsuario = 'paciente';
  registroForm! : FormGroup;
  constructor(private fb :FormBuilder, private usuarioService: UsuarioService
              ,private imgService: ImagenService, private auth:AuthService){ 
    this.registroForm =  fb.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      edad:['',[Validators.required]],
      dni:['',[Validators.required]],
      rol:['paciente'],
      obraSocial:['',[Validators.required,Validators.minLength(4)]],
      especialidad:[''],
      imagen1:['',[Validators.required]],
      imagen2:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    console.log(this.registroForm.value.tipo);
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }
  //TODO:
  // Agregar y sacar validaciones segun especialdiad seleccionada 
  cambio(){
    console.log(this.selected);
    // if(this.selected == 'Otro'){
    //   //this.registroForm.controls['especialidad'].setValue('');
    // }
    // else{

    // }
    
  }
  onFileSelected1(event: any): void {
    const file: File = event.target.files[0] ?? null;
    this.selectedFile1 = file;

    this.imagenPath1 = event.target.files[0].name.replaceAll(' ','-');

    console.log(this.imagenPath1)



  }
  onFileSelected2(event: any): void {
    // this.selectedFile2 = event.target.files[0] ?? null;
    const file: File = event.target.files[0] ?? null;
    this.selectedFile2 = file;

    this.imagenPath2 = event.target.files[0].name.replaceAll(' ','-');

    console.log(this.imagenPath2)

  }
  onEspecialidadSeleccionada(event:any){
    // console.log(this.registroForm.value.tipo);
    if(this.registroForm.value.rol == 'paciente')
    {
      this.tipoUsuario = 'paciente';
      // console.log(this.registroForm.get('obraSocial'))
      this.registroForm.get('obraSocial')?.setValidators([Validators.required])
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidad')?.clearValidators();
      this.registroForm.get('especialidad')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.setValidators([Validators.required])
      this.registroForm.get('imagen2')?.updateValueAndValidity();

      
      // console.log(this.registroForm.get('obraSocial'))
    }
    else{
      this.tipoUsuario = 'especialista';

      

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidad')?.setValidators([Validators.required])
      this.registroForm.get('especialidad')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();    
      
    } 
  }
  async registrar(){
    console.log(this.registroForm)
    // this.firestore.collection('users').add({nombre:'Fer',apellido:'Luque'})
    if(this.registroForm.value.rol == 'paciente'){

      this.usuario = {...this.registroForm.value,imagen1:this.imagenPath1,imagen2:this.imagenPath2};
      // this.usuario.rol = 'paciente';

      delete this.usuario.especialidad;
      delete this.usuario.habilitado;

      try {
        await this.auth.registrar(this.usuario.email,this.registroForm.value.password);
        
        this.imgService.subirArchivo(this.selectedFile1,this.imagenPath1,this.selectedFile2,this.imagenPath2);
        //Guardo un documento usuario con el id igual al uid registrado
        this.usuarioService.guardarUsuario(this.usuario, this.auth.usuario.uid);
        //Le añado el campo uid al documento del usuario
        this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);
      } catch (error:any) {
        console.log('Error en el registro')
      }





      console.log(this.usuario);
    }
    else{

      this.usuario = {...this.registroForm.value,imagen1:this.imagenPath1};
      this.usuario.rol = 'especialista';
      this.usuario.habilitado = false;

      delete this.usuario.obraSocial;
      delete this.usuario.imagen2;

      try {
        await this.auth.registrar(this.usuario.email,this.registroForm.value.password);
        this.imgService.subirArchivo(this.selectedFile1,this.imagenPath1);
        //Guardo un documento usuario con el id igual al uid registrado
        this.usuarioService.guardarUsuario(this.usuario,this.auth.usuario.uid);
        //Le añado el campo uid al documento del usuario
        this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);
      } catch (error:any) {
        console.log('Error en el registro')
      }

      console.log(this.usuario);
    }

  }

  //6HlXNI6LNrTGuEdaRjZLyoasJpo2
  actualizar(){
    this.usuarioService.guardarUsuario({habilitado:true},'6HlXNI6LNrTGuEdaRjZLyoasJpo2');
  }
}
