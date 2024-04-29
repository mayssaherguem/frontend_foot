import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { GoogleMapsModule } from '@angular/google-maps';
import { DashboardModule } from './dashboard/dashboard.module';
import { TimeVariationModule } from './time-variation/time-variation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionJoueursModule } from './gestion-joueurs/gestion-joueurs.module';
import { AuthentificationModule } from './authentification/authentification.module';


@NgModule({
    declarations: [
  
  
  ],
    imports: [
        CommonModule, 
        Ng2SmartTableModule,
        GoogleMapsModule,
        DashboardModule,
        TimeVariationModule,
        GestionJoueursModule,
        BrowserAnimationsModule,
        AuthentificationModule
    ],
    exports: [
    ]
})

export class pagesModule {}
