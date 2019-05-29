import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SectorDashboardComponent} from './sector/sector-dashboard.component';
import {IndustryDashboardComponent} from './industry/industry-dashboard.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'Sector/:sector', component: SectorDashboardComponent},
  {path: 'Industry/:industry', component: IndustryDashboardComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
