import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../core/custom-material.module';
import { MapContainerComponent } from './map.container';
import { TweetsComponent } from './components/tweets/tweets.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [CommonModule, CustomMaterialModule],
  declarations: [MapContainerComponent, TweetsComponent, HeaderComponent, SearchComponent],
  exports: [MapContainerComponent],
})
export class MapModule { }
