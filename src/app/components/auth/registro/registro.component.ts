import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';



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

  tipoUsuario = '';
  registroForm! : FormGroup;

  user:any;

  rolLogueado:string = '';
  constructor(private fb :FormBuilder, private usuarioService: UsuarioService
              ,private imgService: ImagenService, private auth:AuthService,private router:Router, private snackBar: MatSnackBar){ 
    this.registroForm =  fb.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      edad:['',[Validators.required]],
      dni:['',[Validators.required, Validators.min(11111111),Validators.max(99999999)]],
      rol:[''],
      obraSocial:['',[Validators.required,Validators.minLength(4)]],
      especialidad:[''],
      imagen1:['',[Validators.required]],
      imagen2:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      captcha:[null,Validators.required]
    })
  }

  ngOnInit(): void {
    // console.log(this.registroForm.value.tipo);
    this.auth.getUserLogged().subscribe(async data =>{
      this.user = await this.usuarioService.obtenerUsuario(data?.uid);
      this.rolLogueado = this.user?.rol;
      console.log(this.rolLogueado)
      
    })
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

      this.usuario.imagen1 = this.usuario.email + this.usuario.imagen1;
      this.usuario.imagen2 = this.usuario.email + this.usuario.imagen2;
      this.usuario.rol = 'paciente';


      delete this.usuario.especialidad;
      delete this.usuario.habilitado;
      delete this.usuario.captcha;

      try {
        await this.auth.registrar(this.usuario.email,this.registroForm.value.password);
        
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1,this.selectedFile2,this.usuario.imagen2);
        //Guardo un documento usuario con el id igual al uid registrado
        await this.usuarioService.guardarUsuario(this.usuario, this.auth.usuario.uid);
        //Le añado el campo uid al documento del usuario
        this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);
        // this.auth.ruteoSegunRol('paciente',this.usuario.email);
        this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${this.usuario.email}`,'Cerrar');
        this.router.navigate(['/bienvenido'])
      } catch (error:any) {
          console.log('Error en el registro')
        }





      console.log(this.usuario);
    }
    else if (this.registroForm.value.rol == 'especialista'){

      this.usuario = {...this.registroForm.value,imagen1:this.imagenPath1};
      this.usuario.imagen1 = this.usuario.email + this.usuario.imagen1;
      this.usuario.rol = 'especialista';
      this.usuario.habilitado = false;

      delete this.usuario.obraSocial;
      delete this.usuario.imagen2;
      delete this.usuario.captcha;

      console.log(this.usuario);

      try {
        await this.auth.registrar(this.usuario.email,this.registroForm.value.password);
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1);
        //Guardo un documento usuario con el id igual al uid registrado
        await this.usuarioService.guardarUsuario(this.usuario,this.auth.usuario.uid);
        console.log(this.auth.usuario.uid)
        //Le añado el campo uid al documento del usuario
        this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);     
        this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${this.usuario.email}`,'Cerrar');
        this.router.navigate(['/bienvenido']);
        this.registroForm.reset();
      } catch (error:any) {
        console.log('Error en el registro')
      }

      console.log(this.usuario);
    }
    else{
      this.usuario = {...this.registroForm.value,imagen1:this.imagenPath1};
      this.usuario.habilitado = false;
      this.usuario.imagen1 = this.usuario.email + this.usuario.imagen1;
      this.usuario.rol = 'admin';

      delete this.usuario.obraSocial;
      delete this.usuario.imagen2;
      delete this.usuario.habilitado;
      delete this.usuario.especialidad;
      delete this.usuario.captcha;

      try {
        await this.auth.registrar(this.usuario.email,this.registroForm.value.password);
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1);
        //Guardo un documento usuario con el id igual al uid registrado
        await this.usuarioService.guardarUsuario(this.usuario,this.auth.usuario.uid);
        //Le añado el campo uid al documento del usuario
        this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);
        this.registroForm.reset();
        this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${this.usuario.email}`,'Cerrar');
        this.router.navigate(['/usarios']);
      } catch (error:any) {
        console.log('Error en el registro')
      }
    }

  }


  onRolSeleccionado(event:any){
    // console.log(this.registroForm.value.tipo);
    console.log(event)
    if(event.target.dataset.tipo == 'paciente')
    {
      this.tipoUsuario = 'paciente';

      this.registroForm.get('rol')?.setValue('paciente');
      // console.log(this.registroForm.get('obraSocial'))
      this.registroForm.get('obraSocial')?.setValidators([Validators.required])
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidad')?.clearValidators();
      this.registroForm.get('especialidad')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.setValidators([Validators.required])
      this.registroForm.get('imagen2')?.updateValueAndValidity();

      
      // console.log(this.registroForm.get('obraSocial'))
    }
    else if (event.target.dataset.tipo == 'especialista'){
      this.tipoUsuario = 'especialista';
      this.registroForm.get('rol')?.setValue('especialista');

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidad')?.setValidators([Validators.required])
      this.registroForm.get('especialidad')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();    
      
    } 
    else{
      this.tipoUsuario = 'admin';
      this.registroForm.get('rol')?.setValue('admin');

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidad')?.clearValidators();
      this.registroForm.get('especialidad')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();
    }
  }
  mostrarAlgo(event:any){
    console.log(event.target.dataset.tipo)
  }

  volver(){
    this.tipoUsuario = '';
    this.registroForm.reset();
  }

  //6HlXNI6LNrTGuEdaRjZLyoasJpo2
  // actualizar(){
  //   this.usuarioService.guardarUsuario({habilitado:true},'6HlXNI6LNrTGuEdaRjZLyoasJpo2');
  // }
}
