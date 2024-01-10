import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'profile/:id',
    component: ProfileDetailsComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
