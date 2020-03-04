import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { TasksPageRoutingModule } from './tasks-routing.module';
import { TasksPage } from './tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    TasksPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
