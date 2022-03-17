import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelComponent } from './excel/excel.component';
import { HomeComponent } from './home/home.component';
import { MobileComponent } from './mobile/mobile.component';
import { WebComponent } from './web/web.component';


const routes: Routes = [

  { path: 'excel', component: ExcelComponent},
  { path: 'home', component: HomeComponent},
  { path: 'mobile', component: MobileComponent},
  { path: 'web', component: WebComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
