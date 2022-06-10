import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-captcha',
  templateUrl: './dialog-captcha.component.html',
  styleUrls: ['./dialog-captcha.component.css']
})
export class DialogCaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
