
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { LoginComponent } from './inputs/login/login.component';
import { PassComponent } from './inputs/pass/pass.component';
import { RoundBordersComponent } from './round-borders/round-borders.component';

@NgModule({
  declarations: [

    DialogMessageComponent,
    DialogErrorComponent,
    LoginComponent,
    PassComponent,
    RoundBordersComponent
    
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    Ng2SmartTableModule,
  ],
  exports: [
    
    DialogMessageComponent,
    DialogErrorComponent,
    LoginComponent,
    PassComponent,
    RoundBordersComponent

  ]
})

export class SharedModule {}

