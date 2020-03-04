import { FormsModule } from '@angular/forms';
import { AddListButtonComponent } from './add-list-button/add-list-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TareasComponent } from './tareas/tareas.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { ListaComponent } from './lista/lista.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    ListasComponent,
    ListaComponent,
    TareasComponent,
    CategoriasComponent,
    SearchBarComponent,
    BackButtonComponent,
    NotesComponent,
    AddListButtonComponent,
  ],
  exports: [
    ListasComponent,
    TareasComponent,
    CategoriasComponent,
    SearchBarComponent,
    BackButtonComponent,
    NotesComponent,
    AddListButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }
