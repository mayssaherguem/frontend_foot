import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
  //encapsulation: ViewEncapsulation.None ,
})
export class PassComponent implements OnInit, OnChanges {
  pwd="";
  pass="";
  msg1="";
  langue="";
  @Input() pass_vide: any;
  @Output() pass_ = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if(this.pass_vide)
      {
        this.passwordControl.markAsTouched();
      }
  }, 100);
    throw new Error('Method not implemented.');
  }
  hide=true;
  ngOnInit(): void {

    
  }
 onKey(event: any)
 {
   this.pass = event.target.value;
   this.pass_.emit(this.pass);
 }
 value = '';
 update(value: string) { this.value = value;this.pass_.emit(this.pass); }
 passwordControl = new FormControl('', [Validators.required]);

 getErrorMessage()
 {
   if (this.passwordControl.hasError('required'))
    {
     //return this.lang.getAuthentification()['msgPass'][this.lang.getLangue()];
    }

 }
}
