import { TestBed } from '@angular/core/testing';
import { AutenticadorService } from './autenticador.service';
import { StorageService } from './storage.service'; 

describe('AutenticadorService', () => {
  let service: AutenticadorService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    
    const spy = jasmine.createSpyObj('StorageService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AutenticadorService,
        { provide: StorageService, useValue: spy } 
      ]
    });

    service = TestBed.inject(AutenticadorService);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate a user with correct credentials', async () => {
    
    storageServiceSpy.get.and.returnValue(Promise.resolve({ email: 'm.matias', password: '1234zapato' }));

    const result = await service.login('m.matias', '1234zapato');
    expect(result).toBe(true);
    expect(service.isConnected()).toBe(true);
  });

  it('should not authenticate a user with incorrect credentials', async () => {
    
    storageServiceSpy.get.and.returnValue(Promise.resolve({ email: 'm.matias', password: '1234zapato' }));

    const result = await service.login('incorrect_user', 'wrong_password');
    expect(result).toBe(false);
    expect(service.isConnected()).toBe(false);
  });

  it('should allow logout', async () => {
    // Simular que el almacenamiento devuelve un usuario correcto
    storageServiceSpy.get.and.returnValue(Promise.resolve({ email: 'm.matias', password: '1234zapato' }));

    await service.login('m.matias', '1234zapato');
    expect(service.isConnected()).toBe(true); 
    
    service.logout();
    expect(service.isConnected()).toBe(false); 
  });
});
