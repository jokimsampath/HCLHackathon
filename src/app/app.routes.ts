import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login-component/login-component';
import { App } from './app';
import { HomeComponent } from './components/Home/home-component/home-component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard-component/dashboard-component';
import { PatientRegisterComponent } from './components/patient/patient-register-component/patient-register-component';
import { LogoutComponent } from './components/logout/logout-component/logout-component';
import { PatientListComponent } from './components/patient/patient-list-component/patient-list-component';
import { PremiumCalcuationComponent } from './components/premium-calcuation-component/premium-calcuation-component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `first-component`
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            {
                path: '',
                component: PatientListComponent,
                canActivate: [authGuard]
            },
            {
                path: 'register',
                component: PatientRegisterComponent,
                canActivate: [authGuard]
            }, {
                path: 'premiumcalculation',
                component: PremiumCalcuationComponent,
                canActivate: [authGuard]
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    //{ path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];
