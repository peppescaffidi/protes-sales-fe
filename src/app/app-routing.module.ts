import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegionalComponent} from "./regional/regional.component";
import {SalesComponent} from "./sales/sales.component";
import {ProtesAuthComponent} from "./protes-auth/protes-auth.component";

const routes: Routes = [
  { path: 'login', component: ProtesAuthComponent },
  { path: 'regional-dashboard', component: RegionalComponent },
  { path: 'national-dashboard', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
