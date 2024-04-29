import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //encapsulation: ViewEncapsulation.None ,
})
export class LoginComponent implements OnInit, OnChanges {
  @Output() login_ = new EventEmitter();
  @Input() login_vide: any;
  langue="";
  isInit = false;
  login="";
  msg1: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    setTimeout(() => {
        if(this.login_vide)
        {
          this.log_in.markAsTouched();
        }
    }, 100);
   
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.isInit = true;
  }
  onKey(event: any) {
    // this.pass += event.target.value + ' | ';
     this.login = event.target.value;
    // alert(this.pass);
     this.login_.emit(this.login);
     
   }
   value = '';
   update(value: string) { this.value = value;this.login_.emit(this.login); }
   log_in = new FormControl('', [Validators.required]);


   getErrorMessage() {
     if (this.log_in.hasError('required')) {
       //return this.lang.getAuthentification()['msgLogin'][this.lang.getLangue()];
     }
   }

}
