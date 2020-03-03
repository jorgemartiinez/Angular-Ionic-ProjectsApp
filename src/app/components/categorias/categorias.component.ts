import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DbService } from './../../services/db.service';
import { Category } from './../../interfaces/interfaces';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: [ './categorias.component.scss' ]
})
export class CategoriasComponent implements OnInit {
    @Input() categories: Category[] = [];

    constructor(
        private router: Router,
        private aSheet: ActionSheetController,
        public db: DbService,
        private alertCtrl: AlertController
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

    moveToCategory(id: string) {
        this.router.navigateByUrl(`/tabs/lists/category/${id}`);
    }
}
