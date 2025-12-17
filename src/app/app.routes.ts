import { Routes } from '@angular/router';

export const routes: Routes = [
        { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Home' },
    
    {
        path: 'home',
        loadComponent: () => import('./components/home/home')
            .then((m) => m.Home), title: 'Home'
    },
        {
        path: 'widget',
        loadComponent: () => import('./components/dynamic-component/widget/widget')
            .then((m) => m.Widget), title: 'Widget'
    },
    // {
    //     path: 'dynamic-app',
    //     loadComponent: () => import('./components/dynamic-component/dynamic-app')
    //         .then((m) => m.DynamicApp), title: 'Dynamic Component'
    // },
];
