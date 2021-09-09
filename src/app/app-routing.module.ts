import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./shared/components/main/main.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
      {path: 'auth', loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule)},
      {path: 'admin', loadChildren: () => import('./core/components/admin/admin.module').then(m => m.AdminModule)},
      // {path: 'user', loadChildren: () => import('./core/components/user/user.module').then(m => m.UserModule)},
      // {path: 'admin', loadChildren: () => import('./core/components/admin/admin.module').then(m => m.AdminModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
