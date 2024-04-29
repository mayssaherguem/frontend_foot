import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { number } from 'echarts';
import { Observable, of } from 'rxjs';
import { readdirSync } from 'fs';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  readExcelFile( filename ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileURL = 'assets/database/'+filename; // Replace with the actual file path

      this.http.get(fileURL, { responseType: 'arraybuffer' }).subscribe(
        (data) => {
          const arrayBuffer = data as ArrayBuffer;
          const dataUint8Array = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(dataUint8Array, { type: 'array' });

          // Assume the first sheet in the XLSX file
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Parse the data into JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

          resolve(jsonData);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  transformListToNestedJSON(dataList: any[]): any {
   const nestedJSON = {};

   dataList.forEach((item) => {
      
     const { Date, Name, ...values } = item;

     let date = this.excelSerialNumberToJSDate(Date) ;

     if (!nestedJSON[  date ]) {
       nestedJSON[ date ] = {};
     }
     values["Name"] = Name;
     nestedJSON[ date ][Name] = values;
   });

   return nestedJSON;
 }


 transformListToNestedJSON_Monthly(dataList: any[]): any {
  const nestedJSON = {};

  dataList.forEach((item) => {
     
      const { Date, Name,Month, ...values } = item;

      let date = this.excelSerialNumberToJSDate(Date) ;

      if (!nestedJSON[  Month ]) {
      nestedJSON[ Month ] = {};
    }
    
    if (!nestedJSON[ Month ][ date ]) {
      nestedJSON[ Month ][ date ] = {};
    }

      values["Name"] = Name;
      nestedJSON[ Month ][ date ][ Name ] = values;
    });

    return nestedJSON;
  }
 


 excelSerialNumberToJSDate(serialNumber : any) : any {

   if( ( typeof serialNumber ) === 'string' ) return serialNumber;
   
   const MS_PER_DAY = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
   const excelStartDate = new Date('1900-01-01'); // Excel's start date
 
   // Excel incorrectly considers 1900 as a leap year, so we need to handle it separately.
   // Dates before March 1, 1900, should be adjusted by 1 day.
   if (serialNumber <= 60) {
     serialNumber--;
   }
 
   const daysSinceExcelStart = serialNumber - 2; // Subtract 1 day to account for Excel's start date
   const dateInMilliseconds = excelStartDate.getTime() + daysSinceExcelStart * MS_PER_DAY;
 
   const date = new Date(dateInMilliseconds);

  // Format the date as dd/mm/yyyy
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;

   // return new Date(dateInMilliseconds);
 }

    getCSVData(): Observable<string> {
      // Adjust the file path to match the location of your CSV file in the "assets" folder
      const csvFilePath = 'assets/file.csv';
      return this.http.get(csvFilePath, { responseType: 'text' });
    }
 
}
