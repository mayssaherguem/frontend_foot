import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './charts/bar/bar.component';
import { TimeVariationComponent } from './time-variation.component';



@NgModule({
  declarations: [
    BarComponent,
    TimeVariationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TimeVariationModule { }
