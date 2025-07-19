import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login-component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../../../services/login-service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form as invalid initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate the form as valid when filled', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login service and navigate on success', fakeAsync(() => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });

    const mockResponse = {
      success: true,
      token: 'mockToken',
      user: { username: 'testuser', email: 'test@example.com' }
    };

    loginServiceSpy.login.and.returnValue(of(mockResponse));

    component.onSubmit();
    tick(); // simulate async

    expect(loginServiceSpy.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loginSuccess).toBe('Login successful');
    expect(component.loginError).toBeNull();
  }));

  it('should show error message on failed login', fakeAsync(() => {
    component.loginForm.setValue({ username: 'wrong', password: 'wrongpass' });

    const mockErrorResponse = {
      success: false,
      message: 'Invalid credentials'
    };

    loginServiceSpy.login.and.returnValue(of(mockErrorResponse));

    component.onSubmit();
    tick();

    expect(component.loginError).toBe('Invalid credentials');
    expect(component.loginSuccess).toBeNull();
  }));

  it('should handle server error during login', fakeAsync(() => {
    component.loginForm.setValue({ username: 'error', password: 'errorpass' });

    loginServiceSpy.login.and.returnValue(throwError(() => new Error('Server error')));

    component.onSubmit();
    tick();

    expect(component.loginError).toBe('An error occurred during login');
    expect(component.loginSuccess).toBeNull();
  }));
});
