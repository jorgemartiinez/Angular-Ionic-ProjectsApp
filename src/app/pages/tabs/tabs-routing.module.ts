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
                path: 'lists/category/:id',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../list-by-category/list-by-category.module').then(
                                (m) => m.ListByCategoryPageModule
                            )
                    }
                ]
            },
            {
                path: 'lists/archived',
                loadChildren: () =>
                    import('../lists-archived/lists-archived.module').then((m) => m.ListsArchivedPageModule)
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
                path: 'categories/edit',
                loadChildren: () =>
                    import('../category-edit/category-edit.module').then((m) => m.CategoryEditPageModule)
            },
            {
                path: 'categories/edit/:id',
                loadChildren: () =>
                    import('../category-edit/category-edit.module').then((m) => m.CategoryEditPageModule)
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
                path: 'notes/edit/:id',
                loadChildren: () => import('../note-edit/note-edit.module').then((m) => m.NoteEditPageModule)
            },
            {
                path: 'notes/edit',
                loadChildren: () => import('../note-edit/note-edit.module').then((m) => m.NoteEditPageModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('../categories/categories.module').then((m) => m.CategoriesPageModule)
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
