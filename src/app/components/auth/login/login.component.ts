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

  loginForm!: FormGroup
  constructor(private fb :FormBuilder,private auth:AuthService ) {

    this.loginForm = fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

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

}
