import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Clear auth token or session data
    localStorage.removeItem('token');

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
