import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsArchivedPageRoutingModule } from './lists-archived-routing.module';

import { ListsArchivedPage } from './lists-archived.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    ListsArchivedPageRoutingModule
  ],
  declarations: [ListsArchivedPage]
})
export class ListsArchivedPageModule {}
