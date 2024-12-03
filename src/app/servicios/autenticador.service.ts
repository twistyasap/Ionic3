import { Injectable } from '@angular/core';
import { StorageService } from './storage.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {
  private isAuthenticated = false;
  private registeredUser: any = null;

  constructor(private storageService: StorageService) { }

  isConnected(): boolean {
    return this.isAuthenticated;
  }

  async login(email: string, password: string): Promise<boolean> {
    this.registeredUser = await this.storageService.get('user');
    
    if (this.registeredUser && email === this.registeredUser.email && password === this.registeredUser.password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
