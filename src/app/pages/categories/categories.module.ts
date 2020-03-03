import { CategoriesPageRoutingModule } from './categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from './../../components/components.module';

import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CategoriesPageRoutingModule
  ],
  entryComponents: [
    CategoriesPage
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
