import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { AutenticadorService } from './../servicios/autenticador.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: '',
  };

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController, 
    private auth: AutenticadorService
  ) {}

  async onSubmit() {
    console.log('Formulario enviado', this.user);
    
    try {
      // Validar usuario y contraseña usando await
      const isAuthenticated = await this.auth.login(this.user.username, this.user.password);

      if (isAuthenticated) {
        this.navigateToLogin(); // Navegar si las credenciales son correctas
      } else {
        await this.showAppAlert('Credenciales incorrectas'); // Mostrar alerta de aplicación si falla
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      await this.showAppAlert('Ocurrió un error al iniciar sesión.'); // Mostrar alerta si hay un error inesperado
    }
  }

  async showAppAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }

  navigateToLogin() {
    this.router.navigate(['/login'], {
      state: { username: this.user.username }  // Envía el username
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/admin/controller']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async checkAdminCredentials() {
    const alert = await this.alertController.create({
      header: 'Acceso Admin',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Usuario'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Entrar',
          handler: (data) => {
            if (data.username === 'admin' && data.password === '1234') {
              this.router.navigate(['/admin/controller']);
            } else {
              this.showErrorAlert();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Credenciales incorrectas. Inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
