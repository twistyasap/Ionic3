import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service'; // Asegúrate de que la ruta sea correcta
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerData = {
    email: '',
    name: '',
    password: ''
  };

  showPassword: boolean = false; // Añadir esta línea

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  async onSubmit() {
    if (this.registerData.email && this.registerData.name && this.registerData.password) {
      try {
        // Registra al usuario en Firebase
        await this.authService.register(this.registerData.email, this.registerData.password);
        console.log('Registro de usuario en Firebase:', this.registerData);

        // Guarda los datos del usuario en el almacenamiento
        await this.storageService.set('user', this.registerData);
        console.log('Registro de usuario en almacenamiento:', this.registerData);
        
        // Llama al método para obtener los datos del usuario guardado
        await this.getUserData();

        // Navega a la página de inicio después de registrar al usuario
        this.router.navigate(['/home']);
      } catch (error) {
        console.log('Error en el registro:', error);
      }
    } else {
      console.log('Faltan datos para el registro');
    }
  }

  // Método para obtener los datos del usuario guardados
  async getUserData() {
    const user = await this.storageService.get('user');
    console.log('Datos del usuario guardado:', user);
  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  goToLogin() {
    this.router.navigate(['/home']);
  }
}
