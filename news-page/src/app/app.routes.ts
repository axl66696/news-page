import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('dist/news-info')
      .then(m => m.NewsInfoComponent)
  }
];

// import { Routes } from '@angular/router';

// export const routes: Routes = [];
