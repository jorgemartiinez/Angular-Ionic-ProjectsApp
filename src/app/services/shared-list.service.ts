import { Injectable } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { List } from './../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class SharedListService {
    constructor(
        private db: DbService,
        private alertController: AlertController,
        private aSheet: ActionSheetController,
        private router: Router
    ) {}

    async showOptions(id: string) {
        const list = this.db.searchListById(id);
        const objArchived = this.getOptionArchived(list);
        const actionSheet = await this.aSheet.create({
            header: 'Lists Options',
            buttons: [
                {
                    text: 'Edit List',
                    icon: 'build',
                    handler: () => {
                        this.router.navigateByUrl('tabs/lists/edit/' + id);
                    }
                },
                objArchived,
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.deleteList(id);
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

    async deleteList(id: string) {
        const alert = await this.alertController.create({
            header: 'Are you sure you want to delete this list?',
            message: 'This operation could be a F for your list.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Okay',
                    handler: () => {
                        this.db.delList(id);
                    }
                }
            ]
        });

        await alert.present();
    }

    getOptionArchived(list: List) {
        if (!list.archived) {
            return {
                text: 'Archive List',
                icon: 'archive-outline',
                handler: async () => {
                    await this.db.archiveList(list.id);
                }
            };
        } else {
            return {
                text: 'Unarchive List',
                icon: 'archive-outline',
                handler: async () => {
                    await this.db.archiveList(list.id);
                }
            };
        }
    }
}
