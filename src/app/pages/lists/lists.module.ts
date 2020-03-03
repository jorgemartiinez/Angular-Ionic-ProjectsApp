import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';
import { PipesModule } from './../../pipes/pipes.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    SuperTabsModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ListsPage }]),
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
