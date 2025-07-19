import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list-component.html',
  styleUrls: ['./patient-list-component.css']  // ✅ fixed typo: styleUrls
})
export class PatientListComponent implements OnInit {

  patients: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.http.get<any[]>('http://localhost:5000/api/patients')
      .subscribe({
        next: (data) => {
          console.log('Fetched patients:', data);
          this.patients = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading patients:', err);
        }
      });
  }
}
