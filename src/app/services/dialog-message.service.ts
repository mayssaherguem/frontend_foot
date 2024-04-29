import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { DialogErrorComponent } from '../shared/dialog-error/dialog-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogMessageComponent } from '../shared/dialog-message/dialog-message.component';


@Injectable()
export class DialogMessageService {

    constructor(public dialog: MatDialog) {}
    /**** date format dd/MM/yyyy ******/

 
    public openDialog(msg) 
    {
      this.dialog.closeAll();
      const dialogRef= this.dialog.open(DialogMessageComponent, {
       data: {error: msg}
     });
     return dialogRef.afterClosed()
   }
 

}