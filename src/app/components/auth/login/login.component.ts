import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinner = true;
  hide = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }

}
