import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRegisterService } from '../../../services/patient-register-service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-register-component',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './patient-register-component.html',
  styleUrls: ['./patient-register-component.css']
})
export class PatientRegisterComponent {
  patientRegisterForm: FormGroup;
  registerError: string | null = null;
  registerSuccess: string | null = null;
  registerData: any = {};

  constructor(
    private fb: FormBuilder,
    private patientRegisterService: PatientRegisterService
  ) {
    this.patientRegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', [Validators.required, Validators.minLength(6)]],
      complaint_Issue: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.patientRegisterForm.valid) {
      this.registerData.name = this.patientRegisterForm.get('name')?.value;
      this.registerData.email = this.patientRegisterForm.get('email')?.value;
      this.registerData.phone = this.patientRegisterForm.get('phone')?.value;
      this.registerData.address = this.patientRegisterForm.get('address')?.value;
      this.registerData.dob = this.patientRegisterForm.get('dob')?.value;
      this.registerData.complaint = this.patientRegisterForm.get('complaint_Issue')?.value;

      // Call the register service with registerDataentials
      this.patientRegisterService.registerPatient(this.registerData)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.registerSuccess = 'Login successful';
              this.registerError = null;
              alert('registeration successful:');
            } else {
              this.registerError = res.message || 'Login failed';
              this.registerSuccess = null;
              alert('registeration failed:'+res.message);
            }
          },
          error: (err) => {
            this.registerError = 'An error occurred during login';
            this.registerSuccess = null;
            console.error('API Error:', err);
          }
        });
    } else {
      this.patientRegisterForm.markAllAsTouched();
      return;
    }
  }
}
