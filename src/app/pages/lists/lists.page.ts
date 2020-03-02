import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { EventBusService } from 'src/app/services/event-bus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { CategoriesPage } from './../categories/categories.page';
import { List } from './../../interfaces/interfaces';
import { DbService } from './../../services/db.service';
@Component({
    selector: 'app-lists',
    templateUrl: 'lists.page.html',
    styleUrls: [ 'lists.page.scss' ]
})
export class ListsPage implements OnInit, OnDestroy, AfterViewInit {
    categoryPage = CategoriesPage;
    actualPage = 0;
    termino = '';
    triggerSearch = false;
    activeTab = 0;

    @ViewChild('superTabs', { static: false, read: SuperTabs })
    st: SuperTabs;

    constructor(
        public db: DbService,
        private aSheet: ActionSheetController,
        private eb: EventBusService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) {}

    async ngOnInit() {
        await this.db.getLists();
        this.eb.showListOptions$.subscribe((id) => {
            if (id) {
                console.log('el id de la lista es', id);
                this.showOptions(id);
                return;
            }
        });
    }

    ngAfterViewInit() {
        const moveTo = Number(this.activatedRoute.snapshot.params.index);
        console.log('index to move to', moveTo + 2);
        if (moveTo !== undefined && moveTo >= 0) {
            console.log('primer if');
            this.st.selectTab(moveTo + 2, true);
            this.activeTab = moveTo + 2;
        } else {
            console.log('segundo if');
            this.st.selectTab(0, true);
            this.activeTab = 0;
        }
    }
    onTabSelect(ev: any) {
        console.log(ev);
    }

    ngOnDestroy() {
        // this.eb.showListOptions$.unsubscribe();
    }

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
    goToAddList() {
        this.router.navigateByUrl('tabs/lists/edit');
    }
    doRefresh(event) {
        if (this.db.lists) {
            event.target.complete();
        }
    }

    searchBar(event) {
        this.termino = event.detail.value;
    }
}
