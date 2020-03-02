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

    async showOptions(event, id: string) {
        event.stopPropagation();
        const list = this.db.searchListById(id);

        const actionSheet = await this.aSheet.create({
            header: 'Category Options',
            buttons: [
                {
                    text: 'Edit Category',
                    icon: 'build',
                    handler: () => {
                        this.router.navigateByUrl(`tabs/categories/edit/${id}`);
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

    createCategory() {
        this.router.navigateByUrl('tabs/categories/edit');
    }

    moveToCategory(index: number) {
        console.log('vamos al tab de esta categoria en lists');
        this.router.navigateByUrl('/tabs/lists/category/' + index);
    }
}
