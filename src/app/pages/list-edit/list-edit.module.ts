import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ListEditPageRoutingModule } from './list-edit-routing.module';

import { ListEditPage } from './list-edit.page';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ CommonModule, FormsModule, IonicModule, ListEditPageRoutingModule ],
    declarations: [ ListEditPage ]
})
export class ListEditPageModule {}
