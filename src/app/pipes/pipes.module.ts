import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedPipe } from './completed.pipe';
import { ArchivedPipe } from './archived.pipe';
import { SearchPipe } from './search.pipe';
import { CategoryPipe } from './category.pipe';

@NgModule({
  declarations: [CompletedPipe, ArchivedPipe, SearchPipe, CategoryPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CompletedPipe,
    ArchivedPipe,
    CategoryPipe,
    SearchPipe
  ]
})
export class PipesModule { }
