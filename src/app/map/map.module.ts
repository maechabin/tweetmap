import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../core/custom-material.module';
import { MapContainerComponent } from './map.container';
import { TweetsComponent } from './components/tweets.component';

@NgModule({
  declarations: [MapContainerComponent, TweetsComponent],
  imports: [CommonModule, CustomMaterialModule],
  exports: [MapContainerComponent],
})
export class MapModule {}
