import { AddListButtonComponent } from './add-list-button/add-list-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TareasComponent } from './tareas/tareas.component';
import { TareaComponent } from './tarea/tarea.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { ListaComponent } from './lista/lista.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [
    ListasComponent,
    ListaComponent,
    TareaComponent,
    TareasComponent,
    CategoriasComponent,
    SearchBarComponent,
    BackButtonComponent,
    AddListButtonComponent,
  ],
  exports: [
    ListasComponent,
    TareasComponent,
    CategoriasComponent,
    SearchBarComponent,
    BackButtonComponent,
    AddListButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }
