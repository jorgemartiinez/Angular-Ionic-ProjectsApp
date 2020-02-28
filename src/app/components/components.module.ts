import { TareasComponent } from './tareas/tareas.component';
import { TareaComponent } from './tarea/tarea.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { ListaComponent } from './lista/lista.component';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [ListasComponent, ListaComponent, TareaComponent, TareasComponent],
  exports: [
    ListasComponent,
    TareasComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LongPressModule
  ]
})
export class ComponentsModule { }
