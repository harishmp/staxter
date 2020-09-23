import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestRatesComponent } from './pages/latest-rates/latest-rates.component';
import { HistoricalDataComponent } from './pages/historical-data/historical-data.component';
import { IncreaseDecreaseComponent } from './pages/increase-decrease/increase-decrease.component';


const routes: Routes = [
  {path: '', redirectTo: 'latest-rates', pathMatch: 'full'},
  {path: 'latest-rates', component: LatestRatesComponent},
  {path: 'historical-data', component: HistoricalDataComponent},
  {path: 'increase-decrease', component: IncreaseDecreaseComponent},
  // {path: '', component: MainLayoutComponent, children: mainRoutes},
  {path: '**', redirectTo: 'latest-rates'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
