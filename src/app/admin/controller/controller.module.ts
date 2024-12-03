import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ControllerPageRoutingModule } from './controller-routing.module';
import { ControllerPage } from './controller.page';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ControllerPageRoutingModule,
    QrCodeModule
  ],
  declarations: [ControllerPage]
})
export class ControllerPageModule {}
