import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { UserDetails } from './home/userDetails/userDetails';



const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignupComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user-details/:id',
        component: UserDetails
    },
    {
        path: 'user-details',
        component: UserDetails
    }
]

export const RoutingApp: ModuleWithProviders = RouterModule.forRoot(routes);