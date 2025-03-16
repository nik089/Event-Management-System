import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildAppComponent } from './child-app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../shared/header/header.module';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const CHILD_ROUTES: Routes = [
  {
    path: "",
    component: ChildAppComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
    ]
  }
]

@NgModule({
  declarations: [ChildAppComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CHILD_ROUTES),
    HeaderModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ChildAppModule { }
