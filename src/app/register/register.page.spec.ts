import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';  // Asegúrate de importar IonicStorageModule
import { StorageService } from 'src/app/servicios/storage.service';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para poder usar ngForm

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),                // Asegúrate de importar IonicModule
        IonicStorageModule.forRoot(),         // Asegúrate de importar IonicStorageModule
        FormsModule                          // Importa FormsModule para poder usar ngForm
      ],
      providers: [StorageService] // No necesitas mockear StorageService si ya has importado IonicStorageModule
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
