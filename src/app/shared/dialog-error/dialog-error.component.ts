import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
 
})
export class DialogErrorComponent {

  constructor(public dialogRef: MatDialogRef<DialogErrorComponent>,@Inject(MAT_DIALOG_DATA) public data) {}  
  ok()
  {
    this.dialogRef.close(true);
  }
}
