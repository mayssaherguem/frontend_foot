import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
  //template: `
 
 // `,
styles: [

// `::ng-deep @font-face {
// font-family: txt;
// src: url(../../../../assets/fonts/good-times.regular.ttf);
// }
//`
]
})
export class DialogMessageComponent {
  confirmer=false;
  constructor(public dialogRef: MatDialogRef<DialogMessageComponent>,@Inject(MAT_DIALOG_DATA) public data) {}  
  annuler()
  {
    this.confirmer=false;
    this.dialogRef.close(false);
  }
  ok()
  {
    this.confirmer=true;
    this.dialogRef.close(true);
  }

}

