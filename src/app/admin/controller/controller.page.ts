import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  showQR: boolean = false;
  qrValue: string = '';
  segment: string = 'GenerateQR'; 

  constructor() { }

  ngOnInit() {
    
  }

  generateQR() {
    this.qrValue = 'Hello world!'; 
    this.showQR = true;
  }
}
