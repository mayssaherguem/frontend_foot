import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GaugeComponent } from './charts/gauge/gauge.component';
import { BarComponent } from './charts/bar/bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GaugeComponent,
    BarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    
  ]
})
export class DashboardModule { }
