import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  //TODO: Hacer todas las validaciones del form
  especialidades: any[]=[
    {value:'Kinesiologia'},
    {value:'Pediatria'},
    {value: 'Otro'}
  ]
  selectedFile1: any = null;
  selectedFile2: any = null;

  selected = '';

  hide = true;

  tipoUsuario = 'paciente';
  registroForm! : FormGroup;
  constructor(private fb :FormBuilder, private firestore: AngularFirestore) { 
    this.registroForm =  fb.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      edad:['',[Validators.required]],
      dni:['',[Validators.required]],
      tipo:['paciente'],
      obraSocial:['',[Validators.required,Validators.minLength(4)]],
      especialidad:['',[Validators.required]],
      imagen:['',[Validators.required]],
      imagen2:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      contraseña:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log(this.registroForm.value.tipo);
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
    this.selectedFile1 = event.target.files[0] ?? null;
  }
  onFileSelected2(event: any): void {
    this.selectedFile2 = event.target.files[0] ?? null;
  }
  onEspecialidadSeleccionada(event:any){
    // console.log(this.registroForm.value.tipo);
    if(this.registroForm.value.tipo == 'paciente')
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
  mostrarForm(){
    console.log(this.registroForm)
    // this.firestore.collection('users').add({nombre:'Fer',apellido:'Luque'})

  }
}
