import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent implements OnInit {

  usuario!:Usuario;

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
  constructor(private fb :FormBuilder, private usuarioService: UsuarioService
    ,private imgService: ImagenService, private auth:AuthService) {

      this.registroForm =  fb.group({
        nombre:['',[Validators.required]],
        apellido:['',[Validators.required]],
        edad:['',[Validators.required]],
        dni:['',[Validators.required]],
        rol:['especialista'],
        especialidad:[''],
        imagen1:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      })


    }

  ngOnInit(): void {
  }

  onFileSelected1(event: any): void {
    const file: File = event.target.files[0] ?? null;
    this.selectedFile1 = file;

    this.imagenPath1 = event.target.files[0].name.replaceAll(' ','-');

    console.log(this.imagenPath1)



  }

  async registrar(){
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

      // console.log(this.usuario);
  }

}
