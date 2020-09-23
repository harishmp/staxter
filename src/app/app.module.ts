import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './shared/table/material-module';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './shared/table/table.component';
import { LatestRatesComponent } from './pages/latest-rates/latest-rates.component';
import { HistoricalDataComponent } from './pages/historical-data/historical-data.component';
import { IncreaseDecreaseComponent } from './pages/increase-decrease/increase-decrease.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    LatestRatesComponent,
    HistoricalDataComponent,
    IncreaseDecreaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ChartsModule,
    MatTableModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
