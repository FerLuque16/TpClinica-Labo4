import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
  spinner = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

}
