import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListByCategoryPageRoutingModule } from './list-by-category-routing.module';

import { ListByCategoryPage } from './list-by-category.page';
import { ComponentsModule } from './../../components/components.module';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListByCategoryPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ListByCategoryPage]
})
export class ListByCategoryPageModule {}
