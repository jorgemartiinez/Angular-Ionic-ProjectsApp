import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsArchivedPage } from './lists-archived.page';

const routes: Routes = [
  {
    path: '',
    component: ListsArchivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsArchivedPageRoutingModule {}
