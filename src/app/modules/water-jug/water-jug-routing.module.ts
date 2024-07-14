import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterJugComponent } from './page/water-jug.component';

const routes: Routes = [
  { path: '', component: WaterJugComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterJugRoutingModule { }
