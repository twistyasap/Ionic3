import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // 
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, BarcodeScanningModalComponent]
})
export class LoginPageModule {}
