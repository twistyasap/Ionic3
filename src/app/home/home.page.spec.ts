import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para habilitar ngForm

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),               // Asegúrate de importar IonicModule para pruebas con Ionic
        IonicStorageModule.forRoot(),         // Asegúrate de importar IonicStorageModule para usar Storage en pruebas
        FormsModule                          // Importa FormsModule para usar ngForm en tu prueba
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
