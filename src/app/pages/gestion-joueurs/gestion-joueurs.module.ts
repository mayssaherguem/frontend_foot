import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionJoueursComponent } from './gestion-joueurs.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [
    GestionJoueursComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule

  ]
})
export class GestionJoueursModule { }
