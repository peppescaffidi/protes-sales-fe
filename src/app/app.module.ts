import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './sales/sales.component';
import {DataService} from "./services/data.service";
import { HeaderComponent } from './header/header.component';
import { LateralBarComponent } from './lateral-bar/lateral-bar.component';
import { ProtesMainComponent } from './protes-main/protes-main.component';
import { RegionalComponent } from './regional/regional.component';
import { ProtesTableComponent } from './protes-table/protes-table.component';
import { ProtesModalComponent } from './protes-modal-export/protes-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProtesModalNotesComponent } from './protes-modal-notes/protes-modal-notes.component';
import { ProtesModalNewrowComponent } from './protes-modal-newrow/protes-modal-newrow.component';
import { ProtesModalDropdownComponent } from './protes-modal-dropdown/protes-modal-dropdown.component';
import { ProtesChartComponent } from './protes-chart/protes-chart.component';
import { ProtesModalMultiselectComponent } from './protes-modal-multiselect/protes-modal-multiselect.component';
import { ProtesChartMarketComponent } from './protes-chart-market/protes-chart-market.component';
import {protesUtilityService} from "./services/protes-utility.service";
import { ProtesAuthComponent } from './protes-auth/protes-auth.component';
import { ProtesModalProductComponent } from './protes-modal-product/protes-modal-product.component';
import { ProtesModalNewProductComponent } from './protes-modal-new-product/protes-modal-new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    HeaderComponent,
    LateralBarComponent,
    ProtesMainComponent,
    RegionalComponent,
    ProtesTableComponent,
    ProtesModalComponent,
    ProtesModalNotesComponent,
    ProtesModalNewrowComponent,
    ProtesModalDropdownComponent,
    ProtesChartComponent,
    ProtesModalMultiselectComponent,
    ProtesChartMarketComponent,
    ProtesAuthComponent,
    ProtesModalProductComponent,
    ProtesModalNewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, protesUtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
