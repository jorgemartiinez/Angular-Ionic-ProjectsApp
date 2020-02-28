import { DbService } from './../../services/db.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: [ './categories.page.scss' ]
})
export class CategoriesPage implements OnInit {
    constructor(
        public db: DbService,
        private aSheet: ActionSheetController,
        private alertCtrl: AlertController,
        private router: Router
    ) {}

    ngOnInit() {}

    async showOptions(id: string) {
        const list = this.db.searchListById(id);

        const actionSheet = await this.aSheet.create({
            header: 'Category Options',
            buttons: [
                {
                    text: 'Edit Category',
                    icon: 'build',
                    handler: () => {
                        this.editCategory(id);
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.deleteCategory(id);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

   async createCategory() {
        const alert = await this.alertCtrl.create({
            header: 'New category',
            subHeader: 'Create category',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Category name...'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Ok',
                    handler: async (data: any) => {
                        this.db.addCategory(data.name);
                    }
                }
            ]
        });

        await alert.present();
    }

    async deleteCategory(id: string) {
        const alert = await this.alertCtrl.create({
            header: 'Are you sure you want to delete this category?',
            message:
                'This operation will be irreversible. All the lists of this category will convert into a list with no category.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Okay',
                    handler: () => {
                        this.db.delCategory(id);
                    }
                }
            ]
        });

        await alert.present();
    }

    async editCategory(id?: string) {
        const category = this.db.searchCategoryById(id);
        const alert = await this.alertCtrl.create({
            header: 'Edit category',
            subHeader: 'Edit this category',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    value: category.name,
                    placeholder: 'Category name...'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Ok',
                    handler: async (data: any) => {
                        category.name = data.name;
                        await this.db.editCategory(category);
                    }
                }
            ]
        });

        await alert.present();
    }
}
