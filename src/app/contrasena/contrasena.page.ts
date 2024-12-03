import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {
  emailData = {
    email: ''
  };

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async onSubmit() {
    const email = this.emailData.email.trim();

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      await this.presentAlert('Error', 'Por favor ingresa un correo electrónico.');
    } else if (!emailPattern.test(email)) {
      await this.presentAlert('Error', 'Por favor ingresa un email válido.');
    } else {
      try {
        console.log('Correo electrónico enviado a:', email);

        

        await this.presentAlert('Éxito', 'Mensaje enviado. Por favor revisa tu correo electrónico.');
      } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        await this.presentAlert('Error', 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.');
      }
    }
  }
}
