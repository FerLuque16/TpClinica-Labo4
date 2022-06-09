import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinner = true;
  hide = true;

  cuentas: any[] = [
    {email:'paciente1@gmail.com',password:'paciente1',nombre:'paciente',apellido:'uno'},
    {email:'paciente2@gmail.com',password:'paciente2',nombre:'paciente',apellido:'dos'},
    {email:'paciente3@gmail.com',password:'paciente3',nombre:'paciente',apellido:'tres'},
    {email:'especialista@gmail.com',password:'1234567',nombre:'especialista',apellido:'uno'},
  ]

  loginForm!: FormGroup
  constructor(private fb :FormBuilder,private auth:AuthService ) {

    this.loginForm = fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  /*
    apellido
        "luque"
        (string)
        contraseña
        "1234567"
        dni
        "2342452"
        edad
        "35"
        email
        "especialista@gmail.com"
        especialidad
        "Pediatria"
        habilitado
        true
        imagen1
        "clasificacion-saldos.png"
        nombre
        "fer"
        rol
        "especialista"
        uid
        "apellido
"luque"
(string)
contraseña
"1234567"
dni
"2342452"
edad
"35"
email
"especialista@gmail.com"
especialidad
"Pediatria"
habilitado
true
imagen1
"clasificacion-saldos.png"
nombre
"fer"
rol
"especialista"
uid
"TIwInprF8TTwIH2QQyjtP9xvYNK2"" 
  */
  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }


  async login(){
    try {
      await this.auth.login(this.loginForm.value.email,this.loginForm.value.password)
    } catch (error:any) {
      console.log(error)
    }
  }

  async loginSinVerificacion(email:string, password:string){
    try {
      await this.auth.loginSinVerificacion(email,password)
    } catch (error:any) {
      console.log('Error');
    }
  }

  verBoton(email:string,password:string){
    console.log(email,password);
  }

}
