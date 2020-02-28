import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'lists',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../lists/lists.module').then((m) => m.ListsPageModule)
                    }
                ]
            },
            {
                path: 'lists',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../lists/lists.module').then((m) => m.ListsPageModule)
                    }
                ]
            },
            {
                path: 'lists/category/:index',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../lists/lists.module').then((m) => m.ListsPageModule)
                    }
                ]
            },
            {
                path: 'lists/edit/:id',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../list-edit/list-edit.module').then((m) => m.ListEditPageModule)
                    }
                ]
            },
            {
                path: 'lists/edit',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../list-edit/list-edit.module').then((m) => m.ListEditPageModule)
                    }
                ]
            },
            {
                path: 'lists/:listId/tasks',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../tasks/tasks.module').then((m) => m.TasksPageModule)
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'notes',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../notes/notes.module').then((m) => m.NotesPageModule)
                    }
                ]
            },
            {
                path: 'categories',
                loadChildren: () => import('../categories/categories.module').then((m) => m.CategoriesPageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/lists',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/lists',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsPageRoutingModule {}
