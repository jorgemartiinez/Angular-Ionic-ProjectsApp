import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListByCategoryPage } from './list-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ListByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListByCategoryPageRoutingModule {}
