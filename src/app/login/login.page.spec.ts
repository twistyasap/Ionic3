import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Para simular datos observables
import { ModalController } from '@ionic/angular'; // Importa ModalController

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    // Mock de ActivatedRoute
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'mockValue', // Personaliza el valor devuelto
        },
      },
      queryParams: of({}), // Simula parámetros de consulta como un observable vacío
    };

    // Mock de ModalController
    const modalControllerMock = {
      create: jasmine.createSpy('create') // Puedes agregar más métodos si es necesario
    };

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }, // Provisión del mock de ActivatedRoute
        { provide: ModalController, useValue: modalControllerMock } // Provisión del mock de ModalController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
