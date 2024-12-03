import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ContrasenaPage } from './contrasena.page';

describe('ContrasenaPage', () => {
  let component: ContrasenaPage;
  let fixture: ComponentFixture<ContrasenaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContrasenaPage],
      imports: [FormsModule], // Agregar FormsModule para habilitar ngForm
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
