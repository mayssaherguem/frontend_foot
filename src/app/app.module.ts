import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { pagesModule } from './pages/pages.module';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BSMenuService } from './services/BSMenu.service';
import { IconComponent } from './pages/icon/icon.component';
import { SharedModule } from './shared/shared.module';
import { DialogMessageService } from './services/dialog-message.service';
import { DialogErrorService } from './services/dialog-error.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IconComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    pagesModule,
    HttpClientModule,
    
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule ,
    MatSelectModule,
    MatFormFieldModule,
    SharedModule
    
  ],
  providers: [
    BSMenuService,
    DialogMessageService,
    DialogErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
