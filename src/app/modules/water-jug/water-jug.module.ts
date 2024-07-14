import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterJugRoutingModule } from './water-jug-routing.module';
import { WaterJugComponent } from './page/water-jug.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WaterJugComponent
  ],
  imports: [
    CommonModule,
    WaterJugRoutingModule,
    ReactiveFormsModule

  ]
})
export class WaterJugModule { }
