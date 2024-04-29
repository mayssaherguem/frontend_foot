import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogErrorComponent } from '../shared/dialog-error/dialog-error.component';

@Injectable()
export class DialogErrorService {

   constructor(public dialog: MatDialog) {}
   /**** date format dd/MM/yyyy ******/
   public dateCompare(date):boolean
   {
       let dateNow = new Date();

       let date1;
      
       if(date.toString().includes("/"))
          date1 = new Date(this.dateFormatConvert(date,"/"));
       else
          date1 = new Date(date);

        //  console.error(date1);
        // console.error(dateNow);
        // console.error(date1 > dateNow);
       
       /*if(date1 > dateNow)
       {
           return true;
       }*/
       return date1 > dateNow;
   }

   isEqualDate(date)
   {
      let dateNow = new Date();

      let date1;
    
      if(date.toString().includes("/"))
        date1 = new Date(this.dateFormatConvert(date,"/"));
      else
        date1 = new Date(date);

    //   console.error(date1);
    //  console.error(dateNow);
    //  console.error(date1 > dateNow);
      
      if(date1 < dateNow)
      {
          return true;
      }
      return false;
   }
   //******** */
   /**** false if max >= min ******/
   public compare2Dates(dateMin, dateMax):boolean
   {
     console.log(dateMax);
     
       if(new Date(dateMax) >= new Date(dateMin))
       {
           return false;
       }
       return true;
   }

   /**** date format yyyy-MM-dd ******/
   public dateCompareMonth(date):boolean
   {
       let dateNow = new Date();
       let date1 =new Date(date);

       if(date1 > dateNow)
       {
          return true;
       }
       else if ( (date1.getMonth() == dateNow.getMonth()) && (date1.getFullYear() == dateNow.getFullYear()) )
       {
          return true;
       }

       return false;
   }

   public dateFormatConvert(date,sep)
   {
     if(!date)
      return;

       let dateInlList:string = date.split(sep);
       return dateInlList[2]+"-"+dateInlList[1]+"-"+dateInlList[0]
   }

   public openDialog(error): void 
   {
     this.dialog.closeAll();
     const dialogRef= this.dialog.open(DialogErrorComponent, {
      data: {error: error}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  dialog_error;
  public handleError(error: HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent) {
      this.dialog_error.openDialog("Network error !");
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if(error.status == 0)
      {
        this.dialog_error.openDialog("The server is not responding !");
      }else 
      { this.dialog_error.openDialog(`réponse incorrecte du serveur ${error.status}`); }
      
      console.error(
        `Réponse incorrecte du serveur ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}