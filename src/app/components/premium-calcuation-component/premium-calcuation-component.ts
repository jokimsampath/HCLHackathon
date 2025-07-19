import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-premium-calcuation-component',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './premium-calcuation-component.html',
  styleUrl: './premium-calcuation-component.css'
})
export class PremiumCalcuationComponent {

  insuranceForm: FormGroup;
  addonCoverOptions = ['Accidental Cover', 'Critical Illness', 'Maternity Cover', 'OPD Cover'];

  constructor(private fb: FormBuilder) {
    this.insuranceForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      smoking: ['', Validators.required],
      preExistingConditions: ['', Validators.required],
      sumInsured: ['', Validators.required],
      policyTenure: ['', Validators.required],
      addonCovers: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.insuranceForm.valid) {
      console.log(this.insuranceForm.value);
    } else {
      this.insuranceForm.markAllAsTouched();
    }
  }
}
