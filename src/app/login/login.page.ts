import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AnimationController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/servicios/auth.service';

// Capacitor imports
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit, OnInit {
  @ViewChild('bouncingImage', { static: false }) bouncingImage!: ElementRef;

  public alertButtons = ['OK'];
  username: string = '';
  displayName: string = '';
  segment = 'Scan';
  scanResult: string = '';

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { username: string };
    this.username = state?.username || 'Usuario desconocido';
    this.displayName = this.username.split('@')[0];

    // Verificar soporte de plataforma
    await this.checkPlatformSupport();
  }

  async checkPlatformSupport() {
    if (Capacitor.isNativePlatform()) {
      try {
        // Verificar si el escáner de código de barras es compatible
        const isSupported = await BarcodeScanner.isSupported();
        console.log('Escáner de código de barras compatible:', isSupported);

        // Solicitar permisos de cámara
        const permissionStatus = await BarcodeScanner.requestPermissions();
        console.log('Estado de permiso de cámara:', permissionStatus);
      } catch (error) {
        console.error('Error al verificar el soporte del escáner:', error);
      }
    }
  }

  async startScan() {
    // Asegurar que estamos en una plataforma nativa
    if (!Capacitor.isNativePlatform()) {
      await this.presentAlert('El escaneo solo está disponible en dispositivos móviles');
      return;
    }

    try {
      // Asegurar que los permisos estén concedidos
      const permissionStatus = await BarcodeScanner.requestPermissions();
      if (permissionStatus.camera !== 'granted') {
        await this.presentAlert('Se requiere permiso de cámara para escanear códigos QR');
        return;
      }

      // Iniciar escaneo
      const result = await BarcodeScanner.scan();

      if (result.barcodes.length > 0) {
        this.scanResult = result.barcodes[0].displayValue;
        console.log('Código QR escaneado:', this.scanResult);
      }
    } catch (error) {
      console.error('Error durante el escaneo de código de barras:', error);
      await this.presentAlert('No se pudo escanear el código QR');
    }
  }

  async presentAlert(message: string = 'Debes dar acceso a tu cámara') {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: message,
      buttons: this.alertButtons
    });
    await alert.present();
  }

  ngAfterViewInit() {
    this.createBouncingAnimation();
  }

  createBouncingAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.bouncingImage.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0)' },
        { offset: 0.5, transform: 'translateY(-100px)' },
        { offset: 1, transform: 'translateY(0)' }
      ]);
    animation.play();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/home']);
    });
  }
}