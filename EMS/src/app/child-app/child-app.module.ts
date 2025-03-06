import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildAppComponent } from './child-app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../shared/header/header.module';


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
  declarations: [ChildAppComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CHILD_ROUTES),
    HeaderModule,
  ]
})
export class ChildAppModule { }
