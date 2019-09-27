import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapContainerComponent } from './map.container';
import { TweetsComponent } from './components/tweets.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapContainerComponent, TweetsComponent],
  exports: [MapContainerComponent],
})
export class MapModule {}
