import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'src/environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TimeVariationComponent } from './pages/time-variation/time-variation.component';
import { GestionJoueursComponent } from './pages/gestion-joueurs/gestion-joueurs.component';
import { AuthentificationComponent } from './pages/authentification/authentification.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },  
  { path: 'timeline', component: TimeVariationComponent },  
  { path: 'gestion_joueurs', component: GestionJoueursComponent },  
  { path: '', component: AuthentificationComponent },  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
